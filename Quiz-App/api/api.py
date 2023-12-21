from flask import Flask, jsonify, request
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


@app.route('/')
def home():
    return "<h1>Hello to my api</h1>"


@app.post('/check-delirium')
def check():
    data = request.json
    print(data)
    
    result = 1
    
    return jsonify({"result":result})

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=5000)