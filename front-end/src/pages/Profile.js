import React, { useState } from "react";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

import Intro from "../components/profile/Intro";
import { CreateBlog, EditBlog, Tickets } from "../components/profile/Admin";
import { Inbox, Models, TrainModel, TestModel } from "../components/profile/Customer";
import { Actions, inbox, models, trainModel, testModel, createBlog, editBlog, tickets } from '../components/profile/Actions';
import Subscription from "../components/subscription/Subscription";

const Dashboard = () => {
    const [ activeSection, setActiveSection ] = useState(inbox);

    return (
        <div>
            <Header />
            <Subscription />
            <Intro />
            <Actions selectedSection={setActiveSection} />

            {activeSection === inbox && <Inbox />}
            {activeSection === models && <Models />}
            {activeSection === trainModel && <TrainModel />}
            {activeSection === testModel && <TestModel />}
            
            {activeSection === createBlog && <CreateBlog />}
            {activeSection === editBlog && <EditBlog />}
            {activeSection === tickets && <Tickets />}

            <Footer />
        </div>
    );
};

export default Dashboard;