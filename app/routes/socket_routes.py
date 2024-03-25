from ..services.sentiment_analysis import predict_sentiment, submit_correction

def register_socketio_events(socketio):
    @socketio.on('analyse_text')
    def handle_analyse_text(json):
        return predict_sentiment(json, socketio)

    @socketio.on('submit_correction')
    def handle_submit_correction(data):
        return submit_correction(data, socketio)
