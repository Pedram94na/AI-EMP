import React, { useState } from "react";

import { Header } from '../components/Header';
import { Footer } from "../components/Footer";

import BlogsList from '../components/blog/BlogsList';
import BlogDetail from "../components/blog/BlogDetails";

const Blogs = () => {
    const [ blog, setBlog ] = new useState(null);

    const handleBlogSelection = (blog) => {
        setBlog(blog);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div>
            <Header />

            { !blog ? <BlogsList onSelectBlog={handleBlogSelection} /> : <BlogDetail blog={blog} onClose={() => setBlog(null)}/> }

            <Footer />
        
        </div>
    );
};

export default Blogs;