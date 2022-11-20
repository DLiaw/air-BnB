import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReviewsThunk } from '../../store/reviewStore'
import CreateReviewModal from '.';
import aircover from '../images/aircover.png'
import { deleteReviewThunk } from '../../store/reviewStore';
const SingleSpotReviews = ({ spotId }) => {
    const spotReview = useSelector(state => Object.values(state.review.allReviews))
    const oneSpot = useSelector(state => state.spot.singleSpot)
    const spot = useSelector(state => state.spot.singleSpot)
    const sessionUser = useSelector(state => state.session.user);
    const deleteReviewSession = useSelector(state => state.review.allReviews)
    const reviewNormalize = Object.values(deleteReviewSession)
    const reviewUser = reviewNormalize.find(e => e.userId == sessionUser?.id)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getReviewsThunk(spotId))
    }, [dispatch, spotId])
    useEffect(() => {
    }, [spotReview])

    const handleSubmit = async (e) => {
        e.preventDefault()

        await dispatch(deleteReviewThunk(reviewUser.id))
        // history.push(`/spots/${spotId}`)
    }
    if (!Object.values(spotReview).length) return null;

    return (
        <div className='spotdetailsbottom'>
            <div><h2><i class="fa-solid fa-house-chimney" /> Hosted by {spot.Owner.firstName}</h2></div>
            <div className='spottop'>

                <h3><i id='checkinicon' className="fa-solid fa-building-circle-check" /> Self check-in</h3>
                <p>Check yourself in with the keypad.</p>
            </div>
            <div>
                <h3><i class="fa-solid fa-user" /> {spot.Owner.firstName} is a superhost</h3>
                <p>Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</p>
            </div>
            <div className='spotbottom'>
                <h3><i class="fa-solid fa-location-pin" /> Great location</h3>
                <p>94% of recent guests gave the location a 5-star rating.</p>
            </div>
            <div className='spotaircover'>
                <img alt='aircover' src={aircover} />
                <p>Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</p>
            </div>
            <div className='reviewbuttonanddelete'>

                {spotReview.map(spot => (
                    <div className='reviewstardiv' key={spot.id}>
                        <div className='ratingandreview'
                            style={{ fontSize: '20px' }}>
                            ⭐{spot.stars} ✦ {spot.review} Left by {spot.User.firstName}
                        </div>
                    </div>
                ))},
                {(sessionUser?.id !== reviewUser?.userId) && (sessionUser?.id !== oneSpot.Owner.id) && < div className='reviewbutton' >
                    <CreateReviewModal oneSpot={oneSpot} />
                </div>},
                {(sessionUser?.id == reviewUser?.userId) && sessionUser && <div>
                    <h3 id='leaveanddeletereview' onClick={handleSubmit}>Delete Review</h3>
                </div>
                }

            </div>
        </div>
    )

}

export default SingleSpotReviews;
