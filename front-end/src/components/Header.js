import React from "react";

import logo from '../assets/images/Logo.png';
import '../styles/general/Main.css';
import '../styles/general/Header.css';
import '../styles/general/SignupButton.css';

import { useGlobalState } from '../utils/gloablStateContext';
import { Chatbot } from "./Chatbot";
import { SignUp, SignIn } from "./auth/Auth";

export const Header = () => {
    const { signupClicked, setSignup, signinClicked, setSignin } = useGlobalState();

    return (
        <header>
            <Chatbot />
            {signupClicked && <SignUp onCancel={() => setSignup(false)} />}
            {signinClicked && <SignIn onCancel={() => setSignin(false)} />}

            <a id="header-logo">
                <img width={70} height={70} src={logo} alt="Logo" />
            </a>

            <nav id="header-nav">
                <a>Home</a>

                <a>About</a>

                <a>Reviews</a>

                <a>Guide</a>

                <a>Blog</a>

                <a>Contact</a>
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