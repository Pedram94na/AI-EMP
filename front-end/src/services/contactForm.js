import axios from 'axios'

const contactApi = process.env.REACT_APP_CONTACT_API;

export const sendContactForm = async (data) => {
    try
    {
        console.log(data);
        
        const response = await axios.post(contactApi, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 201)
            return { success: true, response: "Your message has been sent successfully!" };
    }

    catch (e)
    {
        console.log(e);
        return { success: false, message: "ERROR SENDING MESSAGE!" };
    }
};