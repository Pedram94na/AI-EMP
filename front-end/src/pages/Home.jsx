import React from "react";

import { Navigation } from '../components/Navigation';
import { Header } from '../components/Header';
import { Footer } from "../components/Footer";

import About from '../components/home/About';
import Reviews from '../components/home/Reviews';
import Guide from '../components/home/Guide';
import Blogs from '../components/home/Blogs';
import Contact from '../components/home/Contact';

const Home = () => {
    return (
        <div>
            
            <Navigation />
            <Header />

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