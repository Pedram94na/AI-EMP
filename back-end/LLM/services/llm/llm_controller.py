import torch, evaluate, json, os, zipfile
from transformers import BertTokenizer, BertForSequenceClassification, Trainer, TrainingArguments
from datasets import Dataset
from datetime import datetime

from data.data_manager import fetch_data, fetch_label_keys, fetch_label_values

def train_model(username, epoch, batch, existing_model_dir=None):
    data_list = fetch_data(username)
    label_keys_list = fetch_label_keys(username)
    label_values_list = fetch_label_values(username)

    label_map = {label: index for index, label in enumerate(label_values_list)}
    
    for item in data_list:
        item['labels'] = label_map[item[label_keys_list[0]]]
    
    data = Dataset.from_list(data_list)

    if existing_model_dir:
        model_path = f'./trained_model/{username}/{existing_model_dir}'
        model = BertForSequenceClassification.from_pretrained(model_path)
        tokenizer = BertTokenizer.from_pretrained(model_path)

    else:
        model_name = "bert-base-uncased"
        tokenizer = BertTokenizer.from_pretrained(model_name)
        model = BertForSequenceClassification.from_pretrained(model_name, num_labels=len(label_values_list))

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model.to(device)

    def preprocess_dataset(b):
        encoding = tokenizer(b[label_keys_list[1]], padding="max_length", truncation=True, max_length=len(data))
        encoding["labels"] = b["labels"]
        return encoding

    tokenized_data = data.map(preprocess_dataset, batched=True)

    train_test_split = tokenized_data.train_test_split(test_size=0.2)
    train_dataset = train_test_split["train"]
    val_dataset = train_test_split["test"]

    accuracy_metric = evaluate.load("accuracy")

    def compute_metrics(p):
        preds, labels = p
        preds = preds.argmax(axis=-1)
        accuracy = accuracy_metric.compute(predictions=preds, references=labels)
        return {"accuracy": accuracy["accuracy"]}

    training_args = TrainingArguments(
        output_dir=f"./results/{username}",
        num_train_epochs=epoch,
        per_device_train_batch_size=batch,
        per_device_eval_batch_size=batch,
        warmup_steps=100,
        weight_decay=0.01,
        logging_dir="./logs",
        logging_steps=10,
        evaluation_strategy="epoch",
        save_strategy="epoch",
        load_best_model_at_end=True,
        metric_for_best_model="eval_accuracy",
        greater_is_better=True,
        learning_rate=3e-5,
    )

    Trainer(
        model=model,
        args=training_args,
        train_dataset=train_dataset,
        eval_dataset=val_dataset,
        tokenizer=tokenizer,
        compute_metrics=compute_metrics,
    ).train()

    timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    trained_model_dir = f'./trained_model/{username}/{timestamp}'

    model.save_pretrained(trained_model_dir)
    tokenizer.save_pretrained(trained_model_dir)

    with open(f'{trained_model_dir}/label_map.json', 'w') as f:
        json.dump(label_map, f)

def test_model(user_message, username, dir):
    model_dir = f'./trained_model/{username}/{dir}'

    model = BertForSequenceClassification.from_pretrained(model_dir)
    tokenizer = BertTokenizer.from_pretrained(model_dir)

    with open(f'{model_dir}/label_map.json', 'r') as f:
        label_map = json.load(f)

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    
    model.to(device)

    index_to_label = {index: label for label, index in label_map.items()}

    model.eval()

    inputs = tokenizer(user_message, return_tensors="pt", padding=True, truncation=True, max_length=512)
    inputs = {key: value.to(device) for key, value in inputs.items()}

    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits
        predicted_class_idx = logits.argmax(dim=-1).item()

    return index_to_label[predicted_class_idx]

def get_all_directories(username):
    base_dir = f"./trained_model/{username}"

    if not os.path.isdir(base_dir):
        raise FileNotFoundError(f"No models found.")
    
    return [d for d in os.listdir(base_dir) if os.path.isdir(os.path.join(base_dir, d))]

def fetch_model(username, date):
    model_dir = f'./trained_model/{username}/{date}'
    
    zip_filename = os.path.join(model_dir, 'model_package.zip')

    with zipfile.ZipFile(zip_filename, 'w') as zipf:
        for root, _, files in os.walk(model_dir):
            for file in files:
                if file == 'model_package.zip':
                    continue
                
                file_path = os.path.join(root, file)
                arcname = os.path.relpath(file_path, model_dir)
                zipf.write(file_path, arcname=arcname)

    return zip_filename
