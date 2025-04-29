import axios from 'axios';

const reviewApi = process.env.REACT_APP_REVIEW_API;

export const sendReview = async (formValues) => {
    try
    {
        const token = localStorage.getItem('token');

        if (!token)
        {
            console.error("No token found, user is unauthorized");
            return { success: false, message: "Unauthorized" };
        }

        const response = await axios.post(reviewApi, formValues, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 201)
        {
            const user = JSON.parse(localStorage.getItem('user'));

            user.hasReview = true;
            localStorage.setItem('user', JSON.stringify(user));

            return { response: response, success: true }
        }

        console.error("Unexpected response status:", response.status);
        return { response: response, success: false }
    }

    catch (e)
    {
        console.log(e);
        return { response: e.response.data, success: false }
    }
};

export const sendFetchReviews = async () => {
    try
    {
        const response = await axios.get(reviewApi);
        
        if (response.status === 200)
            return { response: response, success: true }

        console.error("Unexpected response status:", response.status);
        return { response: response, success: false }
    }

    catch (e)
    {
        console.log(e);
        return false;
    }
};