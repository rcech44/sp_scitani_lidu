import pandas as pd
from pymongo import MongoClient

# Nastavení připojení k MongoDB
client = MongoClient('mongodb://localhost:27017')
db = client['scitani_lidu']
collection = db['obyvatelstvo_pohlavi_vek_5']

csv_file_path = '../data_original/sldb2021_vek5_pohlavi.csv'

chunksize = 1000
for chunk in pd.read_csv(csv_file_path, chunksize=chunksize):
    records = chunk.to_dict('records')
    collection.insert_many(records)