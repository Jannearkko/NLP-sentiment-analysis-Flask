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
    print(document)
    db = get_db()
    result = db['train-collection'].insert_one(document)
    return result.inserted_id

def save_to_non_verified(document):
    db = get_db()
    result = db['not-verified-texts'].insert_one(document)
    return result.inserted_id

def update_sentiment_by_id(document_id, corrected_sentiment):
    db = get_db()
    result = db['train-collection'].update_one(
        {"_id": ObjectId(document_id)},
        {"$set": {"sentiment": corrected_sentiment, "verified": True}}
    )
    return result.modified_count

def get_user(username):
    db = get_db()
    user = db['user-collection'].find_one({"username": username})
    if user:
        return user
    return None

def get_user_by_username(username, submitted_password):
    db = get_db()
    user = db['user-collection'].find_one({"username": username})
    
    if user:
        # Verify the password with the stored hash
        if check_password_hash(user['password_hash'], submitted_password):
            return user  # Password matches, return the user
    
    return None

def register_user(username, password, firstname, lastname):
    db = get_db()
    hashed_password = generate_password_hash(password)

    # Check if user already exists
    if db['user-collection'].find_one({"username": username}):
        return None  # User already exists

    result = db['user-collection'].insert_one({
        "username": username,
        "password_hash": hashed_password,  # Store the hashed password
        "firstname": firstname,
        "lastname": lastname
    })
    return result.inserted_id

def get_user_queries(username):
    db = get_db()
    user = db['user-collection'].find_one({"username": username})

    if user:
        queries = db['train-collection'].find({"username": username})
        queries_list = []
        for query in queries:
            query['_id'] = str(query['_id'])
            queries_list.append(query)

        return queries_list