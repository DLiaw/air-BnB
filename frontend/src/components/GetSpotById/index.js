import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotByIdThunk } from '../../store/allspots'
import SingleSpot from './SingleSpot';
import './SingleSpot.css'
import { useParams } from 'react-router-dom';

const SpotDetail = () => {
    const oneSpot = useSelector(state => state.spot.singleSpot)
    const { spotId } = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSpotByIdThunk(spotId))
    }, [dispatch])

    if (!oneSpot) return null;

    return (
        <div style={{ borderColor: '3px solid red', paddingTop: '200px' }}>
            <SingleSpot key={oneSpot.id} oneSpot={oneSpot} />
        </div>
    )

}

export default SpotDetail;
