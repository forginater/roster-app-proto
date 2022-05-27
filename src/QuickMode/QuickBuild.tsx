import {useState} from 'react';
import { getRandActivities } from '../GetViews';
import { MultiSelections, QuickSelections } from '../Roster';
import '../Roster.css';

/*
 Should be able to use preexisting RosterView etc. 
 Just need a function component to quickly enter a roster, 
 save the data somehow and pass it to <Roster /> Where it can be turned into appropriate data structure by getViews(). 

 use RosterEnterProps so we can use the same hook set function 

 In QuickBuild, we only need 1 category then we set number of activities and duration
*/

//setSelections take an argument of QuickSelections which is an object {quickSelections: RosterSelection}
interface QuickBuildProps {
    setSelections: (s: QuickSelections) => void;
    minimise: boolean;
}

interface QuickBuildRoster {
    activities: string[];
    numActivities: number;
    activityDuration: number;
}

const quickBuildRosterInit = {
    activities: [],
    numActivities: 0,
    activityDuration: 0,
}

export function QuickBuild(props: QuickBuildProps) {
    const [minimise, setMinimise] = useState<boolean>(false);
    const [quickRoster,setQuickRoster] = useState<QuickBuildRoster>(quickBuildRosterInit);
    //setMinimise(!minimise);

    
        //console.log("QuickBuild: minimise = false")
        return ( 
            <div className="RosterComponent">
                {/*Button to toggle minimise hook: NOT IMPLEMENTED*/}
                <label>
                    <input 
                        type="button"
                        value="Minimise"
                        onClick={() => {
                            setMinimise(!minimise);
                        }}
                    />
                </label>
                <h3>QuickBuild</h3>
                <AddActivities />
                <AddActivity 
                    addActivityFunc={(newActivity: string) => {
                        setQuickRoster({
                            ...quickRoster,
                            activities: [...quickRoster.activities, newActivity],
                        })
                    }}
                />
                <DisplayQuickActivities activities={quickRoster.activities}/>
                <DeleteSelected />
                <br /><br />
                <EnterFields 
                    setNum={(numActivities: number) => {
                        setQuickRoster({
                            ...quickRoster,
                            numActivities: numActivities,
                        })
                    }}
                    setDuration={(activityDuration: number) => {
                        setQuickRoster({
                            ...quickRoster,
                            activityDuration: activityDuration,
                        })
                    }}
                />
                <SubmitQuickBuild 
                    setSelections={props.setSelections}
                    quickRoster={quickRoster}
                />

                <p>View quickRoster State: </p>
                <p>{JSON.stringify(quickRoster,null,4)}</p>
                


            </div>
        );
    
}


function AddActivities(props: any) {
    return( 
    <div></div>
    )
}

//This allows the user to add activities to QuickBuildRoster: input activity name into text field then click submit button
function AddActivity(props: {addActivityFunc: (s: string) => void}) {
    const [activityField,setActivityField] = useState<string>("");
    return (
        <div>
            
            <label>
                Add Activity
                <input 
                    type="text"
                    value={activityField}
                    onChange={(e) => {
                        //console.log("AddActivity onChange() function called:")
                        setActivityField(e.target.value);
                    }}
                />
            </label>
            <input 
                type="button"
                value="Submit"
                onClick={(e) => {
                    //console.log("Submit Button onChange() called:");
                    props.addActivityFunc(activityField)
                    setActivityField("");
                }}
            />
        </div>
    );
}


//Display the activities that have been entered into QuickBuildRoster in a checkbox
function DisplayQuickActivities(props: {activities: string[]}) {
    return (
        <div>
            <h5>Activities Selected:</h5>
            <div>
                {props.activities.map((activity,index) => <DisplayQuickActivity activity={activity} index={index}/>)}
            </div>
            

            {/*Delete selected activities button:*/}
            <label>
                <input 
                    type="button"
                    value="Delete Selected:"
                    onClick={(e) => {console.log("Delete Button Clicked!!")}}
                />
                
            </label>


        </div>
    )
}

//Render each individual activity from quickRoster

function DisplayQuickActivity(props: {activity: string, index: number}) {
    return (
        <>
            <label>
            <input
                type="checkbox"
                value={props.activity}
                id={props.index.toString()}
                name={"name"}
                onChange={(e) => {
                    console.log("CheckBox event occuring at onChange():");
                }}
            />
            
            {props.activity}
            </label>
            <br />
        </>
    )
}

//Delete the selected activities from quickRoster
function DeleteSelected(props: any) {
    return (
        <></>
    )
}

//Input the numActivities and activityDuration to be used in generating a roster timetable using this quickRoster
function EnterFields(props: {setNum: (numActivities: number) => void, setDuration: (duration: number) => void}) {
    const [numActivitiesField,setNumActivitiesField] = useState<number>();
    const [durationField,setDurationField] = useState<number>();
    return (
        <div>
            <label>
                numActivities:
                <input 
                    type='number'
                    value={numActivitiesField || 0}
                    onChange={(e) => {
                        console.log("numActivitiesField onChange():");
                        setNumActivitiesField(parseInt(e.target.value))
                        parseInt(e.target.value)
                        ? props.setNum(parseInt(e.target.value))
                        : console.log("Error: Enter valid number into QuickBuild numActivitiesField: ");
                        

                    }}
                />
            </label>
            <br />
            <label>
                activityDuration:
                <input 
                    type="number"
                    value={durationField || 0}
                    onChange={(e) => {
                        setDurationField(parseInt(e.target.value))
                        parseInt(e.target.value)
                        ? props.setDuration(parseInt(e.target.value))
                        : console.log("Error: Enter valid number into QuickBuild activityDuration: ");
                    }}

                />
            </label>
            <br />

        </div>
    )
}


function SubmitQuickBuild(props: {setSelections: (quickSelections: QuickSelections) => void, quickRoster: QuickBuildRoster}) {
    return (
        <div>
            <input 
                type="button"
                value="SubmitQuickRoster"    
                onClick={(e) => {
                    //Get local copy of quickRoster (Dunno about stale data), might not be an issue now as this component isn't changing quickRoster
                    //But if we call this from elsewhere same step as updating the quickRoster hook might cause some issue
                    const localQuickBuildRoster = JSON.parse(JSON.stringify(props.quickRoster));
                    //destructure activities, numActivities & activityDuration
                    const {activities : activitiesDestruct, numActivities: numDestruct, activityDuration: durationDesctruct} = localQuickBuildRoster;
                    
                    const returnQuickSelections: QuickSelections = {
                        category: { //Category 
                            categoryTitle: "QuickBuild", //string
                            activities: activitiesDestruct.map((activity: string) => {return {topic: activity}}), //Activity[] <=> topic: string[]
                        },
                        quickSelections: { //RosterSelection
                            categorySelected: "QuickBuild",
                            numActivities: numDestruct,
                            activityDuration: durationDesctruct,
                        }
                
                    };
                    props.setSelections(returnQuickSelections)
                    console.log("returnQuickSelections Array: \n",JSON.stringify(returnQuickSelections,null,4));

                    //Need to convert quickRoster.activities into 
                    //Array of Activity[].... [{topic: '1'},{topic:'blabla'}]
                    //in QuickBuild we have array of strings... we need to convert to array of Activity Objects {topic: string}
                }}
            />
        </div>
    )
}

