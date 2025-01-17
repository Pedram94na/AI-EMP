import React from "react";

import logo from '../assets/images/Logo.png';

import '../styles/IntroSection.css';
import '../styles/Roll.css';

export const Intro = () => {
    return (
        <section className="intro-section">
            <img width={500} height={500} src={logo} alt="Logo" />

            <div className="content">
                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search</p>
            </div>
        </section>
    );
};

export const About = () => {
    return (
        <section className="section">
            <h1>What is AI EMP?</h1>

            <div className="content">
                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search</p>
            </div>
        </section>
    );
};

export const Guide = () => {
    return (
        <section>
            <h1>How does AI EMP work?</h1>

            <div className="content">
                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search</p>

                <div id="video" style={{ maxWidth: '100%', overflow: 'hidden' }}>
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/HrHUHGRIDMQ"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            </div>
        </section>
    );
};

export const Reviews = () => {
    return (
        <section className="section">
            <h1>What are our users saying about AI EMP?</h1>
            
            <div className="content">
                <div className="roll">
                    <ul>
                        <li>
                            <img src="" width={300} height={300} style={{ backgroundColor: "red" }} alt="" className="image" />

                            <p className="name">Pedram</p>
                            <p className="review">Very happy with this service :D</p>
                        </li>

                        <li>
                            <img src="" width={300} height={300} style={{ backgroundColor: "red" }} alt="" className="image" />

                            <p className="name">Pedram2</p>
                            <p className="review">333333333333333333333333</p>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export const Blogs = () => {
    return (
        <section>
            <h1>Blogs</h1>

            <div className="content">
                <div className="roll">
                    <ul>
                        <li>
                            <a>
                                <img src="" width={300} height={300} style={{ backgroundColor: "red" }} alt="" className="image" />

                                <h2>What is software engineering?</h2>
                                <p>Finding solutions with architectural patterns</p>
                            </a>
                        </li>

                        <li>
                            <a>
                                <img src="" width={300} height={300} style={{ backgroundColor: "blue" }} alt="" className="image" />

                                <h2>How to use AI in business?</h2>
                                <p>Make AI work for you!</p>
                            </a>
                        </li>

                        <li>
                            <a>
                                <img src="" width={300} height={300} style={{ backgroundColor: "black" }} alt="" className="image" />

                                <h2>What is software engineering?</h2>
                                <p>Finding solutions with architectural patterns</p>
                            </a>
                        </li>

                        <li>
                            <a>
                                <img src="" width={300} height={300} style={{ backgroundColor: "yellow" }} alt="" className="image" />

                                <h2>How to use AI in business?</h2>
                                <p>Make AI work for you!</p>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export const Contact = () => {
    return (
        <section>
            <h1>Contact Us</h1>

            <div className="content">
                <form>
                    <input type="text" placeholder="Name" />
                    <input type="email" placeholder="Email" /> 
                    <input type="tel" placeholder="Phone (Optional)" /> 
                    <input type="text" placeholder="Company Name (Optional)" /> 
                    <textarea placeholder="Message..." />

                    <button>Send</button>
                </form>
            </div>
        </section>
    );
};