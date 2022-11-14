
const ALL_IMAGES = 'images/all'
const GET_SPOT_BY_DETAIL = 'spot/detail'

const allImagesAction = (spots) => {
    return {
        type: ALL_IMAGES,
        spots
    }
}

const getSpotByIdAction = (spot) => {
    return {
        type: GET_SPOT_BY_DETAIL,
        spot
    }
}




export const getSpotByIdThunk = (spotId) => async dispatch => {
    const response = await fetch(`/api/spots/${spotId}`)
    if (response.ok) {
        const spotDetail = await response.json()
        dispatch(getSpotByIdAction(spotDetail))
    }
}

export const allSpotImagesThunk = () => async dispatch => {
    const response = await fetch("/api/spots")
    if (response.ok) {
        const spotImages = await response.json()
        dispatch(allImagesAction(spotImages))
    }

}



export default function allSpotImagesReducer(state = { allSpots: {}, singleSpot: {} }, action) {
    const newState = { ...state }
    switch (action.type) {

        case ALL_IMAGES:
            // key into action then key into array
            action.spots.Spots.forEach(e => {
                newState.allSpots[e.id] = e
            })
            return newState;


        case GET_SPOT_BY_DETAIL:
            newState.singleSpot = action.spot
            return newState;

        default:
            return state;
    }
}
