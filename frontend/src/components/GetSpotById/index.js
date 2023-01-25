import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotByIdThunk } from '../../store/spotsStore'
import SingleSpot from './SingleSpot';
import { NavLink, useParams } from 'react-router-dom';
import SingleSpotReviews from '../CreateReviewModalFolder/Review';
import { cleanUp } from '../../store/reviewStore';
import './SingleSpot.css'

const SpotDetail = () => {
    const sessionUser = useSelector(state => state.session.user);
    const oneSpot = useSelector(state => state.spot.singleSpot)
    const oneReview = useSelector(state => state.review.createReview)
    const deleteReviewSession = useSelector(state => state.review.allReviews)
    const [isloaded, setLoaded] = useState(false)
    const { spotId } = useParams()
    const dispatch = useDispatch()
    const reviewNormalize = Object.values(deleteReviewSession)
    const reviewUser = reviewNormalize.find(e => e.userId == sessionUser?.id)


    useEffect(() => {
        dispatch(getSpotByIdThunk(spotId))
            .then(() => { setLoaded(true) })

        return () => dispatch(cleanUp())
    }, [dispatch], spotId)

    if (!Object.values(oneSpot).length) return null;

    // const user = sessionUser.id
    return (
        <div className='singlespot-wrapper'>
            <div id='onespotmaindiv'>
                <div id='onespotdiv'>
                    <div >
                        <SingleSpot oneSpot={oneSpot} />
                    </div>
                </div>
                {sessionUser?.id == oneSpot.ownerId && sessionUser && <div>
                    <NavLink to={`/spots/${oneSpot.id}/edit`}>
                        <h3 style={{ textDecoration: 'underline' }}>Edit your listing</h3>
                    </NavLink>
                </div>}
                <div id="reviewcreatediv">
                    <div>
                        <SingleSpotReviews spotId={spotId} />
                    </div>
                </div>
            </div >
        </div >
    )

}

export default SpotDetail;
