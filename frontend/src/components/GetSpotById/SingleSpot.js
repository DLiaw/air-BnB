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
                <h1>{oneSpot.description}</h1>
                <div id='namereviewdiv'>
                    <div id="singleSpotnamediv">
                    </div>
                    <div id="singleSpotdivReview">
                        <div style={{ fontSize: '20px' }}>
                            ⭐{oneSpot.avgStarRating}    ✦ {oneSpot.numReviews} reviews ✦ {oneSpot.name}, {oneSpot.country}
                        </div>
                    </div>
                </div>
                <div className="singleSpotImagediv">
                    <div className="picturediv">
                        <div id="singlespotmainpic">
                            <img style={{ height: '432px', widht: '540px' }}
                                alt={oneSpot.name}
                                src={previewImg[0].url ? previewImg[0].url : 'https://tools420.com/wp-content/uploads/2022/01/comingsoon.jpg'}></img>
                        </div>
                        <div id='mapdiv'>
                            {previewFalse.map(each => (
                                <div id="foursmallpics"
                                    key={each.id}>
                                    <img style={{ height: '100%', width: '100%' }}
                                        alt={oneSpot.name}
                                        src={each.url ? each.url : 'https://tools420.com/wp-content/uploads/2022/01/comingsoon.jpg'}></img>
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
