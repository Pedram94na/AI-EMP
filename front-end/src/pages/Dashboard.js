import React from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import { Inbox, Models, TrainModel, TestModel } from "../components/user/Customer";
import { CreateBlog, EditBlog, Tickets } from "../components/user/Admin";

const Dashboard = () => {
    return (
        <div>
            <Header />

            <div id="main">
                <section id="main-section">
                    <img width={100} height={100} style={{ backgroundColor: "red" }} />

                    <ul id="user-info">
                        <li>Name: Pedram Negahban</li>
                        <li><button>Edit Profile</button></li>
                    </ul>
                </section>

                <section className="section">
                    <ul>
                        <li>Inbox</li>
                        <li>Models</li>
                        <li>Train Model</li>
                        <li>Test Model</li>

                        <li>Blog</li>
                        <li>Tickets</li>
                    </ul>
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