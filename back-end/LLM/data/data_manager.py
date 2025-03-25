import json

def fetch_data(id):
    data_set = f'./data/users/{id}/training_data.json'
    
    with open(data_set, 'r', encoding='utf-8') as file:
        data = json.load(file)
        
    return data

def fetch_label_keys(id):
    label_keys = f'./data/users/{id}/label_keys.json'
    
    with open(label_keys, 'r', encoding='utf-8') as file:
        keys = json.load(file)
        
    return keys

def fetch_label_values(id):
    label_values = f'./data/users/{id}/label_values.json'
    
    with open(label_values, 'r', encoding='utf-8') as file:
        values = json.load(file)
        
    return values