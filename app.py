from flask import Flask, jsonify, request, send_from_directory
import requests
from flask_cors import CORS
import os
from urllib.parse import urljoin
import tensorflow as tf
from keras.models import load_model
from keras.preprocessing.text import Tokenizer
from keras.preprocessing.sequence import pad_sequences
import pickle
from sklearn.preprocessing import LabelEncoder
from dotenv import load_dotenv
import os
import db
from flask_socketio import SocketIO
import asyncio


def create_app():
    app = Flask(__name__, static_folder='client/build', static_url_path='')
    CORS(app)
    app.dependencies = load_dependencies()
    return app

def load_dependencies():
    # load the latest model
    model = load_model('./model/best_model.h5')
    # load tokenizer
    with open('./model/tokenizer.pickle', 'rb') as handle:
        tokenizer = pickle.load(handle)
    # load label encoder
    with open('./model/label_encoder.pickle', 'rb') as file:
        label_encoder = pickle.load(file)
    return {"model": model, "tokenizer": tokenizer, "label_encoder": label_encoder}

app = create_app()
socketio = SocketIO(app, cors_allowed_origins='http://localhost:3000')

# client-side route to access the model
@socketio.on('analyse_text')
def predict_sentiment(json):
    text = json.get('text')
    if text:
        socketio.emit('analysis_step', {'message': f'Input: {text}'})

        # tokenizing text
        sequence = app.dependencies['tokenizer'].texts_to_sequences([text])
        socketio.emit('analysis_step', {'message': f'Sequence: {sequence}'})

        # adding padding
        padded_sequence = pad_sequences(sequence, maxlen=30)
        socketio.emit('analysis_step', {'message': f'Padded sequence: {padded_sequence}'})

        # Making predictions
        predictions = app.dependencies['model'].predict(padded_sequence)
        socketio.emit('analysis_step', {'message': f'Predictions: {predictions}'})

        # Generating sentiment
        predicted_class_indices = predictions.argmax(axis=1)
        predicted_label = app.dependencies['label_encoder'].inverse_transform(predicted_class_indices)
        result = predicted_label.tolist()
        document = {'text': text, 'sentiment': result[0]}
        inserted_id = db.save_to_train_collection(document)
        
        socketio.emit('analysis_update', {'message': 'Text analysed', 'result': result, '_id': str(inserted_id)})

    else:
        socketio.emit('analysis_error', {'error': 'No text provided'})

    
# submit correction to sentiment -route
@socketio.on('submit_correction')
def submit_correction(data):
    document_id = data.get('_id')
    corrected_sentiment = data.get('correctedSentiment')
    print(data)
    if document_id and corrected_sentiment:
        updated_count = db.update_sentiment_by_id(document_id, corrected_sentiment)
        if updated_count:
            socketio.emit('correction_response', {'message': 'Correction submitted successfully, thank you!', 'updated': updated_count})
        else:
            socketio.emit('correction_error', {'error': 'Document not found or update failed'})
    else:
        socketio.emit('correction_error', {'error': 'Missing document ID or corrected sentiment'})
    

if __name__ == '__main__':
    socketio.run(app, debug=True)