import React, { useState } from "react";
import { sendContactForm } from "../../services/contactForm";

const Contact = () => {
    const [ responseMessage, setResponseMessage ] = useState("");
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const formValues = {
            name: formData.get('name'),
            emailAddress: formData.get('emailAddress'),
            phoneNumber: formData.get('phoneNumber'),
            companyName: formData.get('companyName'),
            websiteUrl: formData.get('websiteUrl'),
            content: formData.get('content')
        };
        
        const result = await sendContactForm(formValues);
        setResponseMessage(result.message);

        window.location.reload();
    };

    return (
        <section id="contact">
            <h1>Contact Us</h1>

            <div className="content">
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Name" name="name" />
                    <input type="email" placeholder="Email" name="emailAddress" /> 
                    <input type="tel" placeholder="Phone (Optional)" name="phoneNumber" /> 
                    <input type="text" placeholder="Company Name (Optional)" name="companyName" />
                    <input type="url" placeholder="Company Website (Optional)" name="websiteUrl" />
                    <textarea placeholder="Message..." name="content" />

                    <button type="submit">Send</button>
                </form>

                { responseMessage && <p>{responseMessage}</p>}
            </div>
        </section>
    );
};

export default Contact;