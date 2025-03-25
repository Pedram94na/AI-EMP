import React from "react";
import { Nav, Button, Container, Row, Col } from "react-bootstrap";

import { useGlobalState } from '../utils/globalStateContext';

export const Footer = () => {
    const { setSignup, setSignin } = useGlobalState();
    
    const isSessionActive = Boolean (localStorage.getItem('token'));

    return (
        <footer className="bg-light py-4 mt-5">
        <Container>
          <Row className="align-items-center">
            <Col md={4} className="text-center">
              <a href="/">
                <img src="/logo/Logo-w-bg.png" width={100} height={100} alt="Logo" />
              </a>
            </Col>
            <Col md={2} className="text-center">
              <Nav className="flex-column">
                <Nav.Link href="#intro">Home</Nav.Link>
                <Nav.Link href="#about">About</Nav.Link>
              </Nav>
            </Col>
            <Col md={2} className="text-center">
              <Nav className="flex-column">
                <Nav.Link href="#guide">Guide</Nav.Link>
                <Nav.Link href="#reviews">Reviews</Nav.Link>
              </Nav>
            </Col>
            <Col md={2} className="text-center">
              <Nav className="flex-column">
                <Nav.Link href="#blogs">Blog</Nav.Link>
                <Nav.Link href="#contact">Contact</Nav.Link>
              </Nav>
            </Col>
          </Row>
          <Row className="text-center mt-3">
            <Col>
              {!isSessionActive && (
                <>
                  <Button variant="primary" className="me-2" onClick={() => setSignup(true)}>
                    Sign Up
                  </Button>
                  <Button variant="outline-primary" onClick={() => setSignin(true)}>
                    Sign In
                  </Button>
                </>
              )}
            </Col>
          </Row>
          <Row className="text-center mt-3">
            <Col>
              <p>Developed By Pedram Negahban - 2025</p>
            </Col>
          </Row>
        </Container>
      </footer>
    );
};