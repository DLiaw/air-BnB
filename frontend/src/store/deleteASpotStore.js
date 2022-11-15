import { csrfFetch } from "./csrf"


const DELETE_SPOT = 'delete/spot'

const deleteSpotAction = (id) => {
    return {
        type: DELETE_SPOT,
        id
    }
}


export const deleteSpotThunk = (id) => async (dispatch) => {
    const { spotId } = id
    await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    })
}


export default function deleteSpotReducer(state = { delete: {} }, action) {
    const newState = { ...state }
    switch (action.type) {
        case DELETE_SPOT:
            delete newState[action.spot.id]
            return newState;

        default:
            return state
    }
}
