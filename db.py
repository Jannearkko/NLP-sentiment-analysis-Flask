from pymongo import MongoClient
import os
from dotenv import load_dotenv
from bson import ObjectId

load_dotenv()

def get_db():
    conn_string = os.getenv('DB_URI')
    client = MongoClient(conn_string)
    return client['NLP-DB']

def save_to_train_collection(document):
    db = get_db()
    result = db['train-collection'].insert_one(document)
    return result.inserted_id

def update_sentiment_by_id(document_id, corrected_sentiment):
    db = get_db()
    result = db['train-collection'].update_one(
        {"_id": ObjectId(document_id)},
        {"$set": {"sentiment": corrected_sentiment}}
    )
    return result.modified_count