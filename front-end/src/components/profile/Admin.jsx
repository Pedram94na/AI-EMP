import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

import { sendCreateBlog, sendEditBlog } from "../../services/blog";
import { sendGetAllQAndAs, sendCreateQAndA } from "../../services/chatbot";
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
    const [errors, setErrors] = useState({});

    const allowedExtensions = ['jpg', 'png'];

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

        const title = e.target.Title.value.trim();
        const content = quillInstance.current.root.innerHTML.trim();
        const imageFile = e.target.imageFile.files[0];

        const newErrors = {};
        if (!title) newErrors.title = "Title is required.";
        else if (title.length < 6) newErrors.title = "Title needs to be longer (min 6 letter)";

        if (!content || content === '<p><br></p>') newErrors.content = "Content is required.";
        else if (content.length < 100) newErrors.content = "Content needs to be longer (min 100 letters)";

        if (!imageFile) newErrors.imageFile = "Image is required.";
        else {
            const fileExtension = imageFile.name.split('.').pop().toLowerCase();

            if (!allowedExtensions.includes(fileExtension))
                newErrors.imageFile = "Image must be .png or .jpg";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setLoading(false);

            return;
        }

        setErrors({});

        const formData = new FormData(e.target);

        formData.append('Title', title);
        formData.append('Content', content);
        formData.append('ImageDir', 'placeholder.jpg');
        formData.append('imageFile', imageFile);

        const result = await sendCreateBlog(formData);

        if (result.success)
            window.location.reload();
        
        else
            alert(result.message || 'An error occurred while creating the blog.');

        setLoading(false);
    };

    return (
        <section className="py-5">
            <div className="bg-white p-4 container d-flex flex-column align-items-center">

                <form onSubmit={handleSubmit} className="w-50 d-flex flex-column gap-3">
                    <input 
                        type="text" 
                        placeholder="Title" 
                        name="Title" 
                        className="form-control"
                    />
                    {errors.title && <small className="text-danger">{errors.title}</small>}

                    <div>
                        <div ref={quillRef} style={{ backgroundColor: 'white', height: '300px' }} />
                        {errors.content && <small className="text-danger">{errors.content}</small>}
                    </div>

                    <input 
                        type="file" 
                        name="imageFile" 
                        accept="image/jpeg, image/png"
                        className="form-control" 
                    />
                    {errors.imageFile && <small className="text-danger">{errors.imageFile}</small>}


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
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

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
        setLoading(true);

        const title = e.target.Title.value.trim();
        const content = quillInstance.current.root.innerHTML.trim();

        const newErrors = {};
        if (!title) newErrors.title = "Title is required.";
        else if (title.length < 6) newErrors.title = "Title needs to be longer (min 6 letters)";

        if (!content || content === '<p><br></p>') newErrors.content = "Content is required.";
        else if (content.length < 100) newErrors.content = "Content needs to be longer (min 100 letters";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setLoading(false);

            return;
        }

        setErrors({});

        const formData = new FormData();
        formData.append('Title', e.target.Title.value);
        formData.append('Content', quillInstance.current.root.innerHTML);

        const result = await sendEditBlog(formData, blogId);
    
        if (result.success) {
            navigate(location.pathname);
            onClose();
        }

        setLoading(false);
    };    

    const handleClosing = () => {
        navigate(location.pathname);
        onClose();
    };

    return (
        <section className="py-5">
            <div className="bg-white p-4 container d-flex flex-column align-items-center">

                <form onSubmit={handleSubmit} className="w-50 d-flex flex-column gap-3">
                    <input
                        type="text"
                        defaultValue={blog.title}
                        name="Title"
                        className="form-control"
                        required
                    /> {errors.title && <small className="text-danger">{errors.title}</small>}

                    <div ref={quillRef} style={{ backgroundColor: 'white', height: '300px' }}></div>
                    {errors.content && <small className="text-danger">{errors.content}</small>}

                    <button type="submit" className="btn btn-success w-100" style={{ borderColor: '#7AB2B2', backgroundColor: '#7AB2B2' }}>
                    {loading ? 'Editing...' : 'Edit'}
                    </button>
                </form>

                <button  className="btn btn-secondary w-50 mt-3" onClick={handleClosing} style={{ color: 'black', backgroundColor: 'white' }}>
                    Cancel
                </button>
            </div>
        </section>
    );
};

export const Chatbot = () => {
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [chatbotData, setChatbotData] = useState([]);

    const fetchData = async () => {
        const result = await sendGetAllQAndAs();
        if (result.success === true) setChatbotData(result.response.data);
    };
    
    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        const question = formData.get("question");
        const answer = formData.get("answer");

        const newErrors = {};
        if (!question) newErrors.question = "Question is required.";
        else if (question.length < 15) newErrors.question = "Question needs to be longer. (min 15 letters)";

        if (!answer) newErrors.answer = "Answer is required.";
        else if (answer.length < 30) newErrors.answer = "Answer needs to be longer. (min 30 letters";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setLoading(false);

            return;
        }

        setErrors({});

        const result = await sendCreateQAndA(formData);
    
        if (!result.success) {
            newErrors.server = result.response;
            setErrors(newErrors);
            setLoading(false);

            return;
        }

        await fetchData();
        setLoading(false);
        e.target.reset();
    };

    return (
        <section className="py-5">
            <div className="bg-white p-4 container d-flex flex-column align-items-center">
            {errors.server && <small className="text-danger text-center">{errors.server}</small>}
                <form onSubmit={handleSubmit} className="w-50 d-flex flex-column gap-3">
                    <input
                        type="text"
                        placeholder="Question"
                        name="question"
                        className="form-control"
                    />
                    {errors.question && <small className="text-danger">{errors.question}</small>}

                    <input
                        type="text"
                        placeholder="Answer"
                        name="answer"
                        className="form-control"
                    />
                    {errors.answer && <small className="text-danger">{errors.answer}</small>}

                    <button type="submit" className="btn btn-success w-100" style={{ borderColor: '#7AB2B2', backgroundColor: '#7AB2B2' }}>
                        {loading ? 'Creating...' : 'Create Q&A'}
                    </button>
                </form>

                <button  className="btn btn-secondary w-50 mt-3" onClick={() => window.location.reload()} style={{ color: 'black', backgroundColor: 'white' }}>
                    Cancel
                </button>
            </div>

            {
                chatbotData.length > 0 && (
                    <ul className="bg-white my-2 container d-flex flex-column align-items-center list-unstyled">
                        {chatbotData.map(c => (
                            <li key={c.id} 
                                className="align-self-start my-2 text-decoration-none cursor-pointer" 
                                style={{ cursor: "pointer", color: "#000" }}
                                >
                                Q. {c.question}<br/>
                                A. {c.answer}
                            </li>
                        ))}
                    </ul>
                )
            }
        </section>
    );
};
