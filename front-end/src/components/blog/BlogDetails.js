import React from "react";

import '../../styles/blog/BlogDetails.css';

const BlogDetail = ({blog, onClose}) => {
    if (!blog)
        return null;
    console.log(blog);
    
    return (
        <section className="blog-details">
            <div className="sub-header">
                <button onClick={onClose}>X</button>
            </div>

            <h3>{blog.title}</h3>

            <img src="" style={{ backgroundColor: blog.image }} alt="" className="image" />

            <p>{blog.text}</p>
        </section>
    );
};

export default BlogDetail;