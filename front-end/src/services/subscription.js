import axios from "axios";

const newSubscriptionApi = process.env.REACT_APP_NEW_SUBSCRIPTION_API;
const cancelSubscriptionApi = process.env.REACT_APP_CANCEL_SUBSCRIPTION_API;

export const sendNewSubscription = async (id) => {
    try
    {
        const token = localStorage.getItem('token');

        if (!token)
        {
            console.error("No token found, user is unauthorized");
            return { success: false, message: "Unauthorized" };
        }

        const response = await axios.post(`${newSubscriptionApi}/${id}`, null, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        
        console.log(response.status);
        
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
}