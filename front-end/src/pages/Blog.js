import React, { useState } from "react";

import { Header } from '../components/Header';
import BlogsList from '../components/blog/BlogsList';
import BlogDetail from "../components/blog/BlogDetails";
import { Footer } from "../components/Footer";

const Blogs = () => {
    const [ blog, setBlog ] = new useState(null);

    return (
        <div>
            <Header />

            { !blog ? <BlogsList onSelectBlog={setBlog} selectedBlog={blog} /> : <BlogDetail blog={blog} onClose={() => setBlog(null)}/> }

            <Footer />
        
        </div>
    );
};

export default Blogs;