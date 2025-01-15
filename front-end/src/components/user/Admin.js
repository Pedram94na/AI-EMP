import React from "react";

const CreateBlog = () => {
    return (
        <section className="section">
            <h2 className="title">New Blog Post</h2>
                    
            <div className="content">
                <form>
                    <input type="text" placeholder="Author" value={"Pedram"}/>
                    <input type="text" placeholder="Title"/>
                    <textarea placeholder="Content"/>
                    <input type="file" />
                    <input type="url" />

                    <button>Publish</button>
                </form>
            </div>
        </section>
    );
};

const EditBlog = () => {
    return (
        <section className="section">
            <h2 className="title">Edit Blog Post</h2>
                    
            <div className="content">
                <div className="blogs">
                    <ul>
                        <li>
                            <div className="blog">
                                <img src="" width={300} height={300} style={{ backgroundColor: "red" }} alt="" className="image" />

                                <h3>What is software engineering?</h3>
                                <p className="short-description">Finding solutions with architectural patterns</p>
                            </div>
                        </li>

                        <li>
                            <div className="user-review">
                                <img src="" width={300} height={300} style={{ backgroundColor: "blue" }} alt="" className="image" />

                                <h3>How to use AI in business?</h3>
                                <p className="short-description">Make AI work for you!</p>
                            </div>
                        </li>

                        <li>
                            <div className="blog">
                                <img src="" width={300} height={300} style={{ backgroundColor: "black" }} alt="" className="image" />

                                <h3>What is software engineering?</h3>
                                <p className="short-description">Finding solutions with architectural patterns</p>
                            </div>
                        </li>

                        <li>
                            <div className="user-review">
                                <img src="" width={300} height={300} style={{ backgroundColor: "yellow" }} alt="" className="image" />

                                <h3>How to use AI in business?</h3>
                                <p className="short-description">Make AI work for you!</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

const Tickets = () => {
    return (
        <section className="section">
            <h2 className="title">Customer Tickets</h2>
                    
            <div className="content">
                <table>
                    <thead>
                        <th>Ticket ID</th>
                        <th>Username</th>
                        <th>Date</th>
                        <th>Issue</th>
                    </thead>

                    <tbody>
                        <tr>
                            <td>23213dawd2e2d2w</td>
                            <td>Alexxya122</td>
                            <td>01.14.2025</td>
                            <td>I can't download the model I trained!</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export { CreateBlog, EditBlog, Tickets };