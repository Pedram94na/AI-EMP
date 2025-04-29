import axios from "axios";

const subscriptionApi = process.env.REACT_APP_SUBSCRIPTION_API;

export const sendNewSubscription = async (id) => {
    try
    {
        const token = localStorage.getItem('token');

        if (!token)
            return { success: false, message: "Unauthorized" };

        const response = await axios.post(`${subscriptionApi}/${id}`, null, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        
        if (response.status === 200)
        {
            const user = JSON.parse(localStorage.getItem('user'));

            user.hasSubscribed = true;
            localStorage.setItem('user', JSON.stringify(user));
            console.log("After subs: " + localStorage.getItem('user'));
            
            return { response: response, success: true }
        }

        console.error("Unexpected response status:", response.status);
        return { response: response, success: false }
    }

    catch (e)
    {
        console.log(e);
        return false;
    }
}