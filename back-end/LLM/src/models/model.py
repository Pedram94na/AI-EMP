# import transformers
import torch
import json

from data.data_manager import fetch_data

def start_training():
    
    print(torch.__version__)

    dataset = fetch_data()
    # model_name = "mistralai/Mixtral-8x7B"
    # tokenizer = AutoTokenizer.from_pretrained(model_name)
    # model = AutoModelForCausalLM.from_pretrained(model_name)

    # training_args = TrainingArguments(
    #     output_dir="./results",
    #     per_device_train_batch_size=1,
    #     num_train_epochs=1,
    #     save_steps=10_000,
    #     save_total_limit=2,
    # )
    
    # trainer = Trainer(
    #     model=model,
    #     args=training_args,
    #     train_dataset=dataset,
    # )

    # trainer.train()