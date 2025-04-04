import React, { useState } from "react";
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import { sendPayment } from "../../services/payment";

const Payment = ({ onPaymentSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [cardName, setCardName] = useState("");
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!stripe || !elements) {
            setError("Stripe is not initialized");
            setLoading(false);
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardNumberElement),
            billing_details: { name: cardName },
        });

        if (error) {
            setError(error.message);
            setLoading(false);
            return;
        }

        const response = await sendPayment({
            paymentMethodId: paymentMethod.id,
            amount: 1000,
            currency: "eur",
        });

        if (response.success) {
            setSuccess(true);
            setTimeout(() => {
                onPaymentSuccess();
            }, 1500);
        } else {
            setError(response.message || "Payment failed");
        }

        setLoading(false);
    };

    return (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" 
             style={{ zIndex: 1050 }}>
            <div className="card p-4 shadow-lg w-50">
                <h4 className="text-center mb-4">Payment Details</h4>

                <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
                    <input 
                        type="text" 
                        name="cardName" 
                        className="form-control"
                        placeholder="Cardholder Name"
                        value={cardName} 
                        onChange={(e) => setCardName(e.target.value)} 
                        required
                    />

                    <div className="form-control p-2">
                        <CardNumberElement />
                    </div>

                    <div className="d-flex gap-2">
                        <div className="form-control p-2">
                            <CardExpiryElement />
                        </div>
                        <div className="form-control p-2">
                            <CardCvcElement />
                        </div>
                    </div>

                    <button type="submit" style={{ backgroundColor: '#4D869C'}} className="btn btn-primary w-100" disabled={loading || !stripe}>
                        {loading ? "Processing..." : "Submit Payment"}
                    </button>

                    <button type="button" className="btn btn-light w-100 mt-2" onClick={() => window.location.reload()}>
                        Cancel
                    </button>
                </form>

                {error && <p className="text-danger text-center mt-3">{error}</p>}
                {success && <p className="text-success text-center mt-3">Payment Successful!</p>}
            </div>
        </div>
    );
};

export default Payment;
