import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

import '../../styles/blog/BlogsList.css';

import { useBlogsData, fetchBlogById } from '../../data/BlogsData';
import { BlogPageBlogs } from "./GetBlogs";

const BlogsList = ({ onSelectBlog }) => {
    const blogsData = useBlogsData();
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const blogId = parseInt(searchParams.get('blogId'));

        if (blogId) {
            const blog = fetchBlogById(blogsData, blogId);
            
            if (blog)
                onSelectBlog(blog);
        }
    }, [location.search, blogsData]);

    return (
        <section className="blogs-list">
            <h1>Blog Post</h1>

            <div className="content">
                <ul>
                    {
                        blogsData.map((b) => BlogPageBlogs(b, onSelectBlog))
                    }
                </ul>
            </div>
        </section>
    );
};

export default BlogsList;