from app import create_app

app, socketio, jwt = create_app()

if __name__ == '__main__':
    socketio.run(app, debug=True)
