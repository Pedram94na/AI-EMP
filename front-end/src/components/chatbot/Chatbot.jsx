import React, { useState, useEffect } from "react";
import { sendGetAllQAndAs } from "../../services/chatbot";

const ChatbotOverlay = () => {
    const [isChatbotShown, showChatbot] = useState(false);
    const [chatbotData, setChatbotData] = useState([]);
    const [questionsVisible, setQuestionsVisible] = useState(true);
    const [messages, setMessages] = useState([
        { id: 0, text: "Welcome friend 🤗 How can I help you today?", type: "bot" }
    ]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await sendGetAllQAndAs();
            if (result.success === true) setChatbotData(result.response.data);
            else console.log(`Chatbot request error: ${result.response}`);
        };
        fetchData();
    }, []);

    const handleQuestionClick = (c) => {
        const userMessage = { id: messages.length + 1, text: c.question, type: "user" };
        const botResponse = { id: messages.length + 2, text: c.answer, type: "bot" };

        setMessages((prevMessages) => [...prevMessages, userMessage]);

        setTimeout(() => {
            setMessages((prevMessages) => [...prevMessages, botResponse]);

            setTimeout(() => {
                setQuestionsVisible(true);
            }, 3000);
        }, 1000);
    };

    if (!isChatbotShown) {
        return (
            <div className="position-fixed bottom-0 end-0 m-3">
                <button style={{backgroundColor: "#4D869C"}} className="btn rounded-circle p-3" onClick={() => showChatbot(true)}>
                    <img src={process.env.PUBLIC_URL + '/icons/support.png'} alt="Chatbot" width={30} height={30}/>
                </button>
            </div>
        );
    } else {
        return (
            <div className="position-fixed bottom-0 end-0 m-3 card shadow-lg" style={{ width: '300px' }}>
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">AI EMP BOT</h5>
                    <button className="btn btn-close" onClick={() => showChatbot(false)}></button>
                </div>
                <div className="card-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    <ul className="list-unstyled">
                        {messages.map((msg) => (
                            <li key={msg.id} className={msg.type === "user" ? "text-end text-primary" : "text-start text-secondary"}>
                                {msg.text}
                            </li>
                        ))}
                        {questionsVisible &&
                            chatbotData.map((c, ind) => (
                                <li key={c.id} 
                                    className="text-primary text-decoration-none cursor-pointer" 
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
                                        handleQuestionClick(c);
                                        setQuestionsVisible(false);
                                    }}>
                                    {ind + 1}. {c.question}
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        );
    }
};

export default ChatbotOverlay;
