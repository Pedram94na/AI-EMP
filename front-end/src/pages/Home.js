import React from "react";

import { Header } from '../components/Header';
import { Footer } from "../components/Footer";

import Intro from '../components/home/Intro';
import About from '../components/home/About';
import Reviews from '../components/home/Reviews';
import Guide from '../components/home/Guide';
import Blogs from '../components/home/Blogs';
import Contact from '../components/home/Contact';

const Home = () => {
    return (
        <div>
            
            <Header />

            <Intro />
            <About />
            <Guide />
            <Reviews />
            <Blogs />
            <Contact />
            
            <Footer />
        
        </div>
    );
};

export default Home;