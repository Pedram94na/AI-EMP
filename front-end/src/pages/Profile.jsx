import React, { useState } from "react";

import { Navigation } from "../components/Navigation";
import { Footer } from "../components/Footer";

import { CreateBlog, ListAllBlogs } from "../components/profile/Admin";
import { Models, TrainModel, TestModel } from "../components/profile/Customer";
import { AdminActions, UserActions, models, trainModel, testModel, createBlog, blogsList } from '../components/profile/Actions';
import { ReviewOverlay } from '../components/review/ReviewOverlay';
import Subscription from "../components/subscription/Subscription";

const Dashboard = () => {
    const [ activeSection, setActiveSection ] = useState();
    const [ showSubscription, setShowSubscription ] = useState(true);
    const [selectedBlog, setSelectedBlog] = useState();

    const { hasReview, hasSubscribed, role } = JSON.parse(localStorage.getItem('user'));
    console.log(localStorage.getItem('user'));
    
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
                        {!hasSubscribed && showSubscription && <Subscription onPaymentSuccess={handlePaymentSuccess}/>}
                        
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
                    </>
                )
            };

            <Footer />
        </div>
    );
};

export default Dashboard;