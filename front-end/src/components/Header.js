import React from "react";

import logo from '../assets/images/Logo.png';

import '../styles/Main.css';
import '../styles/general/Header.css';

import { useGlobalState } from '../utils/globalStateContext';

import ChatbotOverlay from "./Chatbot";
import ReviewOverlay from "./review/ReviewOverlay";
import SignUpOverlay from "./auth/SignupOverlay";
import SignInOverlay from "./auth/SigninOverlay";

export const Header = () => {
    const { signupClicked, setSignup, signinClicked, setSignin } = useGlobalState();

    return (
        <header>
            <ChatbotOverlay />
            <ReviewOverlay />
            {signupClicked && <SignUpOverlay onCancel={() => setSignup(false)} />}
            {signinClicked && <SignInOverlay onCancel={() => setSignin(false)} />}

            <a id="header-logo" href="/">
                <img width={70} height={70} src={logo} alt="Logo" />
            </a>

            <nav id="header-nav">
                <ul>
                    <li><a href="#intro">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#guide">Guide</a></li>
                    <li><a href="#reviews">Reviews</a></li>
                    <li><a href="#blogs">Blog</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>

            <div id="header-auth">
                <button className="signup" onClick={() => setSignup(true)}>
                        Sign Up
                </button>

                <button onClick = {() => setSignin(true)}>
                        Sign In
                </button>

                <button onClick = {() => console.log("Sign Out")}>
                    Sign Out
                </button>
            </div>
        </header>
    );
};