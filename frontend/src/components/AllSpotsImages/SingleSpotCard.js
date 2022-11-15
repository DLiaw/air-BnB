import { NavLink } from "react-router-dom";

const SingleSpotCard = ({ spot }) => {

    return (

        <div className='spotsSeconddiv' >
            <div id='imageNav'>
                <NavLink to={`/spots/${spot.id}`}>
                    <img id='spotimage' alt={spot.name} src={spot.previewImage}></img>
                </NavLink>
            </div>
            <div className="priceAndStardiv">
                <div id="cityCountryPrice">
                    <div>{spot.city}, {spot.country}</div>
                    <div>${spot.price}/night</div>
                </div>
                <div>
                    <div>
                        <i class="fa-solid fa-star"></i>
                        {spot.avgRating}
                    </div>
                </div>
            </div>
        </div >

    )
}

export default SingleSpotCard;
