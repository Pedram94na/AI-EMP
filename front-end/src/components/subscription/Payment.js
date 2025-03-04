import React, { useState } from 'react';
import '../../styles/profile/Overlay.css';

const Payment = ({ onPaymentSuccess }) => {
    const [formData, setFormData] = useState({
        cardName: '',
        cardNumber: '',
        expiry: '',
        cvv: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setTimeout(() => {
            alert("Payment Successful!");
            onPaymentSuccess();
        }, 1500);
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
                        value={formData.cardName} 
                        onChange={handleChange} 
                        required 
                    />

                    <label>Card Number</label>
                    <input 
                        type="text" 
                        name="cardNumber" 
                        value={formData.cardNumber} 
                        onChange={handleChange} 
                        pattern="\d{16}" 
                        placeholder="Enter 16-digit card number" 
                        required 
                    />

                    <label>Expiry Date</label>
                    <input 
                        type="month" 
                        name="expiry" 
                        value={formData.expiry} 
                        onChange={handleChange} 
                        required 
                    />

                    <label>CVV</label>
                    <input 
                        type="text" 
                        name="cvv" 
                        value={formData.cvv} 
                        onChange={handleChange} 
                        pattern="\d{3}" 
                        placeholder="3-digit CVV" 
                        required 
                    />

                    <button type="submit">Submit Payment</button>
                </form>
            </div>
        </section>
    );
};

export default Payment;
