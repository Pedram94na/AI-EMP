import React from "react";

import logo from '../assets/images/Logo.png';

import Header from '../components/Header';
import Footer from "../components/Footer";

import '../styles/Main.css';
import '../styles/Home.css';

const Home = () => {
    return (
        <div>
            <Header />

            <div id='main'>
                <section id="intro-section">
                    <img width={500} height={500} src={logo} alt="Logo" />

                    <div>
                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search</p>

                        <button className="signup" onClick = {() => console.log("Sign Up")}>
                            Sign Up
                        </button>
                    </div>
                </section>

                <section className="section">
                    <h2 className="title">What is AI EMP?</h2>

                    <div className="content">
                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search</p>
                    </div>
                </section>

                <section className="section">
                    <h2 className="title">What are our users saying about AI EMP?</h2>
                    
                    <div className="content">
                        <div className="roll">
                            <ul>
                                <li>
                                    <div className="user-review">
                                        <img src="" width={300} height={300} style={{ backgroundColor: "red" }} alt="" className="image" />

                                        <p className="name">Pedram</p>
                                        <p className="review">Very happy with this service :D</p>
                                    </div>
                                </li>

                                <li>
                                    <div className="user-review">
                                        <img src="" width={300} height={300} style={{ backgroundColor: "red" }} alt="" className="image" />

                                        <p className="name">Pedram2</p>
                                        <p className="review">333333333333333333333333</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="section">
                    <h2 className="title">How to start?</h2>

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

                <section className="section">
                    <h2 className="title">Blogs</h2>

                    <div className="content">
                        <div className="roll">
                            <ul>
                                <li>
                                    <div className="blog">
                                        <img src="" width={300} height={300} style={{ backgroundColor: "red" }} alt="" className="image" />

                                        <h3>What is software engineering?</h3>
                                        <p className="short-description">Finding solutions with architectural patterns</p>
                                    </div>
                                </li>

                                <li>
                                    <div className="user-review">
                                        <img src="" width={300} height={300} style={{ backgroundColor: "blue" }} alt="" className="image" />

                                        <h3>How to use AI in business?</h3>
                                        <p className="short-description">Make AI work for you!</p>
                                    </div>
                                </li>

                                <li>
                                    <div className="blog">
                                        <img src="" width={300} height={300} style={{ backgroundColor: "black" }} alt="" className="image" />

                                        <h3>What is software engineering?</h3>
                                        <p className="short-description">Finding solutions with architectural patterns</p>
                                    </div>
                                </li>

                                <li>
                                    <div className="user-review">
                                        <img src="" width={300} height={300} style={{ backgroundColor: "yellow" }} alt="" className="image" />

                                        <h3>How to use AI in business?</h3>
                                        <p className="short-description">Make AI work for you!</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="section">
                    <h2 className="title">Contact Us</h2>

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
            </div>

            <Footer />
        
        </div>
    );
};

export default Home;