import axios from 'axios';

const getAllChatbotQAndAsApi = process.env.REACT_APP_GET_ALL_CHATBOT_Q_AND_AS_API;

export const sendGetAllQAndAs = async () => {
    try
    {
        const response = await axios.get(getAllChatbotQAndAsApi);

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