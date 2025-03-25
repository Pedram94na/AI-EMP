import React from "react";

import { UseScrollToSection } from './useScrollToSection';

import '../../styles/home/Intro.css';
import logo from '../../assets/images/Logo.png';

const Intro = () => {
    UseScrollToSection();

    return (
        <section id="intro" className="intro">
            <img width={500} height={500} src={logo} alt="Logo" />

            <div className="content">
                <p>Train. Fine-Tune. Employ.<br />Your AI Employee.</p>
            </div>
        </section>
    );
};

export default Intro;