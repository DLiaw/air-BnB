import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allSpotImagesThunk } from '../../store/spotsStore'
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
            <div className='bottombar'>
                <div><h3>Connect:&nbsp;&nbsp;&nbsp;&nbsp;</h3></div>

                <a href='https://github.com/DLiaw'> <i class="fa-brands fa-github fa-2xl" />&nbsp;github</a>
                <a href='https://www.linkedin.com/in/david-liaw-55a510251/'> &nbsp;&nbsp;&nbsp;&nbsp;<i class="fa-brands fa-linkedin fa-2xl">&nbsp;</i>Linkedin</a>
                {/* <a href='DL0429922@gmail.com'>&nbsp;&nbsp;&nbsp;&nbsp; <i class="fa-solid fa-envelope fa-2xl">&nbsp;</i>Email</a> */}
            </div>
        </div>
    )
}

export default AllSpotImage;
