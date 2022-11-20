import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReviewsThunk } from '../../store/reviewStore'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const SingleSpotReviews = ({ spotId }) => {
    const spotReview = useSelector(state => Object.values(state.review.allReviews))
    const spot = useSelector(state => state.spot.singleSpot)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getReviewsThunk(spotId))
    }, [dispatch, spotId])
    useEffect(() => {
    }, [spotReview])


    if (!Object.values(spotReview).length) return null;

    return (
        <div className='spotdetailsbottom'>
            <div> hosted by {spot.Owner.firstName}</div>
            <div className='spottop'>

                <h3><i id='checkinicon' className="fa-solid fa-building-circle-check" /> Self check-in</h3>
                <p>check yourself in with the keypad.</p>
            </div>
            <div>
                <h3><i class="fa-solid fa-user" /> {spot.Owner.firstName} is a superhost</h3>
                <p>Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</p>
            </div>
            <div className='spotbottom'>
                <h3><i class="fa-solid fa-location-pin" /> Great location</h3>
                <p>94% of recent guests gave the location a 5-star rating.</p>
            </div>
            {spotReview.map(spot => (
                <div className='reviewstardiv' key={spot.id}>

                    <div className='ratingandreview'
                        style={{ fontSize: '20px' }}>
                        ⭐{spot.stars} ✦ {spot.review} Left by {spot.User.firstName}
                    </div>
                </div>

            ))},

        </div>
    )

}

export default SingleSpotReviews;
