import pandas as pd
import numpy as np
from pymongo import MongoClient

# Configuration
client = MongoClient('mongodb://localhost:27017')
db = client['scitani_lidu']
collection = db['obyvatelstvo_pohlavi_vek_5']
csv_file_path = '../data_original/sldb2021_vek5_pohlavi.csv'
csv_chunksize = 1000

# Get data from CSV and insert into MongoDB
for chunk in pd.read_csv(csv_file_path, chunksize=csv_chunksize):
    chunk.replace({np.nan: None}, inplace=True)
    records = chunk.to_dict('records')
    collection.insert_many(records)