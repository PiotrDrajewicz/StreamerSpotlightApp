import { useState, useEffect } from 'react';
import Alert from './Alert';
import StreamerItem from './StreamerItem';
import { getStreamers, postStreamer } from '../functions/streamersDatabaseFunctions';

//Placeholder photo
const streamerPhotoUrl = 'https://static-cdn.jtvnw.net/jtv_user_pictures/asmongold-profile_image-f7ddcbd0332f5d28-300x300.png';
const initialValues = {name: "", platform: "", description: "", upVotes: 0, downVotes: 0, photo: streamerPhotoUrl};

const StreamersFormList = () => {
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isStreamerSubmitted, setIsStreamerSubmitted] = useState(false);
    const [alert, setAlert] = useState({show: false, type: '', message: ''});
    const [listOfStreamers, setListOfStreamers] = useState([]);
    const [listLength, setListLength] = useState(1);

    //form fields validation
    const validateFormFields = (inspectedObject) => {
        const errors = {};
        if (!inspectedObject.name) {
            errors.name = "Please enter name";
        }
        if (!inspectedObject.platform) {
            errors.platform = "Please enter platform";
        }
        if (!inspectedObject.description) {
            errors.description = "Please enter description";
        }
        return errors;
    }
    
    //handle data provided by user
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({...formValues, [name]: value});
    }
    
    //handle submitting the form
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validateFormFields(formValues));
        setIsStreamerSubmitted(true);
    }

    //show the event alert
    const showAlert = (show = false, type = '', message = '') => {
        setAlert({show, type, message});
    }


    useEffect(() => {
        //submit streamer if everything is correct
        if (Object.keys(formErrors).length === 0 && isStreamerSubmitted) {
            postStreamer(formValues);
            setListLength(prev => prev + 1);
            setListOfStreamers([...listOfStreamers, {...formValues, id: listLength + 1}]);
            showAlert(true, 'positive', 'Streamer added');
            setFormValues({name: "",platform: "" , description: "", upVotes: 0, downVotes: 0, photo: streamerPhotoUrl});
        }
        //invalid data provided
        if (Object.keys(formErrors).length !== 0 && isStreamerSubmitted) {
            console.log('errors: ', formErrors);
        }
    }, [formErrors])

    useEffect(() => {
        getStreamers(setListOfStreamers, setListLength);
    }, [])

    return (
        <>
            <section className="form-section">
                <div className='alert-container'>
                    {alert.show && <Alert {...alert} removeAlert={showAlert} />}
                </div>
                <form className="form" onSubmit={handleSubmit}>
                    <div className="form-fields">
                        <div className='field-container'>
                            <p className={`error-message ${formErrors.name ? 'show' : ''}`}>{formErrors.name}</p>
                            <label id="name-label" htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" placeholder="Enter streamer's name here" value={formValues.name} onChange={handleChange}></input>
                        </div>
                        <div className="select-container field-container">
                            <p className={`error-message ${formErrors.platform ? 'show' : ''}`}>{formErrors.platform}</p>
                            <label id="platform-label" htmlFor="platform">Platform</label>
                            <select name='platform' value={formValues.platform} onChange={handleChange}>
                                <option hidden>Select streamer's platform</option>
                                <option value='Twitch'>Twitch</option>
                                <option value='YouTube'>YouTube</option>
                                <option value='TikTok'>TikTok</option>
                                <option value='Kick'>Kick</option>
                                <option value='Rumble'>Rumble</option>
                            </select>
                        </div>
                        <div className='field-container'>
                            <p className={`error-message ${formErrors.description ? 'show' : ''}`}>{formErrors.description}</p>
                            <label id="description-label" htmlFor="description">Description</label>
                            <input type="text" id="description" name="description" placeholder="Enter streamer's description here" value={formValues.description} onChange={handleChange}></input>
                        </div>
                        <button type="submit">Add Streamer</button>
                    </div>
                </form>
            </section>
            <section className='streamers-section'>
                <div className='streamers-container'>
                    {listOfStreamers.map((streamer) => {
                        const { id } = streamer;
                        return (
                            <StreamerItem key={id} {...streamer} />
                        )
                    })}
                </div>
            </section>
        </>
    )
}

export default StreamersFormList;