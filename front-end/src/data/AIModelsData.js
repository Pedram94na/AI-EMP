import { useEffect, useState } from 'react';
import { sendGetAllAiModels } from '../services/ai';

export const useAiModelsData = () => {
    const [aiData, setAiData] = useState([]);

    useEffect(() => {
        const fetchModels = async () => {
            const result = await sendGetAllAiModels();
            
            if (result.success)
            {
                const modelsWithId = result.response.data.directories.map((dir, ind) => ({
                    id: ind,
                    training_date: dir,
                }));
                console.log(modelsWithId);
                
                setAiData(modelsWithId);
            }
        };

        fetchModels();
    }, []);

    return aiData;
};

export const fetchBlogById = (blogsData, id) => {
    return blogsData.find(blog => blog.id === id);
};