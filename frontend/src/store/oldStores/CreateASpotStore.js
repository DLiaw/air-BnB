// import { csrfFetch } from "./csrf"

// const CREATE_A_SPOT = 'create/spot'
// const ADD_IMAGE = 'add/image'

// const createASpotAction = (newSpot) => {
//     return {
//         type: CREATE_A_SPOT,
//         newSpot
//     }
// }

// const addAImageAction = (image) => {
//     return {
//         type: ADD_IMAGE,
//         image
//     }
// }

// export const addAImageThunk = (image) => async dispatch => {
//     const { spotId, url, preview } = image
//     const response = await csrfFetch(`/api/spots/${spotId}/images`, {
//         method: 'POST',
//         body: JSON.stringify({
//             spotId, url, preview
//         })
//     })
//     const newImage = await response.json()
//     dispatch(addAImageAction(newImage))
//     return response
// }

// export const createASpotThunk = (newSpot) => async dispatch => {
//     const { url } = newSpot
//     const response = await csrfFetch('/api/spots', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(newSpot)
//     })
//     if (response.ok) {

//         const oneSpot = await response.json()

//         const res = await csrfFetch(`/api/spots/${oneSpot.id}/images`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ url, preview: true })
//         })
//         if (res.ok) {
//             const image = await res.json()
//             oneSpot.SpotImages = [image]
//             dispatch(createASpotAction(oneSpot))
//             return oneSpot
//         }
//     }

// }



// export default function createASpotReducer(state = { createSpot: {}, addImage: {} }, action) {
//     const newState = { ...state }
//     switch (action.type) {
//         case CREATE_A_SPOT:
//             // newState = Object.assign({}, state)
//             newState.createSpot = action.newSpot;
//             return newState;

//         case ADD_IMAGE:
//             newState.addImage = action.image
//             return newState;
//         default:
//             return state;
//     }
// }
