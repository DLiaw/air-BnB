import './SingleSpot.css'

const singleSpot = ({ oneSpot }) => {
    const images = oneSpot.SpotImages

    if (!images) return null;

    return (
        <div className="singleSpotMainDiv">
            <div className="singleSpotTop4divs">
                <div className="singleSpotTextdiv">
                    <div id="singleSpotdivText"><h3>{oneSpot.name}</h3></div>
                    <div id="singleSpotdivReview"><p>{oneSpot.numReviews}{oneSpot.avgStarRating}</p></div>
                </div>
                <div className="singleSpotImagediv">
                    <div className="singleSpotphotodiv">
                        <img id='largeimg' alt={oneSpot.name} src={oneSpot.SpotImages[0].url}></img>
                    </div>
                    <div className="singleSpotSmalldiv">
                        <div id='smallpic2'>
                            <div>
                                <img id='smallimg' alt={oneSpot.name} src={oneSpot.SpotImages[1].url}></img>
                            </div>
                            <div>
                                <img id='smallimg' alt={oneSpot.name} src={oneSpot.SpotImages[2].url}></img>
                            </div>
                            {/* </div> */}
                            {/* <div id='smallpic2'> */}
                            {/* <div> */}
                            <img id='smallimg' alt={oneSpot.name} src={oneSpot.SpotImages[3].url}></img>
                            {/* </div> */}
                            <div>
                                <img id='smallimg' alt={oneSpot.name} src={oneSpot.SpotImages[4].url}></img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}


export default singleSpot;
