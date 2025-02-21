import React from "react";

import '../../styles/home/Roll.css';

const Reviews = () => {
    return (
        <section id="reviews" className="section">
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

export default Reviews;