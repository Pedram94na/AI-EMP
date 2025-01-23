from file.file_reader import TextFileReader, CsvFileReader

def get_reader(file, file_extension):
    '''Returns an object of a file reader'''

    cases = {
        "1": TextFileReader(file),
        "2": CsvFileReader(file)
    }
    
    if file_extension not in cases:
        raise ValueError(f"Undefined File Type: {file_extension}")

    return cases.get(file_extension)
