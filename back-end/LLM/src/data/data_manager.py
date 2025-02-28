import json, os

def fetch_data(): # state/strategy design pattern
    dataset = './data/training_data.json'

    with open(dataset, 'r', encoding='utf-8') as file:
        data = json.load(file)['content']

    print(json.dumps(data, indent=4))