import axios from 'axios';

const blogApi = process.env.REACT_APP_BLOG_API;

export const sendCreateBlog = async (data) => {
    try
    {
        const response = await axios.post(blogApi, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.status === 200)
            return { success: true, response: response };

        return { success: false, response: response };
    }

    catch (e)
    {
        console.log(e);
        return { success: false, message: "ERROR SENDING MESSAGE!" };
    }
};

export const sendEditBlog = async (data, blogId) => {
    try {

        const response = await axios.put(`${blogApi}/${parseInt(blogId, 10)}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (response.status === 200)
            return { success: true, response: response.data };

        return { success: false, response: response.data };

    }
    
    catch (e)
    {
        return { success: false, message: e.response?.data?.message || "ERROR SENDING MESSAGE!" };
    }
};

export const sendGetAllBlogs = async () => {
    try {
        const response = await axios.get(blogApi, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200)
            return { success: true, response: response };

        return { success: false, response: response.data };
    } catch (e) {
        console.log(e);
        return { success: false, message: e.message };
    }
};