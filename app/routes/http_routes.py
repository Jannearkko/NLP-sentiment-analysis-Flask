from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token
from app.db.db import get_user_by_username, register_user, get_user_queries

http_routes = Blueprint('http_routes', __name__)

@http_routes.route('/login', methods=['POST'])
def login():
    print("request in server: ",request)
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
        firstname = str(user['firstname'])
        lastname = str(user['lastname'])
        return jsonify(access_token=access_token, username=username, firstname=firstname, lastname=lastname), 200
    else:
        return jsonify({"msg": "Incorrect username or password"}), 401

@http_routes.route('/register', methods=['POST'])
def register():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400

    username = request.json.get('username', None)
    password = request.json.get('password', None)
    firstname = request.json.get('firstname', None)
    lastname = request.json.get('lastname', None)

    if not username or not password or not firstname or not lastname:
        return jsonify({"msg": "Missing user parameters"}), 400

    # Call the previously created register_user function
    user_id = register_user(username, password, firstname, lastname)
    if user_id:
        return jsonify({"msg": "User created successfully", "user_id": str(user_id)}), 201
    else:
        return jsonify({"msg": "User already exists or failed to create"}), 500
    
@http_routes.route('/getQueries', methods=['POST'])
def get_queries():
    if not request.is_json:
        return jsonify({"msg": "Missing JSON in request"}), 400
    
    username = request.json.get('username', None)
    if not username:
        return jsonify({"msg": "Missing user parameters"}), 400
    
    queries = get_user_queries(username)
    if queries:
        return jsonify(queries=queries), 200
    else:
        return jsonify({"msg": "User doesnt exists"}), 500
    



    