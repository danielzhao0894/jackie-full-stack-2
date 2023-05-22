import os
import pickle
from multiprocessing import Lock
from multiprocessing.managers import BaseManager
from llama_index import SimpleDirectoryReader, GPTSimpleVectorIndex, GPTVectorStoreIndex, Document, ServiceContext
import pdb
# from llama_index.storage.index_store import SimpleDocumentStore
# from llama_index import StorageContext
# from llama_index import load_index_from_storage

index = None
stored_docs = {}
lock = Lock()
indices = {}

persist_dir = './'
index_name = "./index.json"
pkl_name = "stored_documents.pkl"

def initialize_index():
    """Create a new global index, or load one from the pre-set path."""
    global index, stored_docs, indices
    
    print("initialize_index function running")
    
    service_context = ServiceContext.from_defaults(chunk_size_limit=512)

    with lock:

        index = GPTSimpleVectorIndex([], service_context=service_context)
        # index.save_to_disk(index_name)
        # index.storage_context.persist(persist_dir=persist_dir)
        # print("index size: {}".format(index.size))
        
        """ if os.path.exists(index_name):
            index = GPTSimpleVectorIndex.load_from_disk(index_name, service_context=service_context)
            # rebuild storage context
            # storage_context = StorageContext.from_defaults(persist_dir=index_name)
            # index = load_index_from_storage(service_context=service_context)

            # print("index size: {}".format(index.size))
            # SimpleDocumentStore.from_persist_path(index_name)
        else:
            index = GPTSimpleVectorIndex([], service_context=service_context)
            index.save_to_disk(index_name)
            # index.storage_context.persist(persist_dir=persist_dir)
            # print("index size: {}".format(index.size))
        if os.path.exists(pkl_name):
            with open(pkl_name, "rb") as f:
                stored_docs = pickle.load(f """


def query_index(query_text, doc_id):
    """Query the global index."""
    global indices, index
    print("query_index function running")
    print("query_text: {}".format(query_text))
    print("doc_id: {}".format(doc_id))
    
    print("index keys: {}".format(indices.keys()))
    index = indices[doc_id]
    print("index: {}".format(index))
    response = index.query(query_text)
    return response

def create_index(doc_file_path, doc_id = None, index=None):
    """Create and upload index."""
    global stored_docs, indices
    documents = SimpleDirectoryReader(input_files=[doc_file_path]).load_data()
    document = documents[0]
    # documents = [documents]
    if doc_id is not None:
        document.doc_id = doc_id

    print("creating index: {}".format(document.doc_id))

    with lock:
        # Keep track of stored docs -- llama_index doesn't make this easy
        stored_docs[document.doc_id] = document.text[0:200]  # only take the first 200 chars

        index = GPTVectorStoreIndex.from_documents(documents)
        #print("index size: {}".format(index.size))
        index.save_to_disk(index_name)

        indices[doc_id] = index
        
        # with open(pkl_name, "wb") as f:
            # pickle.dump(stored_docs, f)

    return


def get_index(doc_id):
    """Return index from doc_id."""
    global indices
    index = indices[doc_id]
    return index 

def get_indices():
    """Return indices."""
    global indices
    return indices

def insert_into_indices(index):
    global indices
    with lock:
        indices[index.doc_id] = index
    
    return

def insert_into_index(doc_file_path, doc_id=None):
    """Insert new document into global index."""
    global index, stored_docs
    document = SimpleDirectoryReader(input_files=[doc_file_path]).load_data()[0]
    if doc_id is not None:
        document.doc_id = doc_id

    print("inserting document: {}".format(document.doc_id))

    with lock:
        # Keep track of stored docs -- llama_index doesn't make this easy
        stored_docs[document.doc_id] = document.text[0:200]  # only take the first 200 chars

        index.insert(document)
        #print("index size: {}".format(index.size))
        index.save_to_disk(index_name)
        
        with open(pkl_name, "wb") as f:
            pickle.dump(stored_docs, f)

    return

def get_documents_list():
    """Get the list of currently stored documents."""
    global stored_doc
    documents_list = []
    for doc_id, doc_text in stored_docs.items():
        documents_list.append({"id": doc_id, "text": doc_text})

    return documents_list


if __name__ == "__main__":
    # init the global index
    print("initializing index...")
    initialize_index()
    print("initialized index!")
    # print(index)

    # setup server
    # NOTE: you might want to handle the password in a less hardcoded way
    manager = BaseManager(('', 5602), b'password')
    manager.register('query_index', query_index)
    manager.register('insert_into_index', insert_into_index)
    manager.register('get_documents_list', get_documents_list)
    manager.register('create_index', create_index)
    manager.register('get_index', get_index)
    manager.register('get_indices', get_indices)
    manager.register('insert_into_indices', insert_into_indices)
    server = manager.get_server()

    print("server started...")
    server.serve_forever()



