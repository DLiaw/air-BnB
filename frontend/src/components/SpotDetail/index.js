import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotByIdThunk } from '../../store/spotsStore'
import SingleSpot from './SingleSpot';
import { NavLink, useParams } from 'react-router-dom';
import SingleSpotReviews from '../ReviewModal/Review';
import { cleanUp } from '../../store/reviewStore';
import Calendar from '../Calendar';
import { allBookingsIdThunk } from '../../store/bookings'
import './SingleSpot.css'
import SpotGoogleMap from '../SpotDetailMap';

const SpotDetail = () => {
    const sessionUser = useSelector(state => state.session.user);
    const oneSpot = useSelector(state => state.spot.singleSpot)
    const { spotId } = useParams()
    const dispatch = useDispatch()


    useEffect(() => {
        if (sessionUser) dispatch(allBookingsIdThunk(spotId))
        dispatch(getSpotByIdThunk(spotId))
        return () => dispatch(cleanUp())
    }, [dispatch, spotId])

    const bookings = useSelector(state => Object.values(state.bookings.spotBookings))

    if (!Object.values(oneSpot).length) return null;

    // const user = sessionUser.id
    return (
        <div className='singlespot-wrapper'>
            <div id='onespotmaindiv'>
                <div id='onespotdiv'>
                    <div >
                        <SingleSpot oneSpot={oneSpot} />
                    </div>
                </div>
                {sessionUser?.id == oneSpot.ownerId && sessionUser && <div>
                    <NavLink to={`/spots/${oneSpot.id}/edit`}>
                        <h3 style={{ textDecoration: 'underline' }}>Edit your listing</h3>
                    </NavLink>
                </div>}
                <div id="reviewcreatediv">
                    <div>
                        <SingleSpotReviews spotId={spotId} />
                    </div>
                    <div>
                        <Calendar spot={oneSpot} bookings={bookings} />
                    </div>
                </div>
                <div className='spot-map'>
                    <h1>Where you'll be...</h1>
                    <SpotGoogleMap oneSpot={oneSpot} />
                </div>
            </div >
        </div >
    )

}

export default SpotDetail;
