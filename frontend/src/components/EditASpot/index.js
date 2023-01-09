import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editSpotThunk } from "../../store/spotsStore";
import { useHistory } from "react-router-dom";
import './editASpot.css';
import { deleteSpotThunk } from "../../store/spotsStore"
import { useParams } from 'react-router-dom'
import { useSelector } from "react-redux";
import { allSpotImagesThunk } from '../../store/spotsStore'

function EditASpot({ editSpot, image }) {
    const { spotId } = useParams()
    const getSpotDetail = useSelector(state => state.spot.singleSpot)
    const history = useHistory()
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [errors, setErrors] = useState([]);
    const dispatch = useDispatch()
    const [url, setUrl] = useState('')

    useEffect(() => {
        setAddress(getSpotDetail.address);
        setCity(getSpotDetail.city);
        setState(getSpotDetail.state);
        setCountry(getSpotDetail.country);
        setName(getSpotDetail.name);
        setDescription(getSpotDetail.description);
        setPrice(getSpotDetail.price);
    }, [getSpotDetail]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const editSpot = {
            name,
            address,
            city,
            state,
            country,
            description,
            price,
            spotId
        }

        const editOne = await dispatch(editSpotThunk(editSpot)).catch(
            async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            }
        )

        if (editOne) await history.push(`/spots/${spotId}`)
    }



    const handleSubmit2 = async (e) => {
        const deleteSpot = {
            spotId
        }

        history.push(`/`)

        await dispatch(deleteSpotThunk(deleteSpot))

        const refresh = await dispatch(allSpotImagesThunk())

        if (!refresh) return null;
    }



    return (
        <div className="createspotMaindiv">
            <div className="createspot">
                <form onSubmit={handleSubmit}>
                    <ul>
                        {errors.map((error, idx) => <li id="errormessages" key={idx}>{error}</li>)}
                    </ul>
                    <label>
                        <input id="spotform" placeholder="Name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        <input id="spotform" placeholder="Address"
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        <input id="spotform" placeholder="City"
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        <input id="spotform" placeholder="State"
                            type="text"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        <input id="spotform" placeholder="Country"
                            type="text"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        <textarea id="spotdescription" placeholder="Description"
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        <input id="spotform" placeholder="Price"
                            type="integer"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </label>
                    <div>
                        <button id="spotbutton" type="submit">Update</button>
                    </div>
                    <div>
                        <button id="spotbutton" onClick={handleSubmit2}>Remove</button>
                    </div>
                </form>
            </div>
        </div>
    )

}


export default EditASpot;
