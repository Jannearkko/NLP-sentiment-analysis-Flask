from pymongo import MongoClient
import os
from dotenv import load_dotenv
from bson import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash

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

def get_user_by_username(username, submitted_password):
    db = get_db()
    user = db['user-collection'].find_one({"username": username})
    
    if user:
        # Verify the password with the stored hash
        if check_password_hash(user['password_hash'], submitted_password):
            return user  # Password matches, return the user
    
    return None

def register_user(username, password):
    db = get_db()
    hashed_password = generate_password_hash(password)

    # Check if user already exists
    if db['user-collection'].find_one({"username": username}):
        return None  # User already exists

    result = db['user-collection'].insert_one({
        "username": username,
        "password_hash": hashed_password  # Store the hashed password
    })
    return result.inserted_id