import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { UseScrollToSection } from './home/useScrollToSection';

export const Header = () => {
    UseScrollToSection();

    return (
        <header className="d-flex flex-column">
            <Container className="py-5">
                <Row className="align-items-center">
                    <Col md={6} className="text-center text-md-left">
                        <img src="/logo/Logo-w-bg.png" width={500} height={500} alt="Logo" className="img-fluid" />
                    </Col>
                    <Col md={6} className="text-center text-md-left">
                        <div className="mt-4 mt-md-0">
                            <p style={{ fontFamily: "Georgia, serif" }} className="fs-3 fw-bold">
                                Train Your AI Employee.<br />
                                With No Code.
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </header>
    );
};
