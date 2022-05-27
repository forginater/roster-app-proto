import {useState} from 'react';
import {QuickView} from '../Roster';
import '../Roster.css';

/* 
    PURPOSE of ROSTERVIEWQUICK 
    so we can directly pass activityList, & duration 
    to be rendered in <RosterViewQuick> 
    instead of <RosterView> which takes a CategoryView[] Object
*/

//Ideally, the instruction to render Roster will come from submit QuickRoster

interface RosterViewQuickProps {
    views: QuickView;
}


export function RosterViewQuick(props: RosterViewQuickProps) {
    const [rosterGenerated,setRosterGenerated] = useState<boolean>(false);
    return (
        <div className="RosterComponentBottom">
            <h2>RosterViewQuick</h2>
            <RenderRoster views={props.views}/>
            

        </div>
    )
}

function RenderRoster(props: RosterViewQuickProps) {
    console.log("OBJECT PASSED TO RENDER ROSTER: ",JSON.stringify(props.views,null,4));
    return (
        <>
            <h5>ActivityDuration: {props.views.activityDuration} min</h5>
            <ul>
                {props.views.activitiesSelected.map((activity) => <RenderActivity activity={activity}/>)}
            </ul>
        </>
    )
}

function RenderActivity(props: {activity: string}) {
    return (
        <>
            <li>
                {props.activity}
            </li>
        </>
    )
}
