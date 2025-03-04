import React, { useState } from "react";

import Star from "../../assets/images/Star.svg";

import '../../styles/general/Overlay.css';
import { sendReview } from "../../services/review";

const ReviewOverlay = () => {
    const [isReviewPanelShown, showReviewPanel] = useState(true);
    const [isHovered, setHovered] = useState(0);
    const [isClicked, setClicked] = useState(0);

    const userData = JSON.parse(localStorage.getItem('user'));

    if (!userData)
        return;
    
    console.log(userData.hasReview);
    
    if (userData.hasReview)
        return

    if (!isReviewPanelShown)
        return;

    const handleReviewSubmission = async (e) => {
        e.preventDefault();
    
        const formData = new FormData(e.target);

        const formValues = {
            content: formData.get('content'),
            rating: isClicked
        };

        const result = await sendReview(formValues);

        if (result.success)
        {
            showReviewPanel(false);   
        }
    }

    return (
        <section className="overlay review">
            <div className="content">
                <h4 className="title">How do your rate AI EMP?</h4>

                <form onSubmit={handleReviewSubmission}>
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
                        <textarea placeholder="Write a review. . ." name="content"/>
                    </div>
                    
                    <button>Submit</button>
                </form>
            </div>
        </section>
    );
};

export default ReviewOverlay;