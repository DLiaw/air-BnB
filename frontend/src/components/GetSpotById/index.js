import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotByIdThunk } from '../../store/allspots'
import SingleSpot from './SingleSpot';
import './SingleSpot.css'
import { NavLink, useParams } from 'react-router-dom';

const SpotDetail = () => {
    const sessionUser = useSelector(state => state.session.user);
    const oneSpot = useSelector(state => state.spot.singleSpot)
    const [isloaded, setLoaded] = useState(false)
    const { spotId } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSpotByIdThunk(spotId))
            .then(() => { setLoaded(true) })
    }, [dispatch], spotId)

    if (!oneSpot) return null;

    const user = sessionUser.id
    if (user == oneSpot.ownerId && sessionUser) {
        return isloaded && (
            <div style={{ borderColor: '3px solid red', paddingTop: '200px' }}>
                <div>
                    <SingleSpot key={oneSpot.id} oneSpot={oneSpot} />
                </div>
                <div>
                    <NavLink to={`/spots/${oneSpot.id}/edit`}>
                        <button>Edit</button>
                    </NavLink>
                </div>
            </div>
        )
    }


    else {
        if (!oneSpot) return null;
        return isloaded && (
            <div style={{ borderColor: '3px solid red', paddingTop: '200px' }}>
                <div>
                    <SingleSpot key={oneSpot.id} oneSpot={oneSpot} />
                </div>
            </div>
        )
    }
}

export default SpotDetail;
