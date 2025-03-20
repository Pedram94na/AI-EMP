import torch, evaluate
from transformers import BertTokenizer, BertForSequenceClassification, Trainer, TrainingArguments
from datasets import Dataset

from data.data_manager import fetch_data, fetch_label_keys, fetch_label_values

model = None
tokenizer = None
label_map = None

def train_model():
    global model, tokenizer, label_map

    data_list = fetch_data()
    label_keys_list = fetch_label_keys()
    label_values_list = fetch_label_values()

    label_map = {label: index for index, label in enumerate(label_values_list)}
    
    for item in data_list:
        item['labels'] = label_map[item[label_keys_list[0]]]
    
    data = Dataset.from_list(data_list)

    model_name = "bert-base-uncased"
    tokenizer = BertTokenizer.from_pretrained(model_name)
    model = BertForSequenceClassification.from_pretrained(model_name, num_labels=len(label_values_list))

    def preprocess_dataset(batch):
        encoding = tokenizer(batch[label_keys_list[1]], padding="max_length", truncation=True, max_length=len(data))
        encoding["labels"] = batch["labels"]
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
        output_dir="./results",
        num_train_epochs=3,
        per_device_train_batch_size=4,
        per_device_eval_batch_size=4,
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

    model.save_pretrained("./trained_model")
    tokenizer.save_pretrained("./trained_model")

def test_model(user_message):
    global model, tokenizer, label_map

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