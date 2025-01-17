import React from "react";

import { Header } from '../components/Header';
import { Intro, About, Reviews, Guide, Blogs, Contact } from '../components/HomeSections';
import { Footer } from "../components/Footer";

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