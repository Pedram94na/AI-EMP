import { useEffect, useState } from 'react';

const Blogs = () => {
    const [ blogsData, setBlogsData ] = useState([]);

    useEffect(() => {
        fetch('/blogs.json')
            .then((response) => response.json())
                .then((data) => setBlogsData(data))
                    .catch((e) => console.error(`Blogs Data: ${e}`));
    }, []);

    return blogsData;
};

export default Blogs;