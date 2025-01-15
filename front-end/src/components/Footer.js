import React from "react";

import logo from "../assets/images/Logo.png";
import '../styles/general/Footer.css';
import '../styles/general/SignupButton.css';

import { useGlobalState } from '../utils/gloablStateContext';

export const Footer = () => {
    const { setSignup, setSignin } = useGlobalState();
    
    return (
        <footer>
            <div id="common-info">
                <a id="footer-logo">
                    <img width={150} height={150} src={logo} alt="Logo" />
                </a>
                
                <nav id="footer-nav">
                    <ul>
                        <li><a>Home</a></li>
                        <li><a>About</a></li>
                        <li><a>Reviews</a></li>
                    </ul>

                    <ul>
                        <li><a>Guide</a></li>
                        <li><a>Blog</a></li>
                        <li><a>Contact</a></li>
                    </ul>
                </nav>

                <div id="footer-auth">
                    <button className="signup" onClick = {() => setSignup(true)}>
                            Sign Up
                    </button>

                    <button onClick = {() => setSignin(true)}>
                            Sign In
                    </button>
                </div>
            </div>

            <h2 id="dev-info">Developed By Pedram Negahban - 2025</h2>
        </footer>
    );
};