from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from app.db.db import get_user_by_username, register_user

http_routes = Blueprint('http_routes', __name__)

@http_routes.route('/login', methods=['POST'])
def login():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    username = request.json.get('username', None)
    password = request.json.get('password', None)

    if not username:
        return jsonify({"msg": "Missing username parameter"}), 400
    if not password:
        return jsonify({"msg": "Missing password parameter"}), 400

    user = get_user_by_username(username, password)
    
    if user:
        # Create JWT token if authentication is successful
        access_token = create_access_token(identity=username)
        username = str(user['username'])
        return jsonify(access_token=access_token, username=username), 200
    else:
        return jsonify({"msg": "Incorrect username or password"}), 401

@http_routes.route('/register', methods=['POST'])
def register():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    username = request.json.get('username', None)
    password = request.json.get('password', None)

    if not username:
        return jsonify({"msg": "Missing username parameter"}), 400
    if not password:
        return jsonify({"msg": "Missing password parameter"}), 400

    # Call the previously created register_user function
    user_id = register_user(username, password)
    if user_id:
        return jsonify({"msg": "User created successfully", "user_id": str(user_id)}), 201
    else:
        return jsonify({"msg": "User already exists or failed to create"}), 500



    