import React, { useMemo } from "react";
import PropTypes from 'prop-types';
import { useState } from "react";
import { FaStar } from 'react-icons/fa'

const Rate = ({ count, rating, color, onRating, setStars }) => {
    const [hoverRating, setHoverRating] = useState(0)
    const getColor = index => {
        if (hoverRating >= index) {
            return color.filled
        } else if (!hoverRating && rating >= index) {
            return color.filled
        }
    }

    const starRatings = useMemo(() => {
        return Array(count)
            .fill(0)
            .map((_, i) => i + 1)
            .map((idx) => (
                <FaStar
                    key={idx}
                    classname="cursor-pointer"
                    icon="star"
                    onClick={() => setStars(Number(idx))}
                    onMouseEnter={() => setHoverRating(idx)}
                    onMouseLeave={() => setHoverRating(0)}
                    style={{ color: getColor(idx) }}
                />
            ));
    }, [count, rating, hoverRating])

    return (
        <div>
            {starRatings}
        </div>
    )

}

Rate.propTypes = {
    count: PropTypes.number,
    rating: PropTypes.number,
    onChange: PropTypes.func,
    color: {
        filled: PropTypes.string,
        unfilled: PropTypes.string
    }
}

Rate.defaultProps = {
    count: 5,
    rating: 0,
    color: {
        filled: '#f5eb3b',
        unfilled: 'rgb(245,245,245)'
    }
}

export default Rate;
