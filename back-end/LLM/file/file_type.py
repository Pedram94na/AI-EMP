from file.file_reader import TextFileReader, CsvFileReader
import csv, io

def get_reader(file, file_extension, id):
    '''Returns an object of a file reader'''

    cases = {
        "1": TextFileReader(file, id),
        "2": CsvFileReader(file, id)
    }
    
    if file_extension not in cases:
        raise ValueError(f"Undefined File Type: {file_extension}")

    return cases.get(file_extension)

async def get_reader2(file, id):
    file_content = await file.read()
    file_decoded = file_content.decode("utf-8")
    file_io = io.StringIO(file_decoded)

    if (file.filename.endswith('csv')):
        return CsvFileReader(csv.DictReader(file_io), id)
