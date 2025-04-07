import axios from 'axios'

const contactFormApi = process.env.REACT_APP_CONTACT_FORM_API;

export const sendContactForm = async (data) => {
    try
    {
        data.forEach((k, v) => console.log(k + ' ' + v));
        const response = await axios.post(contactFormApi, data, {
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