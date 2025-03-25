import React, { useState } from "react";

import { sendDownloadModel, sendFileToTrain, sendMessageToTest } from "../../services/ai";
import { useAiModelsData } from "../../data/AIModelsData";

export const TrainModel = () => {
    const [fileData, setFileData] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (e) => setFileData(e.target.files[0]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!fileData) {
            alert("Please select a file first.");
            return;
        }

        setUploading(true);

        const formData = new FormData(e.target);
        formData.append("file", fileData);

        const data = {
            "username": JSON.parse(localStorage.getItem("user")).username,
            "model": formData.get("model"),
            "file": formData.get("file"),
            "epoch": formData.get('epoch'),
            "batch": formData.get('batch')
        };

        console.log(data);

        const result = await sendFileToTrain(data);
        console.log(result);

        if (result.success)
            alert("File uploaded successfully!");
        else
            alert("Upload failed: " + result.message);

        setUploading(false);
    };

    const models = useAiModelsData();

    return (
        <section className="dashboard py-5">
            <div className="container d-flex flex-column justify-content-center align-items-center">
                <h2 className="mb-4">Train Model</h2>

                <div className="content w-100">
                    <form onSubmit={handleSubmit} className="w-100 d-flex flex-column align-items-center">
                        <div className="mb-3 w-50">
                            <select name="model" className="form-select">
                                <option value="">New Model</option>
                                {[...models].reverse().map((m) => (
                                    <option key={m.training_date} value={m.training_date}>{m.training_date}</option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3 w-50">
                            <input
                                type="file"
                                name="file"
                                onChange={handleFileChange}
                                className="form-control"
                            />
                        </div>

                        <div className="mb-3 w-50">
                            <input
                                type="number"
                                placeholder="Batch"
                                name="batch"
                                className="form-control"
                            />
                        </div>

                        <div className="mb-3 w-50">
                            <input
                                type="number"
                                placeholder="Epoch"
                                name="epoch"
                                className="form-control"
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-50"
                            disabled={uploading}
                        >
                            {uploading ? "Training In Progress. . ." : "Start Training"}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export const TestModel = () => {
    const [messages, setMessages] = useState([
        { id: 1, sender: 'user', text: 'Hi' },
        { id: 2, sender: 'bot', text: 'Hello there' },
        { id: 3, sender: 'user', text: 'I need help!' },
        { id: 4, sender: 'bot', text: 'What is troubling you?' },
        
    ]);

    const models = useAiModelsData();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const userMessage = formData.get("message").trim();
        const selectedModel = formData.get("model");

        if (!userMessage || !selectedModel) return;

        const newMessage = {
            id: messages.length + 1,
            sender: 'user',
            text: userMessage,
        };

        setMessages([...messages, newMessage]);

        const data = {
            username: JSON.parse(localStorage.getItem("user")).username,
            message: userMessage,
            training_date: selectedModel,
        };

        const result = await sendMessageToTest(data);

        if (!result.success) {
            alert("Failed to send message: " + result.message);
            return;
        }

        const botResponse = {
            id: messages.length + 2,
            sender: 'bot',
            text: result.response.data?.message || "Sorry, something went wrong.",
        };

        setMessages([...messages, newMessage, botResponse]);
        e.target.reset();
    };

    return (
        <section className="dashboard chat py-5">
            <div className="container d-flex flex-column justify-content-center align-items-center">
                <h2 className="mb-4">Test Model</h2>

                <div className="content w-100">
                    <form onSubmit={handleSubmit} className="w-100 d-flex flex-column align-items-center">
                        <div className="mb-3 w-50">
                            <select name="model" required className="form-select">
                                <option value="">Select A Model</option>
                                {[...models].reverse().map((m) => (
                                    <option key={m.training_date} value={m.training_date}>
                                        {m.training_date}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="message-log mb-4 w-50" style={{ backgroundColor: 'white', height: '300px', overflowY: 'auto' }}>
                            <ul className="list-unstyled">
                                {messages.map((message) => (
                                    <li key={message.id} className="mb-2 ps-3">
                                        <span className={`label ${message.sender}`}>
                                            {message.sender === 'user' ? 'You' : 'Bot'}: {message.text}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="input-area d-flex w-50">
                            <input
                                type="text"
                                name="message"
                                placeholder="Type your message..."
                                required
                                className="form-control me-2"
                            />
                            <button type="submit" className="btn btn-primary">
                                <img src={`${process.env.PUBLIC_URL}/icons/Submit.png`} width={10} height={10} alt="Submit" />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export const Models = () => {
    const handleDownload = async (e, training_date) => {
        e.preventDefault();
        
        await sendDownloadModel(training_date);
    };

    const models = useAiModelsData();

    return (
        <section className="dashboard py-5">
            <div className="container d-flex flex-column justify-content-center align-items-center">
                <h2 className="mb-4">Your Models</h2>

                <div className="content w-75">
                    <table className="table table-bordered" style={{ backgroundColor: 'white' }}>
                        <thead className="table-light" style={{ backgroundColor: '#ccc' }}>
                            <tr>
                            <th style={{ width: '1%' }}>ID</th>
                            <th style={{ width: '3%' }}>Training Date</th>
                            <th style={{ width: '3%' }}>Download</th>
                            </tr>
                        </thead>

                        <tbody>
                            {[...models].reverse().map((model) => (
                                <tr key={model.id}>
                                    <td>{model.id}</td>
                                    <td>{model.training_date}</td>
                                    <td>
                                        <a href="" onClick={(e) => handleDownload(e, model.training_date)}>DOWNLOAD</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        
                    </table>
                
                    {models.length === 0 && (
                        <div 
                            className="alert alert-warning d-flex justify-content-center align-items-center" 
                            style={{ width: '100%', height: '300px' }}
                        >
                            <strong>You don't have any models currently. Once you have trained a model, you can find them here.</strong>
                        </div>
                    )}

                </div>
            </div>
        </section>
    );
};
