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

const Tickets = () => {
    return (
        <section className="section">
            <h2 className="title">New Blog Post</h2>
                    
            <div className="content">
                <table>
                    <thead>
                        <td>Ticket ID</td>
                        <td>Username</td>
                        <td>Date</td>
                        <td>Issue</td>
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