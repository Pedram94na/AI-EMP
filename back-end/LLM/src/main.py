from sys import argv
from file.file_controller import process_file
from models.model import start_training

if __name__ == "__main__":
    if len(argv) != 3:
        raise TypeError(f"Invalid number of arguments: {len(argv)}")

    process_file(argv[1], argv[2])
    # start_training()
