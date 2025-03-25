import React from "react";

const BlogDetail = ({ blog, onClose }) => {
    if (!blog) return null;

    return (
        <section className="container py-5 bg-white p-4 rounded-3 shadow-sm mt-5">
            <div className="d-flex justify-content-end mb-3">
                <button onClick={onClose} className="btn btn-danger">X</button>
            </div>

            <div className="text-center">
                <h3 className="mb-4">{blog.title}</h3>

                <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="img-fluid rounded-3 mb-4"
                    style={{
                        width: '300px',
                        height: '300px',
                        objectFit: 'cover',
                        backgroundColor: blog.image,
                    }}
                />

                <p className="lead">{blog.content}</p>

                <button onClick={onClose} className="btn btn-danger">Close</button>
            </div>
        </section>
    );
};

export default BlogDetail;
