Find the installation command for PyTorch here: https://pytorch.org/get-started/locally/

This is the command that was used by the developer
pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118

To check the cuda status whether you are using GPU or CPU you can use this code snippet.

```
import torch

print("Torch version:", torch.__version__)  # Check PyTorch version
print("CUDA available:", torch.cuda.is_available())  # Should return True if GPU is available
print("GPU:", torch.cuda.get_device_name(0) if torch.cuda.is_available() else None)  # Should return GPU name
```

Other packages

pip install transformers datasets
pip install accelerate>=0.21.0
pip install evaluate
pip install python-multipart
