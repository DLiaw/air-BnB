import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createASpotThunk } from "../../store/spotsStore";
import { useHistory } from "react-router-dom";
import './CreateASpot.css';


function CreateASpot({ newSpot }) {
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
        const format = ['.jpeg', '.png', '.jpg', '.gif']
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
        if (!format.includes(url.slice(-4))) validationErrors.push("Images must be in jpeg, png, jpg, or gif format.")

        setErrors(validationErrors)
    }, [name, address, city, state, country, description, price, url])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newSpot = {
            name,
            address,
            city,
            state,
            country,
            description,
            price,
            url
        }


        const createOne = await dispatch(createASpotThunk(newSpot)).catch(
            async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            }
        )


        if (createOne) history.push(`/spots/${createOne.id}`)



    }
    return (
        <div className="createspotMaindiv" >
            <div className="createspot">
                <form onSubmit={handleSubmit}>
                    <ul>
                        {errors.length > 0 && errors.map((error, idx) => <li id="errormessages" key={idx}>{error}</li>)}
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
                    <label>
                        <input id="spotform" placeholder="Url"
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </label>
                    <div>
                        <button id="spotbutton" type="submit">Become a host</button>
                    </div>
                </form>
            </div>
        </div>
    )

}


export default CreateASpot;
