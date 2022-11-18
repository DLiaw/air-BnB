import './SingleSpot.css'

const singleSpot = ({ oneSpot }) => {
    const images = oneSpot.SpotImages

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
                <div id='namereviewdiv'>
                    <div id="singleSpotnamediv">
                        <div>
                            {oneSpot.name}
                        </div>
                    </div>
                    <div id="singleSpotdivReview">
                        <div >
                            {oneSpot.numReviews} reviews, ★{oneSpot.avgStarRating}
                        </div>
                    </div>
                </div>
                <div className="singleSpotImagediv">
                    <div className="picturediv">
                        <div id="singlespotmainpic">
                            <img style={{ height: '432px', widht: '540px' }}
                                alt={oneSpot.name}
                                src={previewImg[0].url}></img>
                        </div>
                        <div id='mapdiv'>
                            {previewFalse.map(each => (
                                <div id="foursmallpics"
                                    key={each.id}>
                                    <img style={{ height: '100%', width: '100%' }}
                                        alt={oneSpot.name}
                                        src={each.url}></img>
                                </div>
                            ))}
                        </div>
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
