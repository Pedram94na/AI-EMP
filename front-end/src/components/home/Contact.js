import React from "react";

const Contact = () => {
    return (
        <section id="contact">
            <h1>Contact Us</h1>

            <div className="content">
                <form>
                    <input type="text" placeholder="Name" />
                    <input type="email" placeholder="Email" /> 
                    <input type="tel" placeholder="Phone (Optional)" /> 
                    <input type="text" placeholder="Company Name (Optional)" /> 
                    <textarea placeholder="Message..." />

                    <button>Send</button>
                </form>
            </div>
        </section>
    );
};

export default Contact;