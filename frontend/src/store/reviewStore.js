import { csrfFetch } from "./csrf"


const CREATE_A_REVIEW = 'create/review'
const GET_ALL_REVIEWS = 'get/reviews'
const DELETE_REVIEW = 'delete/review'

const createReviewAction = (newReviews) => {
    return {
        type: CREATE_A_REVIEW,
        newReviews
    }
}

const deleteReviewAction = (reviewId) => {
    return {
        type: DELETE_REVIEW,
        reviewId
    }
}

const getReviewsAction = (reviewSpotId) => {
    return {
        type: GET_ALL_REVIEWS,
        reviewSpotId
    }
}

export const deleteReviewThunk = (reviewId) => async (dispatch) => {

    await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    })
}

export const getReviewsThunk = (reviewSpotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${reviewSpotId}/reviews`)
    if (response.ok) {
        const spotReviews = await response.json()
        dispatch(getReviewsAction(spotReviews))
    }

}

export const createReviewThunk = (newReviews) => async (dispatch) => {
    const { spotId, review, stars } = newReviews
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        body: JSON.stringify({
            review, stars
        })
    })

    const newReview = await response.json()
    dispatch(createReviewAction(newReview))
}


export default function createReviewReducer(state = { createReview: {}, allReviews: {} }, action) {

    switch (action.type) {
        case CREATE_A_REVIEW: {
            const newState = { ...state, createReview: {}, allReviews: {} }
            newState.createReview = action.newReviews
            return newState
        }
        case GET_ALL_REVIEWS: {
            const newState = { createReview: {}, allReviews: {} }
            action.reviewSpotId.Reviews.forEach(review => {
                newState.allReviews[review.id] = review
            })
            return newState
        }
        case DELETE_REVIEW: {
            const newState = { ...state, createReview: {}, allReviews: {} }
            delete newState.allReviews[action.reviewId]
            return newState;
        }
        default:
            return state
    }
}
