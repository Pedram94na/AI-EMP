import React, { useState, useEffect } from "react";

import './roll.css';
import { sendFetchReviews } from '../../services/review';

const Reviews = () => {
    const [reviews, setReviews] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            const result = await sendFetchReviews();
            
            if (!result.response.data)
                return;
            
            if (result.success)
                setReviews(result.response.data);

            setLoading(false);
        }

        fetchReviews();
    }, []);

    if (loading) {
        return <p>Loading reviews...</p>;
    }

    const limitedReviews = reviews.slice(0, 9);

    return (
        <section id="reviews" className="d-flex flex-column align-items-center py-5">
            <h1 style={{ fontFamily: "Georgia, serif" }} className="text-center mb-4">What are our users saying about AI EMP?</h1>
            
            <div className="container">
                <div className="row">
                    {limitedReviews.length === 0 ? (
                        <></>
                    ) : (
                        limitedReviews.map((r, index) => (
                            <div className="col-md-4 mb-4" key={r.id}>
                                <div className="p-4 bg-light rounded shadow-sm animate__animated animate__fadeIn">
                                    <p className="name fw-bold">{r.name}</p>

                                    <div className="rating">
                                        {Array.from({ length: r.rating }).map((_, index) => (
                                            <span key={index}>⭐</span>
                                        ))}
                                    </div>

                                    <p className="review">{r.content}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default Reviews;
