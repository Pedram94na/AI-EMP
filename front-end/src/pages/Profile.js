import React, { useState } from "react";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

import Intro from "../components/profile/Intro";
import { CreateBlog, EditBlog, Tickets } from "../components/profile/Admin";
import { Inbox, Models, TrainModel, TestModel } from "../components/profile/Customer";
import { Actions, inbox, models, trainModel, testModel, createBlog, editBlog, tickets } from '../components/profile/Actions';
import { ReviewOverlay } from '../components/review/ReviewOverlay';
import Subscription from "../components/subscription/Subscription";

const Dashboard = () => {
    const [ activeSection, setActiveSection ] = useState(inbox);
    const [ showSubscription, setShowSubscription ] = useState(true);

    const { hasReview, hasSubscribed, role } = JSON.parse(localStorage.getItem('user'));
    console.log(localStorage.getItem('user'));
    
    const handlePaymentSuccess = () => {
        setShowSubscription(false);
    };

    const isAdmin = JSON.parse(localStorage.getItem("user")).role === "Admin";
    
    return (
        <div>
            <Header />
            
            {
                !isAdmin && (
                    <>
                        {!hasReview  && <ReviewOverlay />}
                        {!hasSubscribed && showSubscription && <Subscription onPaymentSuccess={handlePaymentSuccess}/>}
                    </>
                )
            };

            {/* <Intro /> */}
            <Actions selectedSection={setActiveSection} isAdmin={isAdmin}/>

            {
                !isAdmin && (
                    <>
                        {/* {activeSection === inbox && <Inbox />} */}
                        {activeSection === trainModel && <TrainModel />}
                        {activeSection === testModel && <TestModel />}
                        {activeSection === models && <Models />}
                    </>
                )
            };
            
            {
                isAdmin && (
                    <>
                        {activeSection === createBlog && <CreateBlog />}
                        {activeSection === editBlog && <EditBlog />}
                        {/* {activeSection === tickets && <Tickets />} */}
                    </>
                )
            };

            <Footer />
        </div>
    );
};

export default Dashboard;