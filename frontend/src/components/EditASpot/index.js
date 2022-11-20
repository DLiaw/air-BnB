import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { editSpotThunk } from "../../store/spotsStore";
import { useHistory } from "react-router-dom";
import './editASpot.css';
import { deleteSpotThunk } from "../../store/spotsStore"
import { useParams } from 'react-router-dom'



function EditASpot({ editSpot, image }) {
    const { spotId } = useParams()
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
        const validationErrors = []
        if (name === ' ') validationErrors.push('Name is required.')
        if (address === ' ') validationErrors.push('Address is required.')
        if (city === ' ') validationErrors.push('City is required.')
        if (state === ' ') validationErrors.push('State is required.')
        if (country === ' ') validationErrors.push('Country is required.')
        if (description === ' ') validationErrors.push('Description is required.')
        if (price === ' ') validationErrors.push('Price is required.')
        if (name.length > 30) validationErrors.push('Name must be under 30 characters.')
        if (city.length > 30) validationErrors.push('City must be under 30 characters.')
        if (state.length > 30) validationErrors.push('State must be under 30 characters.')
        if (country.length > 30) validationErrors.push('Country must be under 30 characters.')
        if (description.length > 200) validationErrors.push('Address must be under 200 characters.')
        if (price !== '' && price < 1) validationErrors.push('Price must be at least $1.')
        if (url.length === ' ') validationErrors.push('Url is required.')
        if (url.split('.') === undefined) validationErrors.push('Must be a valid url address.')
        setErrors(validationErrors)
    }, [name, address, city, state, country, description, price, url])

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

        await dispatch(editSpotThunk(editSpot)).catch(
            async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            }
        )

        await history.push(`/spots/${spotId}`)
    }
    const handleSubmit2 = async (e) => {
        const deleteSpot = {
            spotId
        }

        await dispatch(deleteSpotThunk(deleteSpot))

        history.push(`/`)

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
