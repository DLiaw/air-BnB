import { csrfFetch } from "./csrf"


const EDIT_SPOT = 'edit/spot'

const editSpotAction = (editSpot) => {
    return {
        type: EDIT_SPOT,
        editSpot
    }
}


export const editSpotThunk = (editSpot) => async (dispatch) => {
    const { spotId, address, city, state, country, name, price, description } = editSpot

    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
        body: JSON.stringify({
            address, city, state, country, name, price, description
        })
    })
    if (response.ok) {
        const newEditSpot = await response.json()
        dispatch(editSpotAction(newEditSpot))
        return newEditSpot
    }
}


export default function editASpotReducer(state = { editedSpot: {} }, action) {
    const newState = { ...state }
    switch (action.type) {
        case EDIT_SPOT:
            newState.editedSpot = action.editSpot
            return newState

        default:
            return state
    }
}
