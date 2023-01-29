import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { allBookingsUserThunk } from "../../store/bookings";
import MyGoogleMap from "../BookingsMap";
import Booking from "./userBooking";
import './userBooking.css'

const UserBookings = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { userId } = useParams()
    const bookings = useSelector(state => Object.values(state.bookings?.userBookings))

    useEffect(() => {
        if (!bookings.length) dispatch(allBookingsUserThunk(userId))
        if (bookings.length <= 0) history.push(`/`)
    }, [dispatch, bookings])

    // if (!bookings.length) return null
    return (
        <div className="bookings-main">
            <div className="bookings-map-div">
                <MyGoogleMap bookings={bookings} />
            </div>
            <div className="map-bookings-info">
                <div className="bookings-header">
                    <label className="booking-trips">Your trips.</label>
                </div>
                {bookings.map((booking, i) => (
                    <Booking key={i} booking={booking} />
                ))}
            </div>
        </div>
    )
}

export default UserBookings;
