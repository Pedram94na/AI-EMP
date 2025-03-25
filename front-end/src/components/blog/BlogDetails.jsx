import React, { useEffect } from "react";

import '../../styles/blog/BlogDetails.css';

const BlogDetail = ({blog, onClose}) => {
    if (!blog)
        return null;
    
    return (
        <section className="blog-details">
            <div className="sub-header">
                <button onClick={onClose}>X</button>
            </div>

            <h3>{blog.title}</h3>

            <img src={blog.imageUrl} style={{ backgroundColor: blog.image }} alt="" className="image" />

            <p>{blog.content}</p>
        </section>
    );
};

export default BlogDetail;