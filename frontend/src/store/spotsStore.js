import { csrfFetch } from "./csrf"

const ALL_IMAGES = 'images/all'
const GET_SPOT_BY_DETAIL = 'spot/detail'
const DELETE_SPOT = 'delete/spot'
const EDIT_SPOT = 'edit/spot'
const CREATE_A_SPOT = 'create/spot'
const ADD_IMAGE = 'add/image'


const createASpotAction = (newSpot) => {
    return {
        type: CREATE_A_SPOT,
        newSpot
    }
}

const addAImageAction = (image) => {
    return {
        type: ADD_IMAGE,
        image
    }
}

const allImagesAction = (spots) => {
    return {
        type: ALL_IMAGES,
        spots
    }
}
const editSpotAction = (editSpot) => {
    return {
        type: EDIT_SPOT,
        editSpot
    }
}
const getSpotByIdAction = (spot) => {
    return {
        type: GET_SPOT_BY_DETAIL,
        spot
    }
}

const deleteSpotAction = (id) => {
    return {
        type: DELETE_SPOT,
        id
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

export const getSpotByIdThunk = (spotId) => async dispatch => {
    const response = await fetch(`/api/spots/${spotId}`)
    if (response.ok) {
        const spotDetail = await response.json()
        dispatch(getSpotByIdAction(spotDetail))
    }
}

export const deleteSpotThunk = (id) => async (dispatch) => {
    const { spotId } = id
    await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    })
}

export const allSpotImagesThunk = () => async dispatch => {
    const response = await fetch("/api/spots")
    if (response.ok) {
        const spotImages = await response.json()
        dispatch(allImagesAction(spotImages))
    }

}

export const addAImageThunk = (image) => async dispatch => {
    const { spotId, url, preview } = image
    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: 'POST',
        body: JSON.stringify({
            spotId, url, preview
        })
    })
    const newImage = await response.json()
    dispatch(addAImageAction(newImage))
    return response
}

export const createASpotThunk = (newSpot) => async dispatch => {
    const { url } = newSpot
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSpot)
    })
    if (response.ok) {

        const oneSpot = await response.json()

        const res = await csrfFetch(`/api/spots/${oneSpot.id}/images`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url, preview: true })
        })
        if (res.ok) {
            const image = await res.json()
            oneSpot.SpotImages = [image]
            dispatch(createASpotAction(oneSpot))
            return oneSpot
        }
    }

}


export default function allSpotImagesReducer(state = { createSpot: {}, addImage: {}, allSpots: {}, singleSpot: {}, editedSpot: {} }, action) {

    switch (action.type) {

        case ALL_IMAGES: {
            // key into action then key into array
            const newState = { createSpot: {}, addImage: {}, allSpots: {}, singleSpot: {}, editedSpot: {} }
            action.spots.Spots.forEach(e => {
                newState.allSpots[e.id] = e
            })
            return newState;
        }
        case GET_SPOT_BY_DETAIL: {
            const newState = { createSpot: {}, addImage: {}, allSpots: {}, singleSpot: {}, editedSpot: {} }
            newState.singleSpot = action.spot
            return newState;
        }
        case DELETE_SPOT: {
            const newState = { ...state, createSpot: {}, addImage: {}, allSpots: {}, singleSpot: {}, editedSpot: {} }
            delete newState.allSpots[action.id]
            return newState;
        }
        case EDIT_SPOT: {
            const newState = { ...state, createSpot: {}, addImage: {}, allSpots: {}, singleSpot: {}, editedSpot: {} }
            newState.editedSpot = action.editSpot
            return newState
        }
        case CREATE_A_SPOT: {
            const newState = { ...state, createSpot: {}, addImage: {}, allSpots: {}, singleSpot: {}, editedSpot: {} }
            newState.createSpot = action.newSpot;
            return newState;
        }
        case ADD_IMAGE: {
            const newState = { ...state, createSpot: {}, addImage: {}, allSpots: {}, singleSpot: {}, editedSpot: {} }
            newState.addImage = action.image
            return newState;
        }
        default:
            return state;
    }
}
