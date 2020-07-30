from flask import Flask, jsonify
from flask_cors import CORS

# configuration
DEBUG = True

# instantiate the app
app = Flask(__name__)
app.config.from_object(__name__)

# enable CORS
CORS(app, resources={r'/*': {'origins': '*'}})


# sanity check route
@app.route('/auth', methods=['GET'])
def ping_pong():
    return jsonify('hello from backend!')


if __name__ == '__main__':
    app.run()