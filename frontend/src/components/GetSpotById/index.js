import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotByIdThunk } from '../../store/spotsStore'
import SingleSpot from './SingleSpot';
import './SingleSpot.css'
import { NavLink, useParams } from 'react-router-dom';
import CreateReviewModal from '../CreateReviewModalFolder';
import SingleSpotReviews from '../CreateReviewModalFolder/Review';
import { useHistory } from 'react-router-dom';
import { deleteReviewThunk } from '../../store/reviewStore';

const SpotDetail = () => {
    const history = useHistory()
    const sessionUser = useSelector(state => state.session.user);
    const oneSpot = useSelector(state => state.spot.singleSpot)
    const oneReview = useSelector(state => state.review.createReview)
    const deleteReviewSession = useSelector(state => state.review.allReviews)
    const [isloaded, setLoaded] = useState(false)
    const { spotId } = useParams()
    const dispatch = useDispatch()
    const reviewNormalize = Object.values(deleteReviewSession)
    const reviewUser = reviewNormalize.find(e => e.userId == sessionUser?.id)
    // console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&', reviewUser.id)


    useEffect(() => {
        dispatch(getSpotByIdThunk(spotId))
            .then(() => { setLoaded(true) })
    }, [dispatch], spotId)

    const handleSubmit = async (e) => {
        e.preventDefault()

        await dispatch(deleteReviewThunk(reviewUser.id))
        // history.push(`/spots/${spotId}`)
    }

    if (!Object.values(oneSpot).length) return null;

    // const user = sessionUser.id
    return (
        <div id='onespotmaindiv'>
            <div id='onespotdiv'>
                <div >
                    <SingleSpot oneSpot={oneSpot} />
                </div>
            </div>
            {sessionUser?.id == oneSpot.ownerId && sessionUser && <div>
                <NavLink to={`/spots/${oneSpot.id}/edit`}>
                    <button>Edit</button>
                </NavLink>
            </div>}
            <div id="reviewcreatediv">
                <div>
                    <SingleSpotReviews spotId={spotId} />
                </div>

                {(sessionUser?.id !== reviewUser?.userId) && (sessionUser?.id !== oneSpot.Owner.id) && < div >
                    <CreateReviewModal oneSpot={oneSpot} />
                </div>}

                {sessionUser?.id == reviewUser?.userId && <div>
                    <button onClick={handleSubmit}>Delete Review</button>
                </div>
                }
            </div>
        </div >
    )

}

export default SpotDetail;
