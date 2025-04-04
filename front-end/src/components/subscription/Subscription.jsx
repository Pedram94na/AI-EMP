import React, { useState } from "react";
import { sendNewSubscription } from "../../services/subscription";
import PaymentElementsWrapper from "./PaymentElementsWrapper";

const Subscription = ({ onPaymentSuccess }) => {
    const [selectedPlanId, setSelectedPlanId] = useState(null);
    const [showPayment, setShowPayment] = useState(false);
    const [hover1, setHover1] = useState(false);
    const [hover2, setHover2] = useState(false);
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
                                <button className="btn btn-outline-primary w-100" onClick={() => handleSubscriptionClick(1)}
                                    style={{
                                        height: "350px",
                                        backgroundColor: hover1 ? "#7AB2B2" : "transparent",
                                        color: hover1 ? "white" : "#4D869C",
                                        borderColor: "#4D869C"
                                      }}
                                      onMouseEnter={() => setHover1(true)}
                                      onMouseLeave={() => setHover1(false)}
                                    >
                                    <p className="mb-0 fw-bold" style={{ color: '#4D869C'}}>Monthly Plan</p>
                                    <p className="text-muted"><strong>10 Euros</strong></p>
                                    <p className="text-muted">3 models to train</p>
                                    <p className="text-muted">Infinite retraining</p>
                                    <p className="text-muted">Downloading models</p>
                                </button>
                            </div>

                            <div className="col">
                                <button className="btn btn-outline-primary w-100" onClick={() => handleSubscriptionClick(2)}
                                    style={{
                                        height: "350px",
                                        backgroundColor: hover2 ? "#7AB2B2" : "transparent",
                                        color: hover2 ? "white" : "#4D869C",
                                        borderColor: "#4D869C"
                                    }}
                                    onMouseEnter={() => setHover2(true)}
                                    onMouseLeave={() => setHover2(false)}
                                    >
                                    <p className="mb-0 fw-bold" style={{ color: '#4D869C'}}>Yearly Plan</p>
                                    <p className="text-muted"><strong>100 Euros</strong></p>
                                    <p className="text-muted">Infinite models to train</p>
                                    <p className="text-muted">Infinite retraining</p>
                                    <p className="text-muted">Downloading models</p>
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
