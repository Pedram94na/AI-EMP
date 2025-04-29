import React, { useEffect } from "react";
import './actions.css';

export const UserActions = ({ setActiveSection  }) => {

    useEffect(() => {
        setActiveSection (models);
    }, []);

    return (
        <section className="section d-flex justify-content-center align-items-center py-5">
            <div className="content">
                <ul id="categories" className="list-unstyled d-flex justify-content-center p-0">
                    <li className="me-3">
                        <button onClick={() => setActiveSection (trainModel)} className="btn py-2 action-btn">
                            Train Model
                        </button>
                    </li>

                    <li className="me-3">
                        <button onClick={() => setActiveSection (testModel)} className="btn py-2 action-btn">
                            Test Model
                        </button>
                    </li>

                    <li className="me-3">
                        <button onClick={() => setActiveSection (models)} className="btn py-2 action-btn">
                            Models
                        </button>
                    </li>
                </ul>
            </div>
        </section>
    );
};

export const AdminActions = ({setActiveSection}) => {
    
    useEffect(() => {
        setActiveSection(blogsList);
    }, []);

    return (
        <section className="section d-flex justify-content-center align-items-center py-5">
            <div className="content">
                <ul id="categories" className="list-unstyled d-flex justify-content-center p-0">
                    <li className="me-3">
                        <button onClick={() => setActiveSection(createBlog)} className="btn py-2 action-btn">
                            New Blog
                        </button>
                    </li>

                    <li className="me-3">
                        <button onClick={() => setActiveSection(chatbot)} className="btn py-2 action-btn">
                            Chatbot
                        </button>
                    </li>
                </ul>
            </div>
        </section>
    )
}

export const trainModel = "TrainModel";
export const testModel = "TestModel";
export const models = "Models";
export const createBlog = "CreateBlog";
export const blogsList = "BlogsList";
export const chatbot = "Chatbot"
