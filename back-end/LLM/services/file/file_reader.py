import os, json

class FileReader:
    '''Parent to all file readers'''

    def __init__(self, file, username):
        self.file = file
        self.file_data = None
        self.training_data_file = f'./data/users/{username}/training_data.json'
        self.label_keys_file = f'./data/users/{username}/label_keys.json'
        self.label_values_file = f'./data/users/{username}/label_values.json'

        def set_directory(file):
            directory = os.path.dirname(file)

            if not os.path.exists(directory):
                os.makedirs(directory)

        set_directory(self.training_data_file)
        set_directory(self.label_keys_file)
        set_directory(self.label_values_file)

    def validate_file(self):
        if not os.path.exists(self.file):
            raise FileNotFoundError(f"File doesn't exist: {self.file}")
        print(f"File exists: {self.file}")
        
    def process_data(self):
        raise NotImplementedError("Method needs to be overriden in child")

class TextFileReader(FileReader):
    '''Reads a plain text file'''

    def process_data(self):
        with open(self.file, "r", encoding="utf-8") as file:
            lines = file.readlines()

        modified_lines = []

        for line in lines:
            pass
        
class CsvFileReader(FileReader):
    '''Reads a csv file'''

    def process_data(self):
        labels = self.file.fieldnames
        
        if len(labels) != 2:
            raise Exception("CSV file must have exactly 2 columns.")

        self.file_data = [row for row in self.file]
        
        unique_values = set()
        for row in self.file_data:
            unique_values.add(row[labels[0]])

        with open(self.training_data_file, "w", encoding="utf-8") as file:
            json.dump(self.file_data, file, indent=4)

        with open(self.label_keys_file, "w", encoding="utf-8") as file:
            json.dump(labels, file, indent=4)

        with open(self.label_values_file, "w", encoding="utf-8") as file:
            json.dump(list(unique_values), file, indent=4)
