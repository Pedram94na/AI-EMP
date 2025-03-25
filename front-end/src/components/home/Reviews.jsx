import React, { useState, useEffect } from "react";

import '../../styles/home/Roll.css';
import { sendFetchReviews } from '../../services/review';

const Reviews = () => {
    const [ reviews, setReviews ] = new useState();
    const [ loading, setLoading ] = new useState(true);

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

    return (
        <section id="reviews" className="section reviews">
            <h1>What are our users saying about AI EMP?</h1>
            
            <div className="content">
                <div className="roll">
                    <ul>
                        {reviews.length === 0 ? (
                            <></>
                        ) : (
                            reviews.map(r => (
                                    <li key={r.id}>
                                        <p className="name">{ r.name }</p>

                                        <div className="rating">
                                            {Array.from({ length: r.rating }).map((_, index) => (
                                                <span key={index}>⭐</span>
                                            ))}
                                        </div>

                                        <p className="review">{ r.content }</p>
                                    </li>
                                )
                            )
                        )}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Reviews;