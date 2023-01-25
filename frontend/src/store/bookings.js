const ALL_BOOKINGS_BY_SPOT = 'bookings/allBookingsById'
const ALL_BOOKINGS_BY_USER = 'bookings/allBookingsByUser'

// bookings actions

const allBookingsById = (bookings) => {
    return {
        type: ALL_BOOKINGS_BY_SPOT,
        bookings
    }
}

const allBookingsByUser = (bookings) => {
    return {
        type: ALL_BOOKINGS_BY_USER,
        bookings
    }
}

// bookings thunks

export const allBookingsIdThunk = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spot/${spotId}/bookings`)
    if (response.ok) {
        const data = await response.json()
        dispatch(allBookingsById(data))
    }
}

export const allBookingsUserThunk = () => async (dispatch) => {
    const response = await fetch(`/api/bookings/current`)
    if (response.ok) {
        const data = await response.json()
        dispatch(allBookingsByUser(data))
    }
}


// bookings reducer

const oldState = { spotBookings: {}, userBookings: {} }

export default function bookingsReducer(state = oldState, action) {
    const newState = { ...oldState }
    switch (action.type) {
        case ALL_BOOKINGS_BY_SPOT:
            if (action.bookings) {
                action.bookings.forEach(e => {
                    newState.spotBookings[e.id] = e
                })
            }
            return newState

        case ALL_BOOKINGS_BY_USER:
            if (action.bookings) {
                action.bookings.forEach(e => {
                    newState.userBookings[e.id] = e
                })
            }
        default:
            return oldState
    }
}
