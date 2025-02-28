import React, { useState } from "react";
import Submit from "../assets/images/Submit.svg";

import '../styles/general/Overlay.css';

const ChatbotOverlay = () => {
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

                    <h4 className="title">AI EMP BOT</h4>

                    <div className="message-log">
                        <div key="1" className="message">
                            <span className="label user">You: Hi</span>
                        </div>

                        < div key="2" className="message">
                            <span className="label bot">Bot: Hello there</span>
                        </div>

                        <div key="3" className="message">
                            <span className="label user">You: I need help!</span>
                        </div>
                        
                        < div key="4" className="message">
                            <span className="label bot">Bot: What is troubling you?</span>
                        </div>
                    </div>

                    <div className="chat-input-area">
                        <input type="text" placeholder="Message AI EMP" />

                        <button>
                            <img src={Submit} width={10} height={10} />
                        </button>
                    </div>
                </div>
            </section>
        );
    }
};

export default ChatbotOverlay;