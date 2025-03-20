import json, os

def fetch_data():
    data_set = './data/training_data.json'
    
    with open(data_set, 'r', encoding='utf-8') as file:
        data = json.load(file)
        
    return data

def fetch_label_keys():
    label_keys = './data/label_keys.json'
    
    with open(label_keys, 'r', encoding='utf-8') as file:
        keys = json.load(file)
        
    return keys

def fetch_label_values():
    label_values = './data/label_values.json'
    
    with open(label_values, 'r', encoding='utf-8') as file:
        values = json.load(file)
        
    return values