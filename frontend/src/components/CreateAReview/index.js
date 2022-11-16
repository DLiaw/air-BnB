import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createReviewThunk } from "../../store/createAReviewStore"
import { useHistory } from "react-router-dom";
import './CreateASpot.css';


function CreateAReview({ review }) {
    const history = useHistory()
    const [newReview, setNewReview] = useState('')
    const [stars, setStars] = useState('')
    const dispatch = useDispatch()
    const [errors, setErrors] = useState([])

    useEffect(() => {
        const validationErrors = []
        if (stars < 0 || stars > 6) validationErrors.push('Stars must be between 1 and 5.')
        setErrors(validationErrors)
    }, [stars, newReview])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const userReview = {
            stars,
            newReview
        }
        await dispatch(createReviewThunk())
    }

    return (
        <div>
            <label>
                <input placeholder="Stars"></input>
            </label>
            <label>
                <input placeholder="Tell us about your stay."></input>
            </label>
        </div>
    )

}
