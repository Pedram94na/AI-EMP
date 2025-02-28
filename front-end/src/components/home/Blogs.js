import React from "react";
import { useNavigate } from "react-router-dom";

import '../../styles/home/Roll.css';

export const Blogs = () => {
    const navigate = new useNavigate();

    return (
        <section id="blogs">
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

                <a onClick={() => navigate('/blog')}>See All</a>
            </div>
        </section>
    );
};

export default Blogs;