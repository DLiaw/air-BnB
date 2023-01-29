import { csrfFetch } from "./csrf"

const ALL_BOOKINGS_BY_SPOT = 'bookings/allBookingsById'
const ALL_BOOKINGS_BY_USER = 'bookings/allBookingsByUser'
const NEW_BOOKING = 'bookings/newBooking'
const DELETE_BOOKING = 'bookings/delete'
const CLEAN_UP = 'booking/CLEAN_UP'
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

const newBooking = booking => {
    return {
        type: NEW_BOOKING,
        booking
    }
}

const deleteBookings = booking => {
    return {
        type: DELETE_BOOKING,
        booking
    }
}

export const bookingCleanup = () => {
    return {
        type: CLEAN_UP
    }
}

// bookings thunks

export const allBookingsIdThunk = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}/bookings`)
    if (response.ok) {
        const data = await response.json()
        dispatch(allBookingsById(data))
    }
}

export const allBookingsUserThunk = () => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/current`)
    if (response.ok) {
        const data = await response.json()
        dispatch(allBookingsByUser(data))
        return data
    }
}

export const newBookingThunk = (booking) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${booking.spotId}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(newBooking(data))
        return data
    } else if (response.status < 500) {
        const data = await response.json()
        if (data.errors) return data
    }
}

export const deleteBookingThunk = (booking) => async (dispatch) => {
    await csrfFetch(`/api/bookings/${booking.id}`, {
        method: 'DELETE'
    })
    dispatch(deleteBookings(booking))
}

// bookings reducer

const oldState = { spotBookings: {}, userBookings: {} }

export default function bookingsReducer(state = oldState, action) {
    const newState = { ...state }
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
            return newState
        case CLEAN_UP: {
            newState.spotBookings = {}
            newState.userBookings = {}
            return newState
        }
        case DELETE_BOOKING: {
            delete newState.userBookings[action.booking.id]
            return newState
        }
        case NEW_BOOKING: {
            newState.userBookings[action.booking.id] = action.booking
            return newState
        }
        default:
            return oldState
    }
}
