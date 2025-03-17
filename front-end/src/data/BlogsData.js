import { useEffect, useState } from 'react';
import { sendGetAllBlogs } from '../services/blog';

export const useBlogsData = () => {
    const [blogsData, setBlogsData] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            const result = await sendGetAllBlogs();
            console.log(result.response.data);
            
            if (result.success)
                setBlogsData(result.response.data);
            
            else
                console.error(`Failed to fetch blogs: ${result.message}`);
        };

        fetchBlogs();
    }, []);

    return blogsData;
};

export const fetchBlogById = (blogsData, id) => {
    return blogsData.find(blog => blog.id === id);
};