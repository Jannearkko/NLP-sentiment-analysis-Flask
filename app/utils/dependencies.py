from keras.models import load_model
import pickle

def load_dependencies():
    # load the latest model
    model = load_model('./model/best_model.h5')
    # load tokenizer
    with open('./model/tokenizer.pickle', 'rb') as handle:
        tokenizer = pickle.load(handle)
    # load label encoder
    with open('./model/label_encoder.pickle', 'rb') as file:
        label_encoder = pickle.load(file)
    return {"model": model, "tokenizer": tokenizer, "label_encoder": label_encoder}
