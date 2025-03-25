from services.file.file_reader import TextFileReader, CsvFileReader
import csv

async def reader_factory(file_io, file_extension, username):
    '''Returns an object of a file reader'''

    cases = {
        "txt": TextFileReader(file_io, username),
        "csv": CsvFileReader(csv.DictReader(file_io), username)
    }
    
    if file_extension not in cases:
        raise ValueError(f"Undefined File Type: {file_extension}")

    return cases.get(file_extension)
