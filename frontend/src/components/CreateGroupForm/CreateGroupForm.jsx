import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { createGroupThunk, getAllGroupsThunk } from "../../store/groups";
import { useNavigate } from "react-router-dom";


export default function CreateGroupForm() {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('')          
    const [isPrivate, setPrivate] = useState('');     
    const [validations, setValidations] = useState({})
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // console.log('type:', type)
    // console.log('private:', isPrivate)

    const groups = useSelector(state => Object.values(state.Groups))
    // console.log(groups, 'GROUPS')
    useEffect(() => {
        dispatch(getAllGroupsThunk())

        const validations = {};

        if(!location) {
            validations.location = 'Location is required'
        }

        if(!name) {
            validations.name = 'Name is required'
        }

        if(description.length < 30) {
            validations.description = 'Description must be at least 30 characters long'
        }

        if(!type) {
            validations.type = 'Group Type is required'
        }

        if(!isPrivate) {
            validations.isPrivate = 'Visibility Type is required'
        }

        setValidations(validations)

    }, [ dispatch, name, description, location, type, isPrivate ])

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true)
        const locationArr = location.split(', ')
        
        const newGroup = {
            name,
            city: locationArr[0],
            state: locationArr[1],
            about: description,
            type,
            isPrivate
        };
        // console.log('NEW_GROUP', newGroup)
        await dispatch(createGroupThunk(newGroup));

        reset();
        // console.log(groups)
        const groupId = groups[groups.length].id
        // console.log('groupId',groupId)
        navigate(`/groups/${groupId}`) 
    // todo: figure out how to redirect to the new page \\
    }

    const reset = () => {
        setName('');
        setLocation('');
        setDescription('');
        setType('')
        setPrivate('')
        setHasSubmitted(false)
        setValidations({})
      };



    return (
        <div>
            {/* <title>Start a New Group</title>
        <p>BECOME AN ORGANIZER</p>
        <h1>We&apos;ll walk you through a few steps to build your local community</h1> */}
        <h1>Start a New Group</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <h1>Set your group&apos;s location</h1>
                <p>Meetup groups meet locally, in person and online. We&apos;ll connect you with people
                    in your area.</p>
                <input
                    type="text"
                    onChange={(e) => setLocation(e.target.value)}
                    value={location}
                    placeholder="City, STATE"
                    name="location"
                />
            </div>
                {/* Validation err's go here */}
                {hasSubmitted && validations.location && `*${validations.location}`}
            <div>
                <h1>What will your group&apos;s name be?</h1>
                <p>Choose a name that will give people a clear idea of what the group is about. </p>
                <p>Feel free to get creative! You can edit this later if you change your mind</p>
                <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder="What is your group name?"
                    name="name"
                />
            </div>
            {hasSubmitted && validations.name && `*${validations.name}`}
            <div>
                <h1>Describe the purpose of your group</h1>
                <p>People will see this when we promote your group, but you&apos;ll be able to add to it later, too.</p>
                <ol>
                    <li>What&apos;s the purpose of the group? </li>
                    <li>Who should join?</li>
                    <li>What will you do at your events?</li>
                </ol>
                <textarea
                    // type="textarea"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    placeholder="Please write at least 30 characters"
                    name="description"
                />
            </div>
            {hasSubmitted && validations.description && `*${validations.description}`}
            <div>
                <h1>Final steps...</h1>
                <p>Is this an in person or online group?</p>
                <select onChange={(e) => setType(e.target.value)}>
                    <option defaultValue="" selected disabled hidden>(select one)</option>
                    <option value={'Online'} >Online</option>
                    <option value={'In person'} >In-Person</option>
                </select>
                {hasSubmitted && validations.type && `*${validations.type}`}
                <p>Is this group private or public?</p>
                <select onChange={(e) => setPrivate(e.target.value)}>
                    <option value="" selected disabled hidden>(select one)</option>
                    <option value={true} >Private</option>
                    <option value={false} >Public</option>
                </select>
                {hasSubmitted && validations.isPrivate && `*${validations.isPrivate}`}
                <p>Please add an image url for your group below:</p>
                <input placeholder="Image Url"/> 
            </div>
            <button type="submit">Create group</button>
        </form>
        </div>
    )
}