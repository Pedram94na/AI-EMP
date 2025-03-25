import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Navbar, Nav, Button, Container, NavItem } from "react-bootstrap";

import { useGlobalState } from '../utils/globalStateContext';
import ChatbotOverlay from "./chatbot/Chatbot";
import SignUpOverlay from "./auth/SignupOverlay";
import SignInOverlay from "./auth/SigninOverlay";
import { signout } from "../utils/signout";

export const Navigation = () => {
    const { signupClicked, setSignup, signinClicked, setSignin } = useGlobalState();
    const [isSessionActive, setIsSessionActive] = useState(Boolean(localStorage.getItem('token')));

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleStorageChange = () => {
            setIsSessionActive(Boolean(localStorage.getItem('token')));
        };

        window.addEventListener('storage', handleStorageChange);

        setIsSessionActive(Boolean(localStorage.getItem('token')));

        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const handleNavClick = (e, sectionId) => {
        e.preventDefault();

        location.pathname !== "/" ?
            navigate(`/?scrollTo=${sectionId}`) :
            document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }

    return (
      <>
        {signinClicked && <SignInOverlay onCancel={() => setSignin(false)} />}
        {signupClicked && <SignUpOverlay onCancel={() => setSignup(false)} />}
        <ChatbotOverlay />

        <Navbar bg="light" expand="lg" className="px-3">
          <Container>
            <Navbar.Brand href="/">
              <img src="/logo/Logo-w-bg.png" width={70} height={70} alt="Logo" />
            </Navbar.Brand>
    
            <Navbar.Toggle aria-controls="header-nav" />
            
            <Navbar.Collapse id="header-nav">
              <Nav className="me-auto">
                <Nav.Link href="#intro" onClick={(e) => handleNavClick(e, "intro")}>Home</Nav.Link>
                <Nav.Link href="#about" onClick={(e) => handleNavClick(e, "about")}>About</Nav.Link>
                <Nav.Link href="#guide" onClick={(e) => handleNavClick(e, "guide")}>Guide</Nav.Link>
                <Nav.Link href="#reviews" onClick={(e) => handleNavClick(e, "reviews")}>Reviews</Nav.Link>
                <Nav.Link href="#blogs" onClick={(e) => handleNavClick(e, "blogs")}>Blog</Nav.Link>
                <Nav.Link href="#contact" onClick={(e) => handleNavClick(e, "contact")}>Contact</Nav.Link>
              </Nav>
              
              <div className="d-flex">
                {!isSessionActive ? (
                  <>
                    <Button variant="primary" className="me-2" onClick={() => setSignup(true)}>
                      Sign Up
                    </Button>
                    <Button variant="outline-primary" onClick={() => setSignin(true)}>
                      Sign In
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="danger" onClick={() => signout(setIsSessionActive, navigate)} className="me-2">
                      Sign Out
                    </Button>

                    <NavItem>
                      <Nav.Link 
                        href="/profile" 
                        className="d-flex align-items-center"
                        style={{ width: "30px", height: "30px",cursor: 'pointer', paddingLeft: '10px' }}
                      >
                        <img 
                          src={`${process.env.PUBLIC_URL}/icons/Profile.png`}
                          alt="Profile" 
                          width={50} 
                          height={50} 
                          style={{ backgroundColor: "#4D869C", borderRadius: "30px" ,padding: "10px", marginRight: '8px' }} 
                        />
                      </Nav.Link>
                    </NavItem>
                  </>
                )}
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
};
