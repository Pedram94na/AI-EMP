from sys import argv
from file.file_controller import file_controller

if __name__ == "__main__":
    if len(argv) != 3:
        raise TypeError(f"Invalid number of arguments: {len(argv)}")

    file_controller(argv[1], argv[2])
