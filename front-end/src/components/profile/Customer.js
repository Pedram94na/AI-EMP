import React, { useState } from "react";
import Submit from "../../assets/images/Submit.svg"

import '../../styles/profile/Section.css'
import { sendFileToTrain } from "../../services/ai";

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

export const Models = () => {
    return (
        <section className="dashboard">
            <h2>Your Models</h2>

            <div className="content">
                <table>
                    <thead>
                        <th>Name</th>
                        <th>ID</th>
                        <th>Creation Date</th>
                        <th>Training Date</th>
                        <th>API</th>
                        <th>Download</th>
                    </thead>

                    <tbody>
                        <tr>
                            <td>My First Agent</td>
                            <td>23213dawd2e2d2w</td>
                            <td>01.14.2025</td>
                            <td>-</td>
                            <td>jdsiajdpoawkd2j9wjd9jadj89jwadj98jdwd89awhd9wahd98wahdaw</td>
                            <td>DOWNLOAD LINK</td>
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

        const formData = new FormData();
        formData.append("file", fileData);
        
        setUploading(true);

        const result = await sendFileToTrain(formData);
        console.log(result);

        if (result.success)
            alert("File uploaded successfully!");
        
        else
            alert("Upload failed: " + result.message);
        
        setUploading(false);
    };

    return (
        <section className="dashboard">
            <h2>Train Model</h2>

            <div className="content">
                <form onSubmit={handleSubmit}>
                    <select>
                        <option>Model X</option>
                        <option>Model Y</option>
                        <option>Model Z</option>
                    </select>

                    <input type="file" name="file" onChange={handleFileChange}/>

                    <input type="number" placeholder="batch"/>
                    <input type="number" placeholder="epoch"/>

                    <button type="submit" disabled={uploading}>
                        {uploading ? "Uploading..." : "Train"}
                    </button>
                </form>
            </div>
        </section>
    );
};

export const TestModel = () => {
    return (
        <section className="dashboard">
            <h2>Test Model</h2>

            <div className="content">
                <select>
                    <option>Model X</option>
                    <option>Model Y</option>
                    <option>Model Z</option>
                </select>
                
                <div className="message-log">
                        <div key="1" className="message">
                            <span className="label user">You: Hi</span>
                        </div>

                        < div key="2" className="message">
                            <span className="label bot">Bot: Hello there</span>
                        </div>

                        <div key="3" className="message">
                            <span className="label user">You: I need help!</span>
                        </div>
                        
                        < div key="4" className="message">
                            <span className="label bot">Bot: What is troubling you?</span>
                        </div>
                    </div>
                
                <div className="input-area">
                    <input type="text" placeholder="Type your message..." />
                    
                    <button>
                        <img src={Submit} width={10} height={10} />
                    </button>
                </div>
            </div>
        </section>
    );
};