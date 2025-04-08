import React from "react";
import { Container } from "react-bootstrap";

const About = () => {
  return (
    <section id="about" className="d-flex flex-column align-items-center py-5">
      <Container className="text-center">
        <h1 style={{ fontFamily: "Georgia, serif" }}>What is AI EMP?</h1>
        <div className="content mt-4">
          <p style={{ fontSize: '20px', fontWeight: 'bold', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
          A web application where businesses and individuals can use to fine-tune a large language model with their own specific data and integrate AI into their own online platforms or even AI employees.
The problem that this application aims to solve is to make it easier for individuals and businesses, who are not interested in programming or do not have the time or the financial requirements to make their own AI model, use the benefits of AI in their work.
The application will have all the systems and components for retrieving a LLM API and fine-tuning the model ready. All that the users will need to do is to send their relevant data to the model through the user interface.
          </p>
        </div>
      </Container>
    </section>
  );
};

export default About;
