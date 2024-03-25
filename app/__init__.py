from flask import Flask
from flask_cors import CORS
from flask_socketio import SocketIO
from .utils.dependencies import load_dependencies
from flask_login import LoginManager, login_user, logout_user, current_user, login_required

def create_app():
    app = Flask(__name__, static_folder='../client/build', static_url_path='')
    CORS(app)
    app.dependencies = load_dependencies()

    from .routes.socket_routes import register_socketio_events
    socketio = SocketIO(app, cors_allowed_origins='http://localhost:3000')
    register_socketio_events(socketio)
    
    return app, socketio
