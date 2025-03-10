import React, { useState } from "react";
import { sendNewSubscription } from "../../services/subscription";

import '../../styles/profile/Overlay.css';
import PaymentElementsWrapper from "./PaymentElementsWrapper";

const Subscription = ({ onPaymentSuccess }) => {
    const [selectedPlanId, setSelectedPlanId] = useState(null);
    const [showPayment, setShowPayment] = useState(false);
    const [showSubscriptionPlans, setShowSubscriptionPlans] = useState(true);

    const handleSubscriptionClick = (id) => {
        setSelectedPlanId(id);
        setShowPayment(true); // Show payment form when a plan is selected
    };

    const handlePaymentSuccess = async () => {
        if (!selectedPlanId) return;

        const result = await sendNewSubscription(selectedPlanId);
        if (result.success) {
            alert("Subscription successful!");
            setShowPayment(false); // Hide the payment form
            setShowSubscriptionPlans(false); // Hide the subscription plans
            onPaymentSuccess(); // Notify the parent component of payment success
        } else {
            alert("Payment failed. Please try again.");
        }
    };

    return (
        <>
            {showSubscriptionPlans && (
                <section className="overlay subscription">
                    <div className="content">
                        <h4 className="title">Subscription Plan</h4>

                        <div className="plans">
                            <span onClick={() => handleSubscriptionClick(1)}>
                                <p>Plan 1</p>
                                <p>Description of Plan 1</p>
                            </span>

                            <span onClick={() => handleSubscriptionClick(2)}>
                                <p>Plan 2</p>
                                <p>Description of Plan 2</p>
                            </span>
                        </div>
                    </div>

                    {showPayment && <PaymentElementsWrapper onPaymentSuccess={handlePaymentSuccess} />}
                </section>
            )}
        </>
    );
};

export default Subscription;
