import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReviewsThunk } from '../../store/reviewStore'



const SingleSpotReviews = ({ spotId }) => {
    const spotReview = useSelector(state => Object.values(state.review.allReviews))
    const dispatch = useDispatch()

    console.log('FFFFFFFFFFFFFFFFFFFFFFFFF', spotReview)
    useEffect(() => {
        dispatch(getReviewsThunk(spotReview))
    }, [dispatch, spotId])
    useEffect(() => {
    }, [spotReview])


    if (!spotReview) return null;

    return (
        <div>
            {spotReview.map(spot => (
                <div className='reviewstardiv' key={spot.id}>
                    <div style={{ fontSize: '25px' }}>★{spot.stars}</div>
                    <div style={{ fontSize: '25px' }}>{spot.review} Left by {spot.User.firstName}</div>
                </div>

            ))}
        </div>
    )

}

export default SingleSpotReviews;
