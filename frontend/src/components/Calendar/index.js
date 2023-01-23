import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import moment from "moment";
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { addDays } from 'date-fns'
import { DateRangePicker } from 'react-dates';

const Calendar = ({ bookings }) => {

    const dispatch = useDispatch()

    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [focusedInput, setFocusedInput] = useState(null)
    const [bookedDates, setBookedDates] = useState([])
    const [validatedDates, setValidatedDates] = useState([])
    const [blockedDates, setBlockedDates] = useState([])
    const handleDateChanges = ({ startDate, endDate }) => {
        setStartDate(startDate)
        setEndDate(endDate)
    }

    useEffect(() => {
        existingBookings(bookings)
        // validateBookings(bookedDates)
    }, [dispatch, bookings])

    useEffect(() => {
        blockedDates.push(bookedDates, validatedDates)
    }, [dispatch, bookedDates, validatedDates])

    const blockDates = (day) => {
        const blockedDates = new Set([...bookedDates, ...validatedDates])
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
            const blockedDates = new Set([...bookedDates, ...validatedDates])
            return blockedDates.has(moment(day).add(1, 'days').format('YYYY-MM-DD'))
        }
    }

    const blockStupidDays = (day) => {
        if (startDate) {
            return moment(startDate).diff() < 0
        }

    }

    return (
        <>
            <DateRangePicker
                startDate={startDate} // momentPropTypes.momentObj or null,
                startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                endDate={endDate} // momentPropTypes.momentObj or null,
                endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                onDatesChange={handleDateChanges} // PropTypes.func.isRequired,
                focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                // PropTypes.func.isRequired,
                onFocusChange={focusedInput => setFocusedInput(focusedInput)}
                showClearDates={true}
                minimumNights={1}
                minDate={moment(new Date())}
                isDayBlocked={blockDates}
                startDatePlaceholderText="start date"
                endDatePlaceholderText="end date"
                hideKeyboardShortcutsPanel={true}
                isDayHighlighted={checkGapDays}
                isOutsideRange={blockStupidDays}
            />
        </>
    )
}


export default Calendar
