import React from "react";
import { Row, Col, Container } from "react-bootstrap";

const Guide = () => {
  return (
    <Container id="guide" className="py-5">
      <h1 className="text-center mb-4">How does AI EMP work?</h1>
      <Row className="justify-content-center">
        <Col md={8} className="mb-4">
          <div className="d-flex flex-column align-items-center">
            <p className="text-center">
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search
            </p>

            <div className="mt-4">
              <iframe
                width="700"
                height="500"
                src="https://www.youtube.com/embed/HrHUHGRIDMQ"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Guide;
