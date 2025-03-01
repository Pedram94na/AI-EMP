import axios from 'axios'

const apiUrl = process.env.REACT_APP_CONTACT_FORM_API;

export const sendContactForm = async (formValues) => {
    try
    {
        const response = await axios.post(apiUrl, formValues, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 201)
            return { success: true, message: "Your message has been sent successfully!" };
    }

    catch (e)
    {
        console.log(e);
        return { success: false, message: "ERROR SENDING MESSAGE!" };
    }
};