import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

import { sendCreateBlog, sendEditBlog } from "../../services/blog";
import { AdminBlogs } from "../blog/GetBlogs";
import { useBlogsData } from "../../data/BlogsData";

import Quill from 'quill';
import 'quill/dist/quill.snow.css';


export const ListAllBlogs = () => {
    const blogsData = useBlogsData();
    const [selectedBlog, setSelectedBlog] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const handleBlogSelection = (blog) => {
        setSelectedBlog(blog);
        
        navigate(`${location.pathname}?id=${blog.id}`);
    };

    return selectedBlog ? (
        <EditBlog blog={selectedBlog} onClose={() => setSelectedBlog(null)} />
    ) : (
        <section className="py-5">
            <div className="container text-center">
                <h2 className="mb-4">Blogs</h2>
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                    {blogsData.map((blog) => (
                        AdminBlogs(blog, () => handleBlogSelection(blog))
                    ))}
                </div>
            </div>
        </section>
    );
};

export const CreateBlog = () => {
    const quillRef = useRef(null);
    const quillInstance = useRef(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (quillRef.current && !quillInstance.current) {
            quillInstance.current = new Quill(quillRef.current, {
                theme: 'snow',
                modules: {
                    toolbar: [
                        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        [{ 'align': [] }],
                        ['bold', 'italic', 'underline'],
                        ['link'],
                        ['image']
                    ]
                }
            });

            const editorWrapper = quillRef.current.parentElement;
            const toolbar = editorWrapper.querySelector('.ql-toolbar');
            if (toolbar)
                toolbar.style.backgroundColor = 'white';
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);

        formData.append('Title', e.target.title.value);
        formData.append('Content', quillInstance.current.root.innerHTML);
        formData.append('ImageDir', 'placeholder.jpg');
        formData.append('imageFile', e.target.imageFile.files[0]);

        formData.forEach((value, key) => console.log(key + ' ' + value));

        const result = await sendCreateBlog(formData);

        if (result.success)
            window.location.reload();
        
        else
            alert(result.message || 'An error occurred while creating the blog.');

        setLoading(false);
    };

    return (
        <section className="py-5">
            <div className="container d-flex flex-column align-items-center">
                <h2 className="mb-4">New Blog Post</h2>

                <form onSubmit={handleSubmit} className="w-50 d-flex flex-column gap-3">
                    <input 
                        type="text" 
                        placeholder="Title" 
                        name="Title" 
                        className="form-control" 
                        required 
                    />

                    <div ref={quillRef} style={{ backgroundColor: 'white', height: '300px' }}></div>

                    <input 
                        type="file" 
                        name="imageFile" 
                        accept="image/*" 
                        className="form-control" 
                        required 
                    />

                    <button type="submit" className="btn btn-primary w-100" style={{ borderColor: '#7AB2B2', backgroundColor: '#7AB2B2' }} disabled={loading}>
                        {loading ? 'Publishing...' : 'Publish'}
                    </button>
                </form>

                <div className="w-50 d-flex flex-column mt-3">
                    <button
                        className="btn w-100"
                        onClick={() => window.location.reload()}
                        style={{ backgroundColor: 'white' }}
                    >
                        Back
                    </button>
                </div>
            </div>
        </section>
    );
};

export const EditBlog = ({ blog, onClose }) => {
    const quillRef = useRef(null);
    const quillInstance = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const blogId = queryParams.get('id');

    useEffect(() => {
        if (quillRef.current && !quillInstance.current) {
            quillInstance.current = new Quill(quillRef.current, {
                theme: 'snow',
                modules: {
                    toolbar: [
                        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        [{ 'align': [] }],
                        ['bold', 'italic', 'underline'],
                        ['link'],
                        ['image']
                    ]
                }
            });

            if (blog?.content) {
                quillInstance.current.root.innerHTML = blog.content;
            }
        }

        const editorWrapper = quillRef.current.parentElement;
        const toolbar = editorWrapper.querySelector('.ql-toolbar');
        if (toolbar)
            toolbar.style.backgroundColor = 'white';
    }, [blog]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('Title', e.target.Title.value);
        formData.append('Content', quillInstance.current.root.innerHTML);

        const result = await sendEditBlog(formData, blogId);
        console.log(result);
    
        if (result.success) {
            alert("Blog updated successfully!");
            
            navigate(location.pathname);
            onClose();
        } else {
            alert(result.message || "Failed to update blog");
        }
    };    

    const handleClosing = () => {
        navigate(location.pathname);
        onClose();
    };

    return (
        <section className="py-5">
            <div className="container d-flex flex-column align-items-center">
                <h2 className="mb-4">Edit Blog Post</h2>

                <form onSubmit={handleSubmit} className="w-50 d-flex flex-column gap-3">
                    <input
                        type="text"
                        defaultValue={blog.title}
                        name="Title"
                        className="form-control"
                        required
                    />

                    <div ref={quillRef} style={{ backgroundColor: 'white', height: '300px' }}></div>

                    <button type="submit" className="btn btn-success w-100" style={{ borderColor: '#7AB2B2', backgroundColor: '#7AB2B2' }}>
                        Save Changes
                    </button>
                </form>

                <button className="btn btn-secondary w-50 mt-3" onClick={handleClosing} style={{ color: 'black', backgroundColor: 'white' }}>
                    Cancel
                </button>
            </div>
        </section>
    );
};
