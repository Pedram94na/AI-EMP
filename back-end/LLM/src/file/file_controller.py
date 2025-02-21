from file.file_type import get_reader

def process_file(file, file_extension):
    '''Runs the data file operations'''

    try:
        reader = get_reader(file, file_extension)
        reader.process_data()

    except Exception as e:
        print(f"ERROR: {e}")
