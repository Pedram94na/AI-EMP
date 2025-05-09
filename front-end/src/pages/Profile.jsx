import React, { useState } from "react";

import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";

import { Chatbot, CreateBlog, ListAllBlogs } from "../components/profile/Admin";
import { Models, TrainModel, TestModel } from "../components/profile/Customer";
import { AdminActions, UserActions, models, trainModel, testModel, createBlog, blogsList, chatbot } from '../components/profile/Actions';
import { ReviewOverlay } from '../components/review/ReviewOverlay';
import Subscription from "../components/subscription/Subscription";

const Dashboard = () => {
    const [ activeSection, setActiveSection ] = useState();
    const [ showSubscription, setShowSubscription ] = useState(true);
    const [selectedBlog, setSelectedBlog] = useState();

    const { hasReview, isSubscribed, role } = JSON.parse(localStorage.getItem('user'));
    console.log(localStorage.getItem('user'));
    console.log("RE" + hasReview);
    console.log("SUB" + isSubscribed);
    
    
    const handlePaymentSuccess = () => {
        setShowSubscription(false);
    };

    const isAdmin = JSON.parse(localStorage.getItem("user")).role === "Admin";
    
    return (
        <div>
            <Navigation />
            
            {
                !isAdmin && (

                    <>
                        {!hasReview  && <ReviewOverlay />}
                        {!isSubscribed && showSubscription && <Subscription onPaymentSuccess={handlePaymentSuccess}/>}
                        
                        <UserActions setActiveSection={setActiveSection} />

                        {activeSection === trainModel && <TrainModel />}
                        {activeSection === testModel && <TestModel />}
                        {activeSection === models && <Models />}
                    </>
                )
            };
            
            {
                isAdmin && (
                    <>
                        <AdminActions setActiveSection={setActiveSection}/>

                        {activeSection === blogsList && <ListAllBlogs />}
                        {activeSection === createBlog && <CreateBlog />}
                        {activeSection === chatbot && <Chatbot />}
                    </>
                )
            };

            <Footer />
        </div>
    );
};

export default Dashboard;