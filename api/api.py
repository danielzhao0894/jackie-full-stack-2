import time
from flask import Flask
from dotenv import load_dotenv
import searching
from searching import get_dataframe
from embeddings import compute_doc_embeddings
import settings

app = Flask(__name__)

start = time.time()
user_query = "What are the effects of long covid?"
print(user_query)
df = get_dataframe(user_query)
search_time = time.time()
print(f"Search runtime: {search_time - start}")
context_embeddings = compute_doc_embeddings(df)
processing_time = time.time()
print(f"Local processing runtime: {processing_time - search_time}")
# example_entry = list(context_embeddings.items())[0]
# print(f"{example_entry[0]} : {example_entry[1][:5]}... ({len(example_entry[1])} entries)")

# @app.route('/time', methods = ['GET', 'POST'])
""" def get_current_time():
    return {'time': time.time()} """
