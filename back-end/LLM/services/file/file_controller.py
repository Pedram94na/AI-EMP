from services.file.file_type import reader_factory
import io

async def process_file(file, username):
    '''Runs the data file operations'''

    try:
        file_extension = file.filename.split('.')[-1]
    
        file_content = await file.read()
        file_decoded = file_content.decode("utf-8")
        file_io = io.StringIO(file_decoded)
        
        reader = await reader_factory(file_io, file_extension, username)
        reader.process_data()

    except Exception as e:
        print(f"ERROR: {e}")
