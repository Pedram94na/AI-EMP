from file.file_type import get_reader

def file_controller(input_type, file):
    '''Controls data file operations'''

    try:
        reader = get_reader(input_type, file)
        reader.process_data()

    except Exception as e:
        print(f"ERROR: {e}")
