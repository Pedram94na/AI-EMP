import React from "react";
import '../styles/Overlay.css';

const Chatbot = () => {
    return (
        <section className="overlay free">
            <div className="content">
                <h3>AI EMP BOT</h3>

                <div>
                    MESSAGE LOGS CONTAINER
                </div>

                <form>
                    <input type="text" placeholder="Type your message..." />

                    <button>Send</button>
                </form>
            </div>
        </section>
    );
};

export default Chatbot;