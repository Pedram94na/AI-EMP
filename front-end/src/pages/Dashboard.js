import React from "react";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { CreateBlog, EditBlog, Tickets } from "../components/user/Admin";
import { Inbox, Models, TrainModel, TestModel } from "../components/user/Customer";

const Dashboard = () => {
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
                        <ul>
                            <li>Inbox</li>
                            <li>Models</li>
                            <li>Train Model</li>
                            <li>Test Model</li>

                            <li>Blog</li>
                            <li>Tickets</li>
                        </ul>
                    </div>
                </section>

                <Inbox />
                <Models />
                <TrainModel />
                <TestModel />

                <CreateBlog />
                <EditBlog />
                <Tickets />
            </div>

            <Footer />
        </div>
    );
};

export default Dashboard;