import React from "react";

import '../../styles/profile/Section.css'

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
    return (
        <section className="dashboard">
            <h2>Train Model</h2>

            <div className="content">
                <form>
                    <select>
                        <option>Model X</option>
                        <option>Model Y</option>
                        <option>Model Z</option>
                    </select>

                    <input type="file" />

                    <input type="number" placeholder="batch"/>
                    <input type="number" placeholder="epoch"/>

                    <button>Train</button>
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
                
                <div className="message-log">MESSAGE LOGS</div>
                
                <div className="input-area">
                    <input type="text" placeholder="Type your message..." />
                    
                    <button>Send</button>
                </div>
            </div>
        </section>
    );
};