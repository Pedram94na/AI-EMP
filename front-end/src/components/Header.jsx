import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { UseScrollToSection } from './home/useScrollToSection';
import { Navigation } from "./Navigation";

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
                            <p className="fs-3 fw-bold">
                                Train. Test. Employ.<br />
                                Your own AI Employee.
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </header>
    );
};
