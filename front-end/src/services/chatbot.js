import axios from 'axios';

const chatbotApi = process.env.REACT_APP_CHATBOT_API;

export const sendGetAllQAndAs = async () => {
    try
    {
        const response = await axios.get(chatbotApi);

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

export const sendCreateQAndA = async (data) => {
    try
    {
        const response = await axios.post(chatbotApi, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (response.status === 200)
            return { response: response.data, success: true }

        console.error("Unexpected response status:", response.status);
        return { response: response.data, success: false }
    }

    catch (e)
    {
        console.log(e);
        return { response: e.response.data, success: false }
    }
};
