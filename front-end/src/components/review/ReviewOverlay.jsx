import React, { useState } from "react";
import { sendReview } from "../../services/review";

export const ReviewOverlay = () => {
    const [isReviewPanelShown, showReviewPanel] = useState(true);
    const [isHovered, setHovered] = useState(0);
    const [isClicked, setClicked] = useState(0);
    const [errors, setErrors] = useState({});

    const userData = JSON.parse(localStorage.getItem("user"));

    if (!userData || !isReviewPanelShown) return null;

    const handleReviewSubmission = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const content = formData.get("content").trim();

        const newErrors = {};

        if (isClicked === 0) newErrors.rating = "Please select a rating.";
        
        if (!content) newErrors.content = "Pleas write us a review.";
        else if (content.length < 4) newErrors.content = "Content must have at least 4 letters.";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        
        const formValues = {
            content,
            rating: isClicked
        };

        const result = await sendReview(formValues);
        if (result.success)

            showReviewPanel(false);
        else
            setErrors({ server: result.message || "Failed to submit review." });
    };

    return (
        <div
            className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
            style={{ backdropFilter: "blur(10px)", backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
        >
            <div className="card p-4 shadow-lg w-50 text-center">
                <h4 className="mb-4">How do you rate AI EMP?</h4>

                <form onSubmit={handleReviewSubmission} className="d-flex flex-column gap-3">
                    <div className="d-flex justify-content-center gap-2">
                        {[1, 2, 3, 4, 5].map((id) => (
                            <img
                                key={id}
                                src={`${process.env.PUBLIC_URL}/icons/Star.svg`}
                                width={30}
                                height={30}
                                onClick={() => setClicked(id)}
                                onMouseEnter={() => setHovered(id)}
                                onMouseLeave={() => setHovered(0)}
                                className="cursor-pointer"
                                style={{
                                    filter: id <= (isHovered || isClicked) 
                                        ? "hue-rotate(180deg) brightness(0.3)"
                                        : "grayscale(100%) brightness(0.8)",
                                    transition: "filter 0.2s ease-in-out"
                                }}
                            />
                        ))}
                    </div>
                    {errors.rating && <small className="text-danger">{errors.rating}</small>}

                    <textarea className="form-control" placeholder="Write a review..." name="content" rows="3"></textarea>
                    {errors.content && <small className="text-danger">{errors.content}</small>}

                    <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor: '#4D869C'}}>Submit</button>
                    <button type="button" className="btn btn-light w-100" onClick={() => showReviewPanel(false)}>Cancel</button>
                </form>
            </div>
        </div>
    );
};
