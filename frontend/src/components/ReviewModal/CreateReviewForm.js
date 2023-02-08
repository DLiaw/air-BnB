import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createReviewThunk } from "../../store/reviewStore"
import { useHistory, useParams } from "react-router-dom";
import './CreateReview.css';
import Rating from "./StarRating2";
import Rate from "./Rate";
import { getReviewsThunk } from '../../store/reviewStore'
import { getSpotByIdThunk } from '../../store/spotsStore'

function CreateAReview({ setShowModal }) {
    const { spotId } = useParams()
    const history = useHistory()
    const [newReview, setNewReview] = useState('')
    const [stars, setStars] = useState('')
    const dispatch = useDispatch()
    const [errors, setErrors] = useState([])
    const [show, setShow] = useState(false)

    useEffect(() => {
        const validationErrors = []
        if (!stars) validationErrors.push('Stars must be between 1 and 5.')
        setErrors(validationErrors)
    }, [stars, newReview])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (errors) setShow(true)

        const userReview = {
            stars,
            review: newReview,
            spotId
        }

        const reviewCreated = await dispatch(createReviewThunk(userReview)).then();
        await dispatch(getReviewsThunk(spotId))
        await dispatch(getSpotByIdThunk(spotId))
        setShowModal(false)
        if (reviewCreated) history.push(`/spots/${spotId}`)

    }

    return (
        <div id="reviewformdiv">
            <div id="stardiv">
                <div className="col text-center">
                    <Rate rating={stars} setStars={setStars} />
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <textarea id="reviewinput" placeholder="Tell everyone about your experience."
                        type="text"
                        value={newReview}
                        onChange={(e) => setNewReview(e.target.value)}
                    />
                </div>
                <div>
                    <button id="reviewbutton" type="submit">Submit review</button>
                </div>
                <ul>
                    {show && errors.length > 0 && errors.map((error, idx) => <li style={{ color: 'red', fontSize: '12px' }} key={idx}>{error}</li>)}
                </ul>
            </form>
        </div>
    )

}

export default CreateAReview;
