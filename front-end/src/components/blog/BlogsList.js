import React from "react";

import '../../styles/blog/BlogsList.css';

import blogsData from '../../data/blogsData';

const BlogsList = ({onSelectBlog}) => {
    return (
        <section className="blogs-list">
            <h1>Blog Post</h1>

            <div className="content">
                <ul>
                    {
                        blogsData.map((b) => (
                            <li key={b.id} onClick={(e) => onSelectBlog(b) }>
                                <img src="" width={300} height={300} style={{ backgroundColor: b.image }} alt="" className="image" />

                                <div>
                                    <h3>{b.title}</h3>
                                    <p>{b.text}</p>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </section>
    );
};

export default BlogsList;