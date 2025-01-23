import os
import json

from os import path
from csv import DictReader

class FileReader:
    '''Parent to all file readers'''

    def __init__(self, file):
        self.file = file
        self.file_data = None
        self.save_file = './data/training_data.json'

        directory = path.dirname(self.save_file)

        if not path.exists(directory):
            os.makedirs(directory)

    def validate_file(self):
        if not path.exists(self.file):
            raise FileNotFoundError(f"File doesn't exist: {self.file}")
        
    def process_data(self):
        raise NotImplementedError("Method needs to be overriden in child")

class TextFileReader(FileReader):
    '''Reads a plain text file'''

    def process_data(self):
        self.validate_file()

        with open(self.file, "r", encoding="utf-8") as file:
            self.file_data = file.read()

        with open(self.save_file, "w", encoding="utf-8") as file:
            json.dump({"content": self.file_data}, file, indent=4)
        
class CsvFileReader(FileReader):
    '''Reads a csv file'''

    def process_data(self):
        self.validate_file()

        with open(self.file, "r", encoding="utf-8") as file:
            self.file_data = [row for row in DictReader(file)]

        data_to_save = {"content": []}
        for row in self.file_data:
            data_to_save['content'].append(row)

        with open(self.save_file, "w", encoding="utf-8") as file:
            json.dump(data_to_save, file, indent=4)
