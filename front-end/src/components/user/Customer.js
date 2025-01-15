import React from "react";

const Inbox = () => {
    return (
        <section className="section">
            <table>
                <thead>
                    <td>Topic</td>
                    <td>Content</td>
                    <td>Date</td>
                </thead>

                <tbody>
                    <tr>
                        <td>Welcome</td>
                        <td>Welcome to AI EMP. Happy you're here :D</td>
                        <td>01.14.2025</td>
                    </tr>
                </tbody>
            </table>
        </section>
    );
};

const Models = () => {
    return (
        <section className="section">
            <table>
                <thead>
                    <td>Name</td>
                    <td>ID</td>
                    <td>Creation Date</td>
                    <td>Last Training Date</td>
                    <td>API</td>
                    <td>Download</td>
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
        </section>
    );
};

const TrainModel = () => {
    return (
        <section className="section">
            <form id="training-form">
                <select>
                    <option>Model X</option>
                    <option>Model Y</option>
                    <option>Model Z</option>
                </select>

                <input type="file" />

                <input type="number" placeholder="batch"/>
                <input type="number" placeholder="epoch"/>

                <button>Start Training</button>
            </form>
        </section>
    );
};

const TestModel = () => {
    return (
        <section className="section">
            <div id="chatbot-content">
                <h3 id="chatbot-title">Test Model</h3>

                <select>
                    <option>Model X</option>
                    <option>Model Y</option>
                    <option>Model Z</option>
                </select>
                
                <div className="message-log">MESSAGE LOGS</div>
                
                <div className="input-area">
                    <input type="text" placeholder="Type your message..." />
                    
                    <button>Send</button>
                </div>
            </div>
        </section>
    );
};

export { Inbox, Models, TrainModel, TestModel };