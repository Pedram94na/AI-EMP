import React, { useState } from "react";
import { Nav, Button, Container, Row, Col } from "react-bootstrap";

import { useGlobalState } from '../utils/globalStateContext';

export const Footer = () => {
    const { setSignup, setSignin } = useGlobalState();
    const [hover, setHover] = useState(false);

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
                <Nav.Link href="#intro" style={{ color: "#4D869C" }}>Home</Nav.Link>
                <Nav.Link href="#about" style={{ color: "#4D869C" }}>About</Nav.Link>
              </Nav>
            </Col>
            <Col md={2} className="text-center">
              <Nav className="flex-column">
                <Nav.Link href="#guide" style={{ color: "#4D869C" }}>Guide</Nav.Link>
                <Nav.Link href="#reviews" style={{ color: "#4D869C" }}>Reviews</Nav.Link>
              </Nav>
            </Col>
            <Col md={2} className="text-center">
              <Nav className="flex-column">
                <Nav.Link href="#blogs" style={{ color: "#4D869C" }}>Blog</Nav.Link>
                <Nav.Link href="#contact" style={{ color: "#4D869C" }}>Contact</Nav.Link>
              </Nav>
            </Col>
          </Row>
          <Row className="text-center mt-3">
            <Col>
              {!isSessionActive && (
                <>
                  <Button variant="primary" style={{ backgroundColor: "#4D869C" }} className="me-2" onClick={() => setSignup(true)}>
                    Sign Up
                  </Button>
                  <Button variant="outline-primary" style={{
                      backgroundColor: hover ? "#4D869C" : "transparent",
                      color: hover ? "white" : "#4D869C",
                      borderColor: "#4D869C"
                    }} onClick={() => setSignin(true)}
                      onMouseEnter={() => setHover(true)}
                      onMouseLeave={() => setHover(false)}>
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