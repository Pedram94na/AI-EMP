import React, { useState } from "react";

import '../styles/Overlay.css';

export const Chatbot = () => {
    const [isChatbotShown, showChatbot] = useState(false);
    
    if (!isChatbotShown)
    {
        return (
            <section className="overlay chatbot button">
                <div className="content">
                    <button onClick={() => showChatbot(true)}></button>
                </div>
            </section>
        );
    }

    else 
    {
        return (
            <section className="overlay chatbot">
                <div className="content">
                    <div className="sub-header">
                        <button onClick={() => showChatbot(false)}>X</button>
                    </div>

                    <h3 className="title">AI EMP BOT</h3>

                    <div>
                        MESSAGE LOGS CONTAINER
                    </div>

                    <div className="chat-input-area">
                        <input type="text" placeholder="Message AI EMP" />

                        <button>Send</button>
                    </div>
                </div>
            </section>
        );
    }
};