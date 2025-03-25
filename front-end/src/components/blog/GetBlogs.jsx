import './blog.css';

export const BlogPageBlogs = (blog, onSelectBlog) => {
    return (
        <li 
            key={blog.id} 
            onClick={(e) => onSelectBlog(blog)} 
            className="list-group-item d-flex align-items-center p-3 mb-3 border rounded-3 shadow-sm bg-white hover-anim"
            style={{cursor: "pointer"}}
        >
            <img 
                src={blog.imageUrl} 
                width={300} 
                height={300} 
                alt="" 
                className="img-fluid rounded"
                style={{ 
                    width: '200px', 
                    height: '200px', 
                    objectFit: 'cover'
                }}
            />

            <div className="ms-3">
                <h3 className="h5">{blog.title}</h3>
                <p className="text-muted">{blog.content}</p>
            </div>
        </li>
    );
};

export const HomePageBlogs = (blog, onSelectBlog) => {
    return (
        <li className="bg-white p-3 rounded-3 shadow-sm mb-3">
            <a 
                key={blog.id} 
                onClick={(e) => onSelectBlog(blog)} 
                className="hover-anim text-decoration-none text-black"
                style={{ cursor: "pointer" }}
            >
                <img 
                    src={blog.imageUrl} 
                    alt={blog.title} 
                    className="img-fluid rounded mb-2"
                    style={{ 
                        width: '300px', 
                        height: '300px', 
                        objectFit: 'cover'
                    }}
                />
                <h3 className="h5">{blog.title}</h3>
            </a>
        </li>
    );
};

export const AdminBlogs = (blog, onSelectBlog) => {
    return (
        <div key={blog.id} className="col" onClick={() => onSelectBlog(blog)} style={{ cursor: "pointer" }}>
            <div className="card h-100 d-flex flex-column align-items-center text-center p-3" onClick={() => onSelectBlog(blog)}>
                <img
                    src={blog.imageUrl}
                    className="card-img-top mx-auto"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                    alt={blog.title}
                />
                
                <div className="card-body d-flex flex-column align-items-center">
                    <h5 className="card-title">{blog.title}</h5>
                </div>
            </div>
        </div>
    );
};
