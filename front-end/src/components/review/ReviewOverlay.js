import React, { useState } from "react";
import Star from "../../assets/images/Star.svg";

import '../../styles/general/Overlay.css';

const ReviewOverlay = () => {
    const [isReviewRequestShown, showReviewRequest] = useState(true);
    const [isHovered, setHovered] = useState(0);
    const [isClicked, setClicked] = useState(0);

    if (!isReviewRequestShown)
    {
        // Check if user has submitted a review

        return;
    }

    function submitRating()
    {
        console.log("Send review to back-end!");

        showReviewRequest(false);
    }

    return (
        <section className="overlay review">
            <div className="content">
                <h4 className="title">How do your rate AI EMP?</h4>

                <form>
                    <div className="rating">
                        {[1, 2, 3, 4, 5].map((id) => (
                            <img key={id} src={Star} id={id} width={30} height={30}
                                onClick={() => setClicked(id)}
                                onMouseEnter={() => setHovered(id)}
                                onMouseLeave={() => setHovered(0)}
                                className={`${id <= (isHovered || isClicked) ? "clicked" : ""}`}
                            />
                        ))}
                    </div>

                    <div className="review-input-area">
                        <textarea placeholder="Write a review. . ." />
                    </div>
                    
                    <button onClick={() => submitRating()}>Submit</button>
                </form>
            </div>
        </section>
    );
};

export default ReviewOverlay;