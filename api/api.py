import time
from flask import Flask
from dotenv import load_dotenv
load_dotenv

app = Flask(__name__)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}