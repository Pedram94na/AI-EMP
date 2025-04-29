import axios from 'axios';

const registrationApi = process.env.REACT_APP_USER_REGISTER_API;
const loginApi = process.env.REACT_APP_USER_LOGIN_API;

export const sendRegistration = async (formValues) => {
    try
    {
        const response = await axios.post(registrationApi, formValues, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200)
        {
            handleLoginSession(response.data);
            return { response: response, success: true }
        }

        console.error("Unexpected response status:", response.status);
        return { response: response.data[0].description, success: false }
    }

    catch (e)
    {
        console.log(e);
        return { response: e.response.data[0].description, success: false };
    }
};

export const sendLogin = async (formValues) => {
    try
    {
        const response = await axios.post(loginApi, formValues, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200)
        {
            handleLoginSession(response.data);
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

function handleLoginSession(userData)
{
    const { token, ...otherData } = userData;
    
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(otherData));
}