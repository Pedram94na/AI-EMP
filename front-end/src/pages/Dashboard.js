import React, { useState } from "react";

import '../styles/dashboard/CategoryButtons.css';

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { CreateBlog, EditBlog, Tickets } from "../components/user/Admin";
import { Inbox, Models, TrainModel, TestModel } from "../components/user/Customer";
import { inbox, models, trainModel, testModel, createBlog, editBlog, tickets } from '../components/user/SectionCategories';

const Dashboard = () => {
    const [ activeSection, setActiveSection ] = useState(inbox);

    return (
        <div>
            <Header />

            <div>
                <section className="intro-section">
                    <img src={null} width={100} height={100} style={{ backgroundColor: "red" }} />

                    <div className="content">
                        <ul>
                            <li>Pedram Negahban</li>
                            <li><button>Edit Profile</button></li>
                        </ul>
                    </div>
                </section>

                <section className="section">
                    <div className="content">
                        <ul id="categories">
                            <li>
                                <button onClick={() => setActiveSection(inbox)}>Inbox</button>
                            </li>

                            <li>
                                <button onClick={() => setActiveSection(models)}>Models</button>
                            </li>

                            <li>
                                <button onClick={() => setActiveSection(trainModel)}>Train Model</button>
                            </li>

                            <li>
                                <button onClick={() => setActiveSection(testModel)}>Test Model</button>
                            </li>

                            <li>
                                <button onClick={() => setActiveSection(createBlog)}>New Blog</button>
                            </li>

                            <li>
                                <button onClick={() => setActiveSection(editBlog)}>Edit Blog</button>
                            </li>

                            <li>
                                <button onClick={() => setActiveSection(tickets)}>Tickets</button>
                            </li>
                        </ul>
                    </div>
                </section>

                {activeSection === inbox && <Inbox />}
                {activeSection === models && <Models />}
                {activeSection === trainModel && <TrainModel />}
                {activeSection === testModel && <TestModel />}
                
                {activeSection === createBlog && <CreateBlog />}
                {activeSection === editBlog && <EditBlog />}
                {activeSection === tickets && <Tickets />}
            </div>

            <Footer />
        </div>
    );
};

export default Dashboard;