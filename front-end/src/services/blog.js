import axios from 'axios';

const blogApi = process.env.REACT_APP_BLOG_API;

export const sendCreateBlog = async (data) => {
    try
    {
        data.forEach((value, key) => console.log(key, value))
        
        const response = await axios.post(blogApi, data, {
            headers: {
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
    try
    {
        const response = await axios.post(`${blogApi}/${blogId}`, data, {
            headers: {
                'Content-Type': 'application/json',
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