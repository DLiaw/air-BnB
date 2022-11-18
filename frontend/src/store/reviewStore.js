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

const deleteReviewAction = (id) => {
    return {
        type: DELETE_REVIEW,
        id
    }
}

const getReviewsAction = (reviewSpotId) => {
    return {
        type: GET_ALL_REVIEWS,
        reviewSpotId
    }
}

export const deleteReviewThunk = (id) => async (dispatch) => {
    console.log('RECEIVING ID FROM FRONTEND', id)

    const response = await csrfFetch(`/api/reviews/${id}`, {
        method: 'DELETE'
    })
    if (response.ok) {
        const data = await response.json()
        console.log('deleted review from response', data)
        dispatch(deleteReviewAction(id))
    }

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
            console.log('GET ALL REVIEWS CASE FROM REDUCER', newState)
            return newState
        }

        case DELETE_REVIEW: {
            const newState = { ...state, allReviews: { ...state.allReviews } }
            delete newState.allReviews[action.id]
            return newState;
        }
        default:
            return state
    }
}
