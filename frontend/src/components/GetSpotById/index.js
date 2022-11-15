import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotByIdThunk } from '../../store/allspots'
import SingleSpot from './SingleSpot';
import './SingleSpot.css'
import { useParams } from 'react-router-dom';

const SpotDetail = () => {
    const oneSpot = useSelector(state => state.spot.singleSpot)
    const [isloaded, setLoaded] = useState(false)
    const { spotId } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSpotByIdThunk(spotId))
            .then(() => { setLoaded(true) })
    }, [dispatch], spotId)

    if (!oneSpot) return null;

    return isloaded && (
        <div style={{ borderColor: '3px solid red', paddingTop: '200px' }}>
            <SingleSpot key={oneSpot.id} oneSpot={oneSpot} />
        </div>
    )

}

export default SpotDetail;
