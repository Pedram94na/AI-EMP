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
              This video shows a step=by-step tutorial on how to use this application to train your own AI model, test it and download so that you can integrate it into your own application.
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
