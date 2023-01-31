import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { deleteBookingThunk, allBookingsIdThunk } from "../../store/bookings";

const Booking = ({ booking }) => {
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const [load, setLoad] = useState(false)

    useEffect(() => {
        if (!booking.Spot) setLoad(false)
        if (booking.Spot) setLoad(true)
    }, [booking.Spot])

    const handleDelete = async (e) => {
        e.preventDefault()
        dispatch(deleteBookingThunk(booking))
        dispatch(allBookingsIdThunk(booking.id))
        setOpen(false)
    }

    return (
        <div>
            {load ? <div className="single-booking">
                <label></label>
                <NavLink className='single-booking-nav' to={`/spots/${booking.Spot.id}`}><img alt="map-booking" src={booking.Spot.previewImage}></img></NavLink>
                <div className="single-name" >
                    <div>{booking.Spot.name}</div>
                    <i onClick={() => setOpen(!open)} style={{ cursor: 'pointer' }} class="fa-solid fa-ellipsis" />
                </div>
                <div>{booking.Spot.country}</div>
                {open && <Drop />}
            </div>
                :
                null}
        </div>
    )

    function Drop() {
        return (
            <div className="booking-delete">
                <button className="deleteBtn" onClick={handleDelete}>Delete</button>
            </div >
        )
    }
}

export default Booking;
