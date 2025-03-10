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
    const [ showSubscription, setShowSubscription ] = useState(true);

    const { hasReview, hasSubscribed } = localStorage.getItem('user');
    console.log(localStorage.getItem('user'));
    
    console.log(hasReview);
    console.log(hasSubscribed);    

    const handlePaymentSuccess = () => {
        setShowSubscription(false);
    };

    return (
        <div>
            <Header />
            {showSubscription && <Subscription onPaymentSuccess={handlePaymentSuccess}/>}
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