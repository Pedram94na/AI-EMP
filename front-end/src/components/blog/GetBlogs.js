export const BlogPageBlogs = (blog, onSelectBlog) => {
    return (
        <li key={blog.id} onClick={(e) => onSelectBlog(blog) }>
            <img src="" width={300} height={300} style={{ backgroundColor: blog.image }} alt="" className="image" />

            <div>
                <h3>{blog.title}</h3>
                <p>{blog.content}</p>
            </div>
        </li>
    );
};

export const HomePageBlogs = (blog, onSelectBlog) => {
    console.log(blog)
    return (
        
        <li>
            <a key={blog.id} onClick={(e) => onSelectBlog(blog) }>
                <img src="" width={300} height={300} style={{ backgroundColor: blog.image }} alt="" className="image" />

                <h3>{blog.title}</h3>
            </a>
        </li>
    );
};