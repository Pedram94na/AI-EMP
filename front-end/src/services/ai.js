import axios from 'axios';

const aiTrainingApi = process.env.REACT_APP_AI_TRAINING_API;
const aiTestingApi = process.env.REACT_APP_AI_TESTING_API;
const aiDownloadingApi = process.env.REACT_APP_AI_DOWNLOADING_API;
const aiApi = process.env.REACT_APP_AI_API;

export const sendFileToTrain = async (data) => {
    try
    {   
        const response = await axios.post(aiTrainingApi, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        
        if (response.status === 200)
            return { success: true, response: response.data.message };
        
        return { success: false, response: response.data.message };
    }

    catch (e)
    {
        console.log(e);
        return { success: false, response: e.response.data.detail };
    }
};

export const sendMessageToTest = async (data) => {
    try
    {
        const response = await axios.post(aiTestingApi, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (response.status === 200)
            return { success: true, response: response };

        return { success: false, response: response };
    }

    catch (e)
    {
        return { success: false, message: e };
    }
};

export const sendGetAllAiModels = async () => {
    try
    {
        const response = await axios.get(aiApi, {
            headers: {
                'username': JSON.parse(localStorage.getItem("user")).username
            }
        });

        console.log(response.data);

        if (response.status === 200)
            return { success: true, response: response };

        return { success: false, response: response };
    }

    catch (e)
    {
        return { success: false, message: e.response.data };
    }
}

export const sendDownloadModel = async (training_date) => {
    try {
        const response = await axios.get(`${aiDownloadingApi}?date=${training_date}`, {
            headers: {
                "username": JSON.parse(localStorage.getItem("user")).username
            },
            responseType: "blob"
        });

        if (response.status === 200) {
            const blob = new Blob([response.data], { type: "application/zip" });

            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "model_package.zip";
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);

            return { success: true };
        }

        return { success: false, response: response };

    } catch (e) {
        return { success: false, message: e };
    }
};
