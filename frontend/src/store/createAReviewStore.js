import { csrfFetch } from "./csrf"


const CREATE_A_REVIEW = 'create/review'


const createReviewAction = (newReviews) => {
    return {
        type: CREATE_A_REVIEW,
        review
    }
}



export const createReviewThunk = (newReviews) => async (dispatch) => {
    const { spotId, review, stars } = newReviews
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        body: JSON.stringify({
            spotId, review, stars
        })
    })
    const newReview = await response.json()
    dispatch(createReviewAction(newReview))
}


export default function createReviewReducer(state = { createReview: {} }, action) {
    const newState = { ...state }
    switch (action.type) {
        case CREATE_A_REVIEW:
            newState.createReview = action.review
            return newState


        default:
            return state
    }
}
