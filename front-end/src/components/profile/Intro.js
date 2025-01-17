import React from "react";

import '../../styles/general/Intro.css';

const Intro = () => {
    return (
        <section className="intro">
            <img src={null} width={100} height={100} style={{ backgroundColor: "red" }} />

            <div className="content">
                <ul>
                    <li>Pedram Negahban</li>
                    <li><button>Edit Profile</button></li>
                </ul>
            </div>
        </section>
    );
};

export default Intro;