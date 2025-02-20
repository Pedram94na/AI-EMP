import React from 'react';

import '../../styles/profile/Overlay.css';

const Payment = () => {
    return (
        <section className="overlay payment">
            <div className="content">
                <h4 className="title">Payment Details</h4>

                <form>
                    <label>Cardholder Name</label>
                    <input type="text" id="card-name" name="card-name" required />

                    <label>Card Number</label>
                    <input type="text" id="card-number" name="card-number" pattern="\d{16}" placeholder="Enter 16-digit card number" required />

                    <label>Expiry Date</label>
                    <input type="month" id="expiry" name="expiry" required />

                    <label>CVV</label>
                    <input type="text" id="cvv" name="cvv" pattern="\d{3}" placeholder="3-digit CVV" required />
                    
                    <button type="submit">Submit</button>
                </form>
            </div>
        </section>
    );
};

export default Payment;