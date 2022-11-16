import './SingleSpot.css'

const singleSpot = ({ oneSpot }) => {
    const images = oneSpot.SpotImages
    console.log(oneSpot)
    if (!images) return null;

    const previewImg = oneSpot.SpotImages.filter(each => (
        each.preview == true
    ))
    const previewFalse = oneSpot.SpotImages.filter(each => (
        each.preview == false
    ))

    return (
        <div className="singleSpotMainDiv">
            <div className="singleSpotTop4divs">
                <div className="singleSpotTextdiv">
                    <div id="singleSpotdivText"><h3>{oneSpot.name}</h3></div>
                    <div id="singleSpotdivReview"><p>{oneSpot.numReviews}{oneSpot.avgStarRating}</p></div>
                </div>
                <div className="singleSpotImagediv">
                    <div className="singleSpotphotodiv">
                        <div>
                            <img alt={oneSpot.name} src={previewImg[0].url}></img>
                        </div>
                        {previewFalse.map(each => (
                            <div>
                                <img alt={oneSpot.name} src={each.url}></img>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    )
}


export default singleSpot;



/*
<img id='largeimg' alt={oneSpot.name} src={oneSpot.SpotImages[0].url}></img>
                    </div>
                    <div className="singleSpotSmalldiv">
                        <div id='smallpic2'>
                            <div>
                                <img id='smallimg' alt={oneSpot.name} src={otherImages[1].url}></img>
                            </div>
                            <div>
                                <img id='smallimg' alt={oneSpot.name} src={otherImages[2].url}></img>
                            </div>



                            <img id='smallimg' alt={oneSpot.name} src={otherImages[3].url}></img>

                            <div>
                                <img id='smallimg' alt={oneSpot.name} src={otherImages[4].url}></img>
                            </div>
                        </div>
                        */
