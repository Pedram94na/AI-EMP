import React, { useState } from "react";
import Submit from "../../assets/images/Submit.svg"

import '../../styles/profile/Section.css'
import { sendDownloadModel, sendFileToTrain, sendGetAllAiModels, sendMessageToTest } from "../../services/ai";
import { useAiModelsData } from "../../data/AIModelsData";

export const Inbox = () => {
    return (
        <section className="dashboard">
            <h2>Your Messages</h2>

            <div className="content">
                <table>
                    <thead>
                        <th>Topic</th>
                        <th>Content</th>
                        <th>Date</th>
                    </thead>

                    <tbody>
                        <tr>
                            <td>Welcome</td>
                            <td>Welcome to AI EMP. Happy you're here :D</td>
                            <td>01.14.2025</td>
                        </tr>

                        <tr>
                            <td>Welcome</td>
                            <td>Welcome to AI EMP. Happy you're here :D</td>
                            <td>01.14.2025</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    );
};

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
        <section className="dashboard">
            <h2>Train Model</h2>

            <div className="content">
                <form onSubmit={handleSubmit}>
                    <select name="model">
                        <option value="">New Model</option>
                        {models.map((m) => (
                            <option value={m.training_date}>{m.training_date}</option>
                        ))}
                    </select>

                    <input type="file" name="file" onChange={handleFileChange}/>

                    <input type="number" placeholder="batch" name="batch"/>
                    <input type="number" placeholder="epoch" name="epoch"/>

                    <button type="submit" disabled={uploading}>
                        {uploading ? "Training In Progress. . ." : "Start Training"}
                    </button>
                </form>
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
        <section className="dashboard chat">
            <h2>Test Model</h2>

            <div className="content">
                <form onSubmit={handleSubmit}>
                    <select name="model" required>
                        <option value="">Select A Model</option>
                        {models.map((m) => (
                            <option key={m.training_date} value={m.training_date}>{m.training_date}</option>
                        ))}
                    </select>

                    <div className="message-log">
                        <ul>
                            {messages.map((message) => (
                                <li key={message.id} className="message">
                                    <span className={`label ${message.sender}`}>
                                        {message.sender === 'user' ? 'You' : 'Bot'}: {message.text}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="input-area">
                        <input type="text" name="message" placeholder="Type your message..." required />
                        <button type="submit">
                            <img src={Submit} width={10} height={10} alt="Submit" />
                        </button>
                    </div>
                </form>
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
        <section className="dashboard">
            <h2>Your Models</h2>

            <div className="content">
                <table>
                    <thead>
                        <th>ID</th>
                        <th>Training Date</th>
                        <th>Download</th>
                    </thead>

                    <tbody>
                        {models.map((model) => (
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
            </div>
        </section>
    );
};