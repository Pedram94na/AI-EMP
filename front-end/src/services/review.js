import axios from 'axios';

const submitReviewApi = process.env.REACT_APP_SUBMIT_REVIEW_API;
const fetchReviewsApi = process.env.REACT_APP_FETCH_REVIEWS_API;

export const sendReview = async (formValues) => {
    try
    {
        const token = localStorage.getItem('token');

        if (!token)
        {
            console.error("No token found, user is unauthorized");
            return { success: false, message: "Unauthorized" };
        }

        const response = await axios.post(submitReviewApi, formValues, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 201)
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

export const sendFetchReviews = async () => {
    try
    {
        const response = await axios.get(fetchReviewsApi);
        
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