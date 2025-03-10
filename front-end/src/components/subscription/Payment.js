import React, { useState } from "react";
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import { sendPayment } from "../../services/payment";

import "../../styles/profile/Overlay.css";

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
            billing_details: {
                name: cardName,
            },
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
        <section className="overlay payment">
            <div className="content">
                <h4 className="title">Payment Details</h4>

                <form onSubmit={handleSubmit}>
                    <label>Cardholder Name</label>
                    <input 
                        type="text" 
                        name="cardName" 
                        className="card-input"
                        value={cardName} 
                        onChange={(e) => setCardName(e.target.value)} 
                        required
                    />

                    <label>Card Number</label>
                    <CardNumberElement className="card-input" />

                    <label>Expiry Date</label>
                    <CardExpiryElement className="card-input" />

                    <label>CVV</label>
                    <CardCvcElement className="card-input" />

                    <button type="submit" disabled={loading || !stripe}>
                        {loading ? "Processing..." : "Submit Payment"}
                    </button>
                </form>

                {error && <p style={{ color: "red" }}>{error}</p>}
                {success && <p style={{ color: "green" }}>Payment Successful!</p>}
            </div>
        </section>
    );
};

export default Payment;
