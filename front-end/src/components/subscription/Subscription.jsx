import React, { useState } from "react";
import { sendNewSubscription } from "../../services/subscription";
import PaymentElementsWrapper from "./PaymentElementsWrapper";

const Subscription = ({ onPaymentSuccess }) => {
    const [selectedPlanId, setSelectedPlanId] = useState(null);
    const [showPayment, setShowPayment] = useState(false);
    const [showSubscriptionPlans, setShowSubscriptionPlans] = useState(true);

    const handleSubscriptionClick = (id) => {
        setSelectedPlanId(id);
        setShowPayment(true);
    };

    const handlePaymentSuccess = async () => {
        if (!selectedPlanId) return;

        const result = await sendNewSubscription(selectedPlanId);
        if (!result.success) {
            alert("Payment failed. Please try again.");
            return;
        }

        setShowPayment(false);
        setShowSubscriptionPlans(false);
        onPaymentSuccess();
    };

    const handleMaybeLater = () => window.location.reload();

    return (
        <>
            {showSubscriptionPlans && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                    style={{
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        backdropFilter: "blur(10px)",
                        zIndex: 1050
                    }}
                >
                    <div className="bg-white p-4 rounded shadow text-center">
                        <h4 className="mb-4">Subscription Plan</h4>

                        <div className="row g-3 mb-3">
                            <div className="col">
                                <button className="btn btn-outline-primary w-100" onClick={() => handleSubscriptionClick(1)}>
                                    <p className="mb-0 fw-bold">Plan 1</p>
                                    <p className="text-muted">Description of Plan 1</p>
                                </button>
                            </div>

                            <div className="col">
                                <button className="btn btn-outline-primary w-100" onClick={() => handleSubscriptionClick(2)}>
                                    <p className="mb-0 fw-bold">Plan 2</p>
                                    <p className="text-muted">Description of Plan 2</p>
                                </button>
                            </div>
                        </div>

                        <button className="btn btn-light w-100" onClick={handleMaybeLater}>
                            Maybe Later
                        </button>
                    </div>

                    {showPayment && <PaymentElementsWrapper onPaymentSuccess={handlePaymentSuccess} />}
                </div>
            )}
        </>
    );
};

export default Subscription;
