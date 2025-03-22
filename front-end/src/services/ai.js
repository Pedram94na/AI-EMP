import axios from 'axios';

const aiTrainingApi = process.env.REACT_APP_AI_TRAINING_API;

export const sendFileToTrain = async (data) => {
    try
    {
        const response = await axios.post(aiTrainingApi, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
                // 'Content-Type': 'application/json'
            }
        });

        console.log("DONE");
        console.log(response);
        
        

        if (response.status === 200)
            return { success: true, response: response };

        return { success: false, response: response };
    }

    catch (e)
    {
        return { success: false, message: e };
    }
};