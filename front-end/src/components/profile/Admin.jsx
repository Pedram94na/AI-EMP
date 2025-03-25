import { sendCreateBlog, sendEditBlog } from "../../services/blog";
import { AdminBlogs } from "../blog/GetBlogs";
import { useBlogsData } from "../../data/BlogsData";

export const ListAllBlogs = () => {
    const blogsData = useBlogsData();

    const handleBlogSelection = () => {};

    return (
        <section className="py-5">
            <div className="container text-center">
                <h2 className="mb-4">Blogs</h2>

                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                    {blogsData.map((blog) => (
                        AdminBlogs(blog, handleBlogSelection)
                    ))}
                </div>
            </div>
        </section>
    );
};

export const CreateBlog = () => {
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        formData.forEach((value, key) => console.log(key, value));

        const result = await sendCreateBlog(formData);

        if (result.success)
            window.location.reload();
    };

    return (
        <section className="py-5">
            <div className="container d-flex flex-column align-items-center">
                <h2 className="mb-4">New Blog Post</h2>

                <form onSubmit={handleSubmit} className="w-50 d-flex flex-column gap-3">
                    <input type="text" placeholder="Title" name="title" className="form-control" />
                    <textarea placeholder="Content" name="content" className="form-control" rows="5"></textarea>
                    <input type="file" name="imageFile" accept="image/*" className="form-control" />

                    <button type="submit" className="btn btn-primary w-100">Publish</button>
                </form>

                <div className="w-50 d-flex flex-column mt-3">
                    <button
                        className="btn w-100"
                        onClick={() => window.location.reload()}
                        style={{backgroundColor: "white"}}>
                            Back
                    </button>
                </div>
            </div>
        </section>
    );
};


export const EditBlog = () => {
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        formData.forEach((value, key) => console.log(key, value))

        const result = await sendEditBlog(formData);

        console.log(result);
        
    };

    return (
        <section className="dashboard">
            <h2>New Blog Post</h2>
                    
            <div className="content">
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Title" name="title"/>
                    <textarea placeholder="Content" name="content"/>
                    <input type="file" name="imageFile" accept="image/*" />

                    <button>Publish</button>
                </form>
            </div>
        </section>
    );
};
