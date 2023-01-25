import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import moment from "moment";
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { DateRangePicker } from 'react-dates';
import { Fragment } from 'react';
import "./calendar.css"


const Calendar = ({ bookings, spot }) => {

    const dispatch = useDispatch()
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [focusedInput, setFocusedInput] = useState(null)
    const [bookedDates, setBookedDates] = useState([])
    const [blockedDates, setBlockedDates] = useState([])

    useEffect(() => {
        existingBookings(bookings)
    }, [dispatch, bookings])

    useEffect(() => {
        blockedDates.push(bookedDates)
    }, [dispatch, bookedDates])

    const handleDateChanges = ({ startDate, endDate }) => {
        setStartDate(startDate)
        setEndDate(endDate)
    }

    const blockDates = (day) => {
        const blockedDates = new Set([...bookedDates])
        return blockedDates.has(moment(day).format('YYYY-MM-DD'))
    }

    const existingBookings = (bookings) => {

        bookings.forEach(booking => {
            const { startDate, endDate } = booking
            let date = new Date(startDate)
            let dateEnd = new Date(endDate)
            while (date < dateEnd) {
                bookedDates.push(moment(new Date(date + 1)).format('YYYY-MM-DD'))
                date.setDate(date.getDate() + 1)
            }
        })
    }

    const checkGapDays = (day) => {
        if (day > moment()) {
            const blockedDates = new Set([...bookedDates])
            return blockedDates.has(moment(day).add(1, 'days').format('YYYY-MM-DD'))
        }
    }

    const validatedDates = (day) => {

        if (!startDate) {
            return moment(startDate).diff(day, 'days') > 0
        }
        if (startDate) {

            const blockedDates = [...bookedDates]
            let earliestBlockedDate = blockedDates[0]

            for (let i = 0; i < blockedDates.length; i++) {
                if (moment(blockedDates[i]) > moment(startDate)) {
                    earliestBlockedDate = blockedDates[i]
                    break
                }
            }
            if (moment(startDate).diff(earliestBlockedDate, 'days') > 0) {
                return moment(startDate).diff(day, 'days') > 0
            }
            return moment(startDate).diff(day, 'days') > 0 || moment(day).format('YYYY-MM-DD') > earliestBlockedDate
        }
    }


    const calInfo = (e) => {
        return (
            <Fragment>

                <div className="calendar-info-top">
                    <span>Select Dates</span>
                    <span> Add your travel dates for exact pricing</span>
                </div>
                <div className="calendar-info-bottom">
                    <button>Clear dates</button>
                    <button>Close</button>
                </div>

            </Fragment>
        )
    }



    return (
        <div className="calendar-container">
            <div className='cal-price-reviews'>
                <div>
                    <span style={{ fontSize: '22px' }}>${spot.price}</span>  &nbsp;<span>night</span>
                </div>
                <div>
                    ⭐{spot.avgStarRating} • {spot.numReviews}&nbsp;review(s)
                </div>
            </div>
            <div className='cal-input'>
                <DateRangePicker
                    className='cal-cal'
                    startDate={startDate} // momentPropTypes.momentObj or null,
                    startDateId="startDateId" // PropTypes.string.isRequired,
                    endDate={endDate} // momentPropTypes.momentObj or null,
                    endDateId="endDateId" // PropTypes.string.isRequired,
                    onDatesChange={handleDateChanges} // PropTypes.func.isRequired,
                    focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={focusedInput => setFocusedInput(focusedInput)}
                    showClearDates={true}
                    reopenPickerOnClearDates={startDate}
                    minimumNights={1}
                    minDate={moment(new Date())}
                    isDayBlocked={blockDates}
                    startDatePlaceholderText="Check-in"
                    endDatePlaceholderText="Checkout"
                    hideKeyboardShortcutsPanel={true}
                    isDayHighlighted={checkGapDays}
                    isOutsideRange={validatedDates}
                    calendarInfoPosition={"bottom"}
                    renderCalendarInfo={calInfo}

                />
            </div>

            {startDate == null && endDate == null && <div className='cal-reserve-div'>
                <button className='cal-reserve' style={{ color: 'white' }}>Check availability</button>
            </div>}

            {startDate && endDate && <div className='cal-reserve-div'>
                <button className='cal-reserve' style={{ color: 'white' }}>Reserve</button>
            </div>}

            {startDate && endDate && <div className='cal-charge'>
                <div style={{ fontSize: '13px', color: 'grey' }}>You won't be charged yet</div>
            </div>}

            {startDate && endDate && <div className='cal-all'>
                <div className='cal-charge-info'>
                    {console.log(endDate, 'FROM FRONT ENDDDDDDDDDDDDDDDDDDDDDD')}
                    <p>${spot.price} x {moment(endDate).diff(moment(startDate), 'days')} nights </p><p>${spot.price * moment(endDate).diff(moment(startDate), 'days')}</p>
                </div>
                <div className='cal-charge-info'>
                    <p>Special offer</p> <p style={{ color: 'green' }}>-$100</p>
                </div>
                <div className='cal-charge-info'>
                    <p>Cleaning fee</p> <p>$150</p>
                </div>
                <div className='cal-charge-info'>
                    <p>Service Fee</p> <p>${((spot.price * moment(endDate).diff(moment(startDate), 'days')) * .14).toFixed(0)}</p>
                </div>
                <div>
                    <div className='cal-charge-info' style={{ borderTop: "1px solid grey" }}>
                        <p>Total before taxes</p> <p>${50 + (spot.price * moment(endDate).diff(moment(startDate), 'days') * .14) + (spot.price * moment(endDate).diff(moment(startDate), 'days'))}</p>
                    </div>
                </div>
            </div>}
        </div>
    )
}


export default Calendar
