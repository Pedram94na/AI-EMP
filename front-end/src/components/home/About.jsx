import React from "react";
import { Container } from "react-bootstrap";

const About = () => {
  return (
    <section id="about" className="d-flex flex-column align-items-center py-5">
      <Container className="text-center">
        <h1 style={{ fontFamily: "Georgia, serif" }}>What is AI EMP?</h1>
        <div className="content mt-4">
          <p style={{ fontSize: '20px', fontWeight: 'bold', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
          Want to employ an army of AIs? You're in the right place. Here you can bring your own dataset and train an AI model on, test it and download it so that you can add it to your own application.
          </p>
        </div>
      </Container>
    </section>
  );
};

export default About;
