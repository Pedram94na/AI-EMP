import React from "react";

const Guide = () => {
    return (
        <section>
            <h1>How does AI EMP work?</h1>

            <div className="content">
                <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search</p>

                <div id="video" style={{ maxWidth: '100%', overflow: 'hidden' }}>
                    <iframe
                        width="560"
                        height="315"
                        src="https://www.youtube.com/embed/HrHUHGRIDMQ"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            </div>
        </section>
    );
};

export default Guide;