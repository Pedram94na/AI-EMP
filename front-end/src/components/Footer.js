import React from "react";

import logo from "../assets/images/Logo.png";
import '../styles/general/Footer.css';

import { useGlobalState } from '../utils/gloablStateContext';

export const Footer = () => {
    const { setSignup, setSignin } = useGlobalState();
    
    return (
        <footer>
            <div id="common-info">
                <a id="footer-logo" href="/">
                    <img width={150} height={150} src={logo} alt="Logo" />
                </a>
                
                <nav id="footer-nav">
                    <ul>
                        <li><a href="#intro">Home</a></li>
                        <li><a href="#about">About</a></li>
                        <li><a href="#guide">Guide</a></li>
                    </ul>

                    <ul>
                        <li><a href="#reviews">Reviews</a></li>
                        <li><a href="#blogs">Blog</a></li>
                        <li><a href="#contact">Contact</a></li>
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

            <h3 id="dev-info">Developed By Pedram Negahban - 2025</h3>
        </footer>
    );
};