import time
import os
import sys
import logging
from multiprocessing.managers import BaseManager
from multiprocessing import Lock
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from werkzeug.utils import secure_filename
from llama_index import GPTVectorStoreIndex, SimpleDirectoryReader, ServiceContext, Document
import pdb



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
manager = BaseManager(address=('127.0.0.1', 5602), authkey=b'password')
manager.connect()


manager.register('query_index')
manager.register('insert_into_index')
manager.register('get_documents_list')
manager.register('create_index')
manager.register('get_current_time')
manager.register('get_index')
manager.register('get_indices') 
manager.register('insert_into_indices')


@app.route('/time')
def get_current_time():
    global manager
    return {'time': time.time()}

@app.route("/query", methods=["GET"])
def query_index():
    global manager # manager object is defined in the global scope
    query_text = request.args.get("text", None)
    doc_id = request.args.get("doc_id", None)  # Extract the doc_id parameter

    if query_text is None:
        return "No text found. Please include a ?text=blah parameter in the URL", 400

    if doc_id is None:
        return "No doc_id found. Please include a ?doc_id=blah parameter in the URL", 400
    
    response = manager.query_index(query_text, doc_id)._getvalue() 

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

    return make_response(jsonify(response_json)), 200

filepath = None

@app.route("/uploadFile", methods=["POST"])
def upload_file():
    global manager
    global filepath
    global indices

    if 'file' not in request.files:
        return "Please send a POST request with a file", 400
    
    try:
        uploaded_file = request.files["file"] # what type of object is this? 
        filename = secure_filename(uploaded_file.filename)
        print("filename: {}".format(filename))
        filepath = os.path.join(os.getcwd(), os.path.basename(filename))
        uploaded_file.save(filepath)

        if request.form.get("filename_as_doc_id", None) is not None:
            print("filename_as_doc_id: {}".format(filename))
            manager.create_index(filepath, doc_id=filename)
            
        else:
            print("filename_as_doc_id: {}".format(filename))
            # manager.insert_into_index(filepath)
            manager.create_index(filepath, doc_id=filename)

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
    global manager
    document_list = manager.get_documents_list()._getvalue()
    return make_response(jsonify(document_list)), 200

@app.route("/getIndices", methods=["GET"])
def get_indices():
    global manager
    indices = manager.get_indices()
    
    if indices is not None:
        keys = list(indices.keys())  # Extract the keys from the dictionary
        # values = list(indices.values())  # Extract the values from the dictionary
        response = {"keys": keys}  # Create a dictionary with the keys
        return response, 200 # Must return response object, dictionary, or stringifyable obj
    else:
        return "No file has been uploaded yet.", 404
    

@app.route("/")
def home():
    return "Hello, World! Welcome to the llama_index docker image!"


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False)
