// import { useEffect, useState } from "react";
// import { useHistory } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import addAImageAction from "../../store/CreateASpotStore";
// import './CreateASpot.css';

// function AddImage({ image }) {
//     const { spotId } = image
//     const [url, setUrl] = useState('')
//     // const [preview, setPreview] = useState(true)
//     const [errors, setErrors] = useState([])
//     const dispatch = useDispatch()
//     useEffect(() => {
//         const validationErrors = []
//         if (url.split('.') === undefined) validationErrors.push('Must be a valid url.')
//         setErrors(validationErrors)

//     }, [url])

//     const handleSubmit = (e) => {
//         e.preventDefault()
//         return dispatch(addAImageAction(spotId))
//     }

//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <ul>
//                     {errors.map((error, idx) => <li key={idx}>{error}</li>)}
//                 </ul>
//                 <label>
//                     <input id="addImageUrl" placeholder="Image url"
//                         type="text"
//                         value={url}
//                         onChange={(e) => setUrl(e.target.value)}
//                         required
//                     />
//                 </label>
//                 <label>
//                     <input id="addImageUrl" placeholder="Optional"
//                         type="text"
//                         value={url}
//                         onChange={(e) => setUrl(e.target.value)}
//                     />
//                 </label>
//                 <label>
//                     <input id="addImageUrl" placeholder="Optional"
//                         type="text"
//                         value={url}
//                         onChange={(e) => setUrl(e.target.value)}
//                     />
//                 </label>
//                 <label>
//                     <input id="addImageUrl" placeholder="Optional"
//                         type="text"
//                         value={url}
//                         onChange={(e) => setUrl(e.target.value)}
//                     />
//                 </label>
//                 <label>
//                     <input id="addImageUrl" placeholder="Optional"
//                         type="text"
//                         value={url}
//                         onChange={(e) => setUrl(e.target.value)}
//                     />
//                 </label>
//                 <div>
//                     <button id="addImageButton" type="submit">Become a host</button>
//                 </div>
//             </form>
//         </div>
//     )
// }


// export default AddImage;
