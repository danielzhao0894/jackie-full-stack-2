import time
import os
import sys
import logging
from multiprocessing.managers import BaseManager
from multiprocessing import Lock
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from werkzeug.utils import secure_filename
# from index_server import initialize_index, query_index, insert_into_index, get_documents_list

app = Flask(__name__)
CORS(app)

# NOTE: for local testing only, do NOT deploy with your key hardcoded
os.environ['OPENAI_API_KEY'] = "your key here"

# initialize manager connection
# BaseManager is a way to manage shared resources in a distributed environment
# You can think of it similarly as submitting jobs to the cluster
# Except that the cluster is just a single machine (for S3, it's multiple machines)
# NOTE: you might want to handle the password in a less hardcoded way
manager = BaseManager(('127.0.0.1', 5602), b'password')
manager.register('query_index')
manager.register('insert_into_index')
manager.register('get_documents_list')
manager.register('get_current_time')
manager.connect()


@app.route('/time')
def get_current_time():
    global manager
    return {'time': time.time()}

@app.route("/query", methods=["GET"])
def query_index():
    global manager # manager object is defined in the global scope
    query_text = request.args.get("text", None)
    if query_text is None:
        return "No text found, please include a ?text=blah parameter in the URL", 400
    
    response = manager.query_index(query_text)._getvalue() # Where is query_index method?
    print("response: {}".format(response))
    response_json = {
        "text": str(response),
        "sources": [{"text": str(x.node.get_text()), 
                     "similarity": round(x.score, 2),
                     "doc_id": str(x.node.ref_doc_id),
                     "start": x.node.node_info['start'],
                     "end": x.node.node_info['end']
                    } for x in response.source_nodes]
    }

    print("is this still printing?")
    return make_response(jsonify(response_json)), 200


@app.route("/uploadFile", methods=["POST"])
def upload_file():
    global manager
    if 'file' not in request.files:
        return "Please send a POST request with a file", 400
    
    filepath = None
    try:
        uploaded_file = request.files["file"]
        filename = secure_filename(uploaded_file.filename)
        print("filename: {}".format(filename))
        filepath = os.path.join(os.getcwd(), os.path.basename(filename))
        uploaded_file.save(filepath)

        if request.form.get("filename_as_doc_id", None) is not None:
            print("filename_as_doc_id: {}".format(filename))
            print("if block")
            manager.insert_into_index(filepath, doc_id=filename)
        else:
            print("filename_as_doc_id: {}".format(filename))
            print("else block")
            manager.insert_into_index(filepath)
    except Exception as e:
        # cleanup temp file
        if filepath is not None and os.path.exists(filepath):
            os.remove(filepath)
        return "Error: {}".format(str(e)), 500

    # cleanup temp file
    if filepath is not None and os.path.exists(filepath):
        os.remove(filepath)

    return "File inserted!", 200


@app.route("/getDocuments", methods=["GET"])
def get_documents():
    document_list = get_documents_list()

    return make_response(jsonify(document_list)), 200
    

@app.route("/")
def home():
    return "Hello, World! Welcome to the llama_index docker image!"


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
