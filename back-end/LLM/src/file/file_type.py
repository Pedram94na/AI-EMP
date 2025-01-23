from file.file_reader import TextFileReader, CsvFileReader

def get_reader(input_type, file):
    '''Returns an object of a file reader'''

    cases = {
        "1": TextFileReader(file),
        "2": CsvFileReader(file)
    }
    
    if input_type not in cases:
        raise ValueError(f"Undefined File Type: {input_type}")

    return cases.get(input_type)
