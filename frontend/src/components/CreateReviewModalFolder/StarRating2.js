import React, { useState } from "react";
import Rate from './Rate'

const Rating = ({ setStars }) => {
    const [rating, setRating] = useState(false);

    return (
        <>
            <div className="row">
                <div className="col text-center">
                    <Rate rating={rating} setStars={setStars} />
                </div>
            </div>
        </>
    )
}

export default Rating;
