import React from "react";

import '../../styles/profile/CategoryButtons.css';

export const Actions = ({selectedSection, isAdmin}) => {
    return (
        <section className="section">
            <div className="content">
                <ul id="categories">
                    {
                        !isAdmin && (
                            <>
                                {/* <li>
                                    <button onClick={() => selectedSection(inbox)}>Inbox</button>
                                </li> */}

                                <li>
                                    <button onClick={() => selectedSection(trainModel)}>Train Model</button>
                                </li>

                                <li>
                                    <button onClick={() => selectedSection(testModel)}>Test Model</button>
                                </li>

                                <li>
                                    <button onClick={() => selectedSection(models)}>Models</button>
                                </li>
                            </>
                        )
                    };

                    {
                        isAdmin && (
                            <>
                                <li>
                                    <button onClick={() => selectedSection(createBlog)}>New Blog</button>
                                </li>

                                <li>
                                    <button onClick={() => selectedSection(editBlog)}>Edit Blog</button>
                                </li>

                                {/* <li>
                                    <button onClick={() => selectedSection(tickets)}>Tickets</button>
                                </li> */}
                            </>
                        )
                    };
                    
                </ul>
            </div>
        </section>
    );
};

export const inbox = "Inbox";
export const models = "Models";
export const trainModel = "TrainModel";
export const testModel = "TestModel";
export const createBlog = "CreateBlog";
export const editBlog = "EditBlog";
export const tickets = "Tickets";