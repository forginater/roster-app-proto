import {useState} from 'react';
import { CategoryView } from "./Roster";

/* 
    RosterView() component:
        - props: Categories
        - Select categories: (start with 1)
        - select ynumber of activities for the given category
        - select length (minutes) per activity
*/



export function RosterView(props: {views: CategoryView[]}) {
    const [rosterGenerated,setRosterGenerated] = useState<boolean>(true);
    return (
        <div className="RosterComponentBottom">

            <h2>Roster Result</h2>
            {/*If button clicked rosterGenerated hook set to 'true' and <RenderCategories /> called*/}
            <label>
                <input 
                    type="button"
                    value="Generate Roster"
                    onClick={(e) => {
                        setRosterGenerated(true);
                    }}
                />
            </label>
            
            {rosterGenerated
                ? <RenderCategories views={props.views} /> 
                : <>{console.log()}</>
            }

            
        </div>
    )
    
}

//Map all categories
function RenderCategories(props: {views: CategoryView[]}) {
    return (
        <>
            <ul>
                {props.views.map((view) => <RenderCategory view={view}/>)}
            </ul>

        </>
    )
}

function RenderCategory(props: {view: CategoryView}) {
    //<li>Activity Number [x]: props.categoryView.</li>
    return (
        <>
            <h5>{props.view.title}</h5>
            <RenderActivities activitiesSelected={props.view.activitiesSelected} length={props.view.length}/>
        </>
    )
}

function RenderActivities(props: {activitiesSelected: string[], length: number}) {
    return (
        <>

            {props.activitiesSelected.map((activity) => 
            <li>
                {activity} {props.length}m
            </li>)}
        </>
    )

}