import { NavLink } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllGroupsThunk } from '../../store/groups';
import GroupDetailsHeading from './GroupDetailComponents/GroupDetailsHeading';
import Details from './GroupDetailComponents/Details';
import './GroupDetails.css'

export default function GroupDetails( ) {
    const { groupId } = useParams();
    const dispatch = useDispatch();
    const groups = useSelector(state => state.Groups ? Object.values(state.Groups) : null)
    // todo: cannot read property of null reading Groups
    const group = groups.find(group => groupId == group.id)
    console.log(groups)
    // console.log(group)

    // if(!group) return null;


    useEffect(() => {
        dispatch(getAllGroupsThunk())
    }, [ dispatch ])


    const qtCarrot = '<'
    // todo: dynamic portion <button>
    // todo: UpcomingEvents
    return (
        <div>
        <NavLink to='/groups'>{qtCarrot} Groups</NavLink>
        <GroupDetailsHeading group={group}/>
        <Details group={group}/>
        {/* <UpcomingEvents /> */}
        </div>
    )
}