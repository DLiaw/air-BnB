

const singleSpot = ({ oneSpot }) => {
    return (
        <div className="singleSpotMainDiv">
            <div className="singleSpotTop3divs">
                <div>
                    <div id="singleSpotdivText"></div>
                    <div id="singleSpotdivReview"></div>
                </div>
                <div>
                    <div>
                        <img id="singleSpotMainImage" alt={oneSpot.name} src={oneSpot.SpotImages[0].url}></img>
                    </div>
                    <div>
                        {/* <img alt={oneSpot.name} src={oneSpot.SpotImages[1].url}></img>
                        <img alt={oneSpot.name} src={oneSpot.SpotImages[2].url}></img>
                        <img alt={oneSpot.name} src={oneSpot.SpotImages[3].url}></img>
                        <img alt={oneSpot.name} src={oneSpot.SpotImages[4].url}></img> */}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default singleSpot;
