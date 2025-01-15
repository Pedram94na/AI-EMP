import React from "react";

import logo from '../assets/images/Logo.png';
import '../styles/Header.css';

import Chatbot from "./Chatbot";
import { SignUp, SignIn } from "./user/Auth";

const Header = () => {
    return (
        <header>
            <Chatbot />
            {/* <SignUp />
            <SignIn /> */}

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
                <button className="signup" onClick = {() => console.log("Sign Up")}>
                        Sign Up
                </button>

                <button onClick = {() => console.log("Sign In")}>
                        Sign In
                </button>

                <button onClick = {() => console.log("Sign Out")}>
                    Sign Out
                </button>
            </div>
        </header>
    );
};

export default Header;