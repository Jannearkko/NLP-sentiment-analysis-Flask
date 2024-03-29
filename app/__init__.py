from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO
from .utils.dependencies import load_dependencies
from app.routes.http_routes import http_routes
import os
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager

load_dotenv()


def create_app():
    app = Flask(__name__, static_folder='../client/build', static_url_path='')
    CORS(app)
    app.dependencies = load_dependencies()
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
    jwt = JWTManager(app)

    from .routes.socket_routes import register_socketio_events
    socketio = SocketIO(app, cors_allowed_origins='http://localhost:3000')
    register_socketio_events(socketio)
    
    app.register_blueprint(http_routes, url_prefix='/api')
    
    return app, socketio, jwt
