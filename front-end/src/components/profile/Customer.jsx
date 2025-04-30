import React, { useState, useEffect } from "react";

import { sendDownloadModel, sendFileToTrain, sendMessageToTest } from "../../services/ai";
import { useAiModelsData } from "../../data/AIModelsData";

export const TrainModel = () => {
    const [fileData, setFileData] = useState(null);
    const [message, setMessage] = useState({});
    const [loading, setLoading] = useState(
        localStorage.getItem("trainingLoading") === "true"
    );

    useEffect(() => {
        localStorage.setItem("trainingLoading", loading);
    }, [loading]);

    const handleFileChange = (e) => setFileData(e.target.files[0]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        localStorage.setItem("trainingLoading", true);

        const formData = new FormData(e.target);

        let epoch = formData.get('epoch');
        let batch = formData.get('batch');

        if (!epoch)
            epoch = 3;

        if (!batch)
            batch = 3;

        if (!fileData)
        {
            setMessage({"message": "File Required", "color": "text-danger" });
            setLoading(false);
            localStorage.setItem("trainingLoading", false);
            
            return;
        }

        const fileExtension = fileData.name.split('.').pop().toLowerCase();
        if (fileExtension !== 'csv') {
            setMessage({ message: "Only CSV files are allowed.", color: "text-danger" });
            setLoading(false);
            localStorage.setItem("trainingLoading", false);

            return;
        }

        formData.append("file", fileData);

        const data = {
            "username": JSON.parse(localStorage.getItem("user")).username,
            "model": formData.get("model"),
            "file": formData.get("file"),
            "epoch": epoch,
            "batch": batch
        };

        const result = await sendFileToTrain(data);

        if (!result.success)
        {
            setMessage({"message": result.response, "color": "text-danger" });
            setLoading(false);
            localStorage.setItem("trainingLoading", false);

            return;
        }

        setMessage({"message": result.response, "color": "text-success" });
        setLoading(false);
        localStorage.setItem("trainingLoading", false);
    };

    const models = useAiModelsData();

    return (
        <section className="dashboard py-5">
            <div className="container d-flex flex-column justify-content-center align-items-center bg-white w-50 py-4">
                {message && <small className={message.color}>{message.message}</small>}
                <div className="content w-100" >
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
                            style={{ backgroundColor: '#4D869C', borderColor: '#7AB2B2'}}
                            disabled={loading}
                        >
                            {loading ? "Training In Progress. . ." : "Start Training"}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export const TestModel = () => {
    const [messages, setMessages] = useState([]);
    const [selectedModel, setSelectedModel] = useState("");
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

        if (!result.success)
            return;

        const modelResponse = {
            id: messages.length + 2,
            sender: 'model',
            text: result.response.data?.message || "Sorry, something went wrong.",
        };

        setMessages([...messages, newMessage, modelResponse]);
        
        e.target.message.value = "";
    };

    return (
        <section className="dashboard chat py-5">
            <div className="container d-flex flex-column justify-content-center align-items-center">

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
                                            {message.sender === 'user' ? 'You' : 'Model'}: {message.text}
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
                            <button style={{ backgroundColor: '#4D869C', borderColor: '#4D869C'}} type="submit" className="btn btn-primary">
                                <img src={`${process.env.PUBLIC_URL}/icons/Submit.svg`} width={10} height={10} alt="Submit" />
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
