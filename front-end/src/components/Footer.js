import React from "react";

import logo from "../assets/images/Logo.png";
import '../styles/Footer.css';

const Footer = () => {
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
            </div>

            <h2 id="dev-info">Developed By Pedram Negahban - 2025</h2>
        </footer>
    );
};

export default Footer;