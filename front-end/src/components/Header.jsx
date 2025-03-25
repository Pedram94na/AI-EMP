import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from '../assets/images/Logo.png';
import '../styles/Main.css';
import '../styles/general/Header.css';

import { useGlobalState } from '../utils/globalStateContext';
import ChatbotOverlay from "./chatbot/Chatbot";
import SignUpOverlay from "./auth/SignupOverlay";
import SignInOverlay from "./auth/SigninOverlay";
import { signout } from "../utils/signout";

export const Header = () => {
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
        <header>
            <ChatbotOverlay />
            {signupClicked && <SignUpOverlay onCancel={() => setSignup(false)} />}
            {signinClicked && <SignInOverlay onCancel={() => setSignin(false)} />}

            <a id="header-logo" href="/">
                <img width={70} height={70} src={logo} alt="Logo" />
            </a>

            <nav id="header-nav">
                <ul>
                    <li><a href="#intro" onClick={(e) => handleNavClick(e, "intro")}>Home</a></li>
                    <li><a href="#about" onClick={(e) => handleNavClick(e, "about")}>About</a></li>
                    <li><a href="#guide" onClick={(e) => handleNavClick(e, "guide")}>Guide</a></li>
                    <li><a href="#reviews" onClick={(e) => handleNavClick(e, "reviews")}>Reviews</a></li>
                    <li><a href="#blogs" onClick={(e) => handleNavClick(e, "blogs")}>Blog</a></li>
                    <li><a href="#contact" onClick={(e) => handleNavClick(e, "contact")}>Contact</a></li>
                </ul>
            </nav>

            <div id="header-auth">
                {!isSessionActive && (
                    <>
                        <button className="signup" onClick={() => setSignup(true)}>
                                Sign Up
                        </button>

                        <button onClick={() => setSignin(true)}>
                                Sign In
                        </button>
                    </>
                )}

                {isSessionActive && (
                    <>
                        <button onClick={() => signout(setIsSessionActive, navigate)}>Sign Out</button>
                    </>
                )}
            </div>
        </header>
    );
};
