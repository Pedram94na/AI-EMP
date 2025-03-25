import React from "react";
import { useNavigate } from "react-router-dom";

import { useBlogsData } from '../../data/BlogsData';
import '../../styles/home/Roll.css';
import { HomePageBlogs } from "../blog/GetBlogs";

export const Blogs = () => {
    const navigate = new useNavigate();
    const blogsData = useBlogsData();

    const handleBlogSelection = (blog) => {
        navigate(`/blog?blogId=${blog.id}`);
    }
    
    return (
        <section id="blogs">
            <h1>Blogs</h1>

            <div className="content">
                <div className="roll">
                    <ul>
                        { blogsData.map((b) => HomePageBlogs(b, handleBlogSelection))}
                    </ul>
                </div>

                <a onClick={() => navigate('/blog')}>See All</a>
            </div>
        </section>
    );
};

export default Blogs;