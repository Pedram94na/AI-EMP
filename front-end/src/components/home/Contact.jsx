import React, { useState } from "react";
import { sendContactForm } from "../../services/contactForm";
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

const Contact = () => {
    const [responseMessage, setResponseMessage] = useState("");
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const name = formData.get('name');
        const emailAddress = formData.get('emailAddress');
        const phoneNumber = formData.get('phoneNumber') || '';
        const companyName = formData.get('companyName') || '';
        const websiteUrl = formData.get('websiteUrl') || '';
        const content = formData.get('content')

        const newErrors = {};
        if (!name.trim()) newErrors.name = "Name is required.";
        if (!emailAddress.trim()) newErrors.emailAddress = "Email is required.";
        if (!content.trim()) newErrors.content = "Message is required.";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const formValues = {
            name,
            emailAddress,
            content,
            ...(phoneNumber.trim() && { phoneNumber }),
            ...(companyName.trim() && { companyName }),
            ...(websiteUrl.trim() && { websiteUrl }),
        };

        setErrors({});

        const result = await sendContactForm(formValues);
        setResponseMessage(result.message);

        if (result.success)
            e.target.reset();
    };

    return (
        <section id="contact" className="py-5">
            <Container className="text-center">
                <h1 style={{ fontFamily: "Georgia, serif" }} className="mb-4">Contact Us</h1>

                <Row className="justify-content-center">
                    <Col md={8} lg={6}>
                        <div className="content bg-white p-5 rounded-3 shadow-sm">
                            <Form onSubmit={handleSubmit} className="form-container">
                                
                                <Form.Group className="mb-3" controlId="formName">
                                    <Form.Label className="text-left">Name</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Your Name" 
                                        name="name" 
                                        className="input-field" 
                                        style={{ backgroundColor: '#CDE8E5' }} 
                                    />
                                    {errors.name && <small className="text-danger">{errors.name}</small>}
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label className="text-left">Email</Form.Label>
                                    <Form.Control 
                                        type="email" 
                                        placeholder="Your Email" 
                                        name="emailAddress" 
                                        className="input-field"
                                        style={{ backgroundColor: '#CDE8E5' }} 
                                    />
                                    {errors.emailAddress && <small className="text-danger">{errors.emailAddress}</small>}
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formPhone">
                                    <Form.Label className="text-left">Phone (Optional)</Form.Label>
                                    <Form.Control 
                                        type="tel" 
                                        placeholder="Your Phone Number" 
                                        name="phoneNumber" 
                                        className="input-field"
                                        style={{ backgroundColor: '#CDE8E5' }} 
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formCompanyName">
                                    <Form.Label className="text-left">Company Name (Optional)</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Company Name" 
                                        name="companyName" 
                                        className="input-field"
                                        style={{ backgroundColor: '#CDE8E5' }} 
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formWebsite">
                                    <Form.Label className="text-left">Company Website (Optional)</Form.Label>
                                    <Form.Control 
                                        type="url" 
                                        placeholder="Website URL" 
                                        name="websiteUrl" 
                                        className="input-field"
                                        style={{ backgroundColor: '#CDE8E5' }} 
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formMessage">
                                    <Form.Label className="text-left">Message</Form.Label>
                                    <Form.Control 
                                        as="textarea" 
                                        placeholder="Your Message..." 
                                        name="content" 
                                        className="input-field textarea-field"
                                        style={{ backgroundColor: '#CDE8E5', height: '200px', minHeight: '200px', maxHeight: '200px' }} 
                                    />
                                    {errors.content && <small className="text-danger">{errors.content}</small>}
                                </Form.Group>

                                <Button variant="primary" type="submit" style={{ backgroundColor: "#4D869C" }}>
                                    Send
                                </Button>
                            </Form>

                            {responseMessage && (
                                <Alert variant="info" className="mt-4">
                                    {responseMessage}
                                </Alert>
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Contact;
