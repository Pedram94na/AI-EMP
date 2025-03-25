import React from "react";
import { Container } from "react-bootstrap";

const About = () => {
  return (
    <section id="about" className="d-flex flex-column align-items-center py-5">
      <Container className="text-center">
        <h1>What is AI EMP?</h1>
        <div className="content mt-4">
          <p>
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search
          </p>
        </div>
      </Container>
    </section>
  );
};

export default About;
