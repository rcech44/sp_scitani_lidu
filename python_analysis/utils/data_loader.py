import pandas as pd
import numpy as np
from pymongo import MongoClient

def load_csv_into_db(collection, file_path, chunksize=1000) -> None:

    # Configuration
    client = MongoClient('mongodb://localhost:27017')
    db = client['scitani_lidu']
    collection = db[collection]
    csv_file_path = file_path
    csv_chunksize = chunksize

    # Get data from CSV and insert into MongoDB
    for chunk in pd.read_csv(csv_file_path, chunksize=csv_chunksize):
        chunk.replace({np.nan: None}, inplace=True)
        records = chunk.to_dict('records')
        collection.insert_many(records)

def load_from_db(collection) -> pd.DataFrame:

    client = MongoClient("mongodb://localhost:27017/")
    db = client["scitani_lidu"]
    collection = db[collection]
    data = []

    for index, document in enumerate(collection.find()):
        data.append(document)

    data = pd.DataFrame(data)
    data = data.replace({np.nan: None})
    return data