import React, { useState, useEffect } from "react";
import "../../styles/general/Overlay.css";
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

    const handleShowQuestions = () => {
        setQuestionsVisible(true);
    };

    const handleHideQuestions = () => {
        setQuestionsVisible(false);
    };

    if (!isChatbotShown) {
        return (
            <section className="overlay chatbot button">
                <div className="content">
                    <button onClick={() => showChatbot(true)}></button>
                </div>
            </section>
        );
    } else {
        return (
            <section className="overlay chatbot">
                <div className="content">
                    <div className="sub-header">
                        <button onClick={() => showChatbot(false)}>X</button>
                    </div>

                    <h4 className="title">AI EMP BOT</h4>

                    <div className="message-log">
                        <ul>
                            {messages.map((msg) => (
                                <li
                                    key={msg.id}
                                    className={msg.type === "user" ? "user-message" : "bot-message"}
                                >
                                    {msg.text}
                                </li>
                            ))}

                            {questionsVisible &&
                                chatbotData.map((c, ind) => (
                                    <li
                                        key={c.id}
                                        onClick={() => {
                                            handleQuestionClick(c);
                                            setQuestionsVisible(false);
                                        }}
                                        className="clickable"
                                    >
                                        {ind + 1}. {c.question}
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            </section>
        );
    }
};

export default ChatbotOverlay;
