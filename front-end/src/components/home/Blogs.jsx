import React from "react";
import { useNavigate } from "react-router-dom";
import { useBlogsData } from '../../data/BlogsData';
import { HomePageBlogs } from "../blog/GetBlogs";

export const Blogs = () => {
    const navigate = new useNavigate();
    const blogsData = useBlogsData();

    if (blogsData.length == 0) return;
    
    const handleBlogSelection = (blog) => {
        navigate(`/blog?blogId=${blog.id}`);
    }
    
    return (
        <section id="blogs" className="py-5">
            <div className="container text-center">
                <h1 style={{ fontFamily: "Georgia, serif" }} className="mb-4">Blogs</h1>

                <div className="d-flex justify-content-center flex-wrap">
                    <div className="roll w-100">
                        <ul className="list-unstyled">
                            { blogsData.map((b) => (
                                <li key={b.id} className="mb-4">
                                    {HomePageBlogs(b, handleBlogSelection)}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <a style={{ fontFamily: "Georgia, serif" }} onClick={() => navigate('/blog')} className="btn btn-link mt-4 text-white fs-4">
                    See All
                </a>
            </div>
        </section>
    );
};

export default Blogs;
