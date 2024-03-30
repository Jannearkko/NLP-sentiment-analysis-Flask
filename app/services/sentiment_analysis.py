from flask import current_app as app
from app.db import db
import tensorflow as tf
from keras.preprocessing.sequence import pad_sequences

def predict_sentiment(json, socketio):
    text = json.get('text')
    username = json.get('username')
    if text:
        socketio.emit('analysis_step', {'message': f'Input: {text}'})

        # tokenizing text
        sequence = app.dependencies['tokenizer'].texts_to_sequences([text])
        socketio.emit('analysis_step', {'message': f'Sequence: {sequence}'})

        # adding padding
        padded_sequence = pad_sequences(sequence, maxlen=30)
        padded_sequence_to_db = [padded_sequence.tolist()[0]]
        socketio.emit('analysis_step', {'message': f'Padded sequence: {padded_sequence}'})

        # Making predictions
        predictions = app.dependencies['model'].predict(padded_sequence)
        socketio.emit('analysis_step', {'message': f'Predictions: {predictions}'})

        # Generating sentiment
        predicted_class_indices = predictions.argmax(axis=1)
        predicted_label = app.dependencies['label_encoder'].inverse_transform(predicted_class_indices)
        result = predicted_label.tolist()

        # check for user
        user = db.get_user(username)
        if user:
            document = {
                'text': text, 
                'sentiment': result[0], 
                'username': username, 
                'sequence': sequence,
                'padded_sequence': padded_sequence_to_db,
                'verified': None}
            inserted_id = db.save_to_train_collection(document)
            socketio.emit('analysis_update', {'message': 'Text analysed', 'result': result, '_id': str(inserted_id)})
        else:
            document = {'text': text, 'sentiment': result[0]}
            inserted_id = db.save_to_non_verified(document)
            socketio.emit('analysis_update', {'message': 'Text analysed', 'result': result, '_id': str(inserted_id)})
    else:
        socketio.emit('analysis_error', {'error': 'No text provided'})

def submit_correction(data, socketio):
    document_id = data.get('_id')
    corrected_sentiment = data.get('correctedSentiment')
    print(data)
    if document_id and corrected_sentiment:
        updated_count = db.update_sentiment_by_id(document_id, corrected_sentiment)
        if updated_count:
            socketio.emit('correction_response', {'message': 'Correction submitted successfully, thank you!\nVerified sentiments are used for further training', 'updated': updated_count})
        else:
            socketio.emit('correction_error', {'error': 'Document not found or update failed'})
    else:
        socketio.emit('correction_error', {'error': 'Missing document ID or corrected sentiment'})