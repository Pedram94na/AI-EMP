import React, { useState } from "react";
import { useNavigate  } from 'react-router-dom';

import { Navigation } from '../components/Navigation';
import { Footer } from "../components/Footer";

import BlogsList from '../components/blog/BlogsList';
import BlogDetail from "../components/blog/BlogDetails";

const Blogs = () => {
    const [ blog, setBlog ] = new useState(null);
    const navigate = useNavigate();

    const handleBlogSelection = (blog) => {
        setBlog(blog);
        window.scrollTo({ top: 0, behavior: "smooth" });

        navigate(`?blogId=${blog.id}`);
    };

    const handleClosing = () => {
        setBlog(null);
        navigate('', true);
    }

    return (
        <div>
            <Navigation />

            {
                !blog ?
                <BlogsList onSelectBlog={handleBlogSelection} /> :
                <BlogDetail blog={blog} onClose={handleClosing}/>
            }

            <Footer />
        
        </div>
    );
};

export default Blogs;