import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allSpotImagesThunk } from '../../store/allspots'
import SingleSpotCard from './SingleSpotCard';
import './AllSpots.css'


const AllSpotImage = () => {
    const allSpotss = useSelector(state => Object.values(state.spot.allSpots))
    // allSpots comes from reducer
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(allSpotImagesThunk())
    }, [dispatch])


    if (!allSpotss.length) return null;


    return (
        <div className='wrapper'>
            <div className="whiteSpacediv">
                <div className='spotsMaindiv'>
                    {allSpotss.map(spot => (
                        <SingleSpotCard key={spot.id} spot={spot} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AllSpotImage;
// right now allSpots is an object
// need to conver to array
// map each spot out
// either display it or pass to another component
    // let norAllSpots;
    // norAllSpots = Object.values(allSpots)
    // const [spot, setSpot] = useState([])

    // useEffect(() => {
    //     console.log(norAllSpots)
    //     console.log(state, price, country, previewImage)
    // }, [allSpots])


    // action thunk reducer
    // pass in to root reducer
    // create folder / index
    // create optional component
    // pass to app to render make sure to route it
    // make sure to import everything !!
