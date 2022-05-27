import {useState} from 'react';
/* 
    RosterEnter() component:
        - props:
            - Select categories: (start with 1)
            - select ynumber of activities for the given category
            - select length (minutes) per activity

    NOTE: the RosterEnter page will need to be refreshed once for each category selected, 
        the logic of assembling a collection of category preferences will be managed in Roster.tsx
    FIRST IMPLEMENTATION: just 1 category
*/

interface RosterEnterProps {
    categories: string[]
    //We could just pass a setRosterSelection function and avoid having to see any of the above props
    setSelection: (newCategory:string, newNumActivities:number, newActivityDuration:number) => void;
}




export function RosterEnter(props: RosterEnterProps) {
    /* 
        Initialise field HOOKS: 
            Roster() parent component doesn't need to know anything about the field hooks
            Not until press submit, then need to update values in parent component
            This means we may not need to pass through all the props directly
    */
    const [categorySelectedField, setCategorySelectedField] = useState<string>("");
    const [numActivitiesField,setNumActivitiesField] = useState<number>(0);
    const [durationField,setDurationField] = useState<number>(0);
    

    function resetAllFields() {
        setCategorySelectedField("");
        setNumActivitiesField(0);
        setDurationField(0);
    }
    

    return (
        <div className="RosterComponent">
            <h2>RosterEnter Window</h2>
            
            {/*CATEGORY:*/}
            <RenderCategories 
                titles={props.categories} 
                //setCategoryFunc={setCategoryFunc}  
                setCategoryFunc={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setCategorySelectedField(e.target.value)
                }}
            />


            {/*NumActivities*/}
            <label>
                Enter number of activities:
                <input 
                    type="number"
                    value={numActivitiesField}
                    onChange={(e) => {
                        isNaN(parseInt(e.target.value))
                        ? setNumActivitiesField(0)
                        : setNumActivitiesField(parseInt(e.target.value));
                    }}

                />
            </label>

            {/*Length of Activity*/}
            <br/>
            <label>
                Enter activities length (minutes):
                <input 
                    type="number"
                    value={durationField}
                    onChange={(e) => {
                        isNaN(parseInt(e.target.value)) 
                        ? setDurationField(0)
                        : setDurationField(parseInt(e.target.value));
                    }}
                />
            </label>

            {/*Submit Button*/}
            <br/>
            <input 
                type="button"
                value="Submit"
                onClick={(Event) => {
                    props.setSelection(categorySelectedField,numActivitiesField,durationField)
                    resetAllFields();
                    }}
            />

            {/*Values [categorySelectedField,numActivitiesField,durationField] = {JSON.stringify([categorySelectedField,numActivitiesField,durationField],null,4)} */}
            {/*<p>rosterEnter State: {JSON.stringify(props,null,4)}</p>*/}



        
        </div>
    )
}

//RenderCategories() displays each category in RosterEnter()
//  - titles >> each category title
//  - setCategoryFunc >> updates the categorySelectedField useState hook
function RenderCategories(props: {titles: string[], setCategoryFunc: (e: React.ChangeEvent<HTMLInputElement>) => void}) {
    return (
        <div>
            <p>Select a category:</p>
            {props.titles.map((title,index) => 
            <>
                <label>
                {"#" + index}{" " + title}
                </label>
                <input 
                    type="radio"
                    name="RenderCategoriesGroup"
                    value={title}
                    onChange={(e) => {
                        props.setCategoryFunc(e)
                    }}
                />
                
                <br/>
            </>
            )}
        </div>
    )
}

