import React, { useState } from "react";
import { sendNewSubscription } from "../../services/subscription";
import Payment from "../../components/subscription/Payment";

import '../../styles/profile/Overlay.css';

const Subscription = () => {
    const [selectedPlanId, setSelectedPlanId] = useState(null);
    const [showPayment, setShowPayment] = useState(false);

    const handleSubscriptionClick = (id) => {
        setSelectedPlanId(id);
        setShowPayment(true);
    };

    const handlePaymentSuccess = async () => {
        if (!selectedPlanId) return;

        const result = await sendNewSubscription(selectedPlanId);
        if (result.success)
        {
            alert("Subscription successful!");
            setShowPayment(false);
        }

        else
            alert("Payment failed. Please try again.");
    };

    return (
        <section className="overlay subscription">
            <div className="content">
                <h4 className="title">Subscription Plan</h4>

                <div className="plans">
                    <span onClick={() => handleSubscriptionClick(1)}>
                        <p>ewqeqwewqewqe</p>
                        <p>ewqeqwewqewqe</p>
                        <p>ewqeqwewqewqe</p>
                        <p>ewqeqwewqewqe</p>
                        <p>ewqeqwewqewqe</p>
                        <p>ewqeqwewqewqe</p>
                        <p>ewqeqwewqewqe</p>
                    </span>

                    <span onClick={() => handleSubscriptionClick(2)}>
                        <p>ewqeqwewqewqe</p>
                        <p>ewqeqwewqewqe</p>
                        <p>ewqeqwewqewqe</p>
                        <p>ewqeqwewqewqe</p>
                        <p>ewqeqwewqewqe</p>
                        <p>ewqeqwewqewqe</p>
                        <p>ewqeqwewqewqe</p>
                    </span>
                </div>
            </div>

            {showPayment && <Payment onPaymentSuccess={handlePaymentSuccess} />}
        </section>
    );
};

export default Subscription;