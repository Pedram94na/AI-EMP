import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

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
        <section className="container py-5">
            <h1 className="text-center mb-4">Blog Posts</h1>

            <div className="row justify-content-center">
                <div className="col-12 col-md-8">
                    <ul className="list-unstyled text-center">
                        {
                            blogsData.map((b) => BlogPageBlogs(b, onSelectBlog))
                        }
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default BlogsList;
