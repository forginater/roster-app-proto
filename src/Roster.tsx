import React from 'react';
import {useState} from 'react';
import { RosterEnter } from './RosterEnter';
import { RosterView } from './RosterView';
import { RosterEnterMulti } from './RosterEnterMulti';
import {DisplayState, DisplayStates} from './Auxiliary';
import {getViews,getRandActivities,getMatchingActivities,genRandInclusiveRange} from './GetViews';
import './Roster.css';
import { getRoster, ViewRosterStorage } from './_ni/RosterStorage';
import { QuickBuild } from './QuickMode/QuickBuild';
import {RosterViewQuick} from './QuickMode/RosterViewQuick';

import { SelectionModeToggle } from './SelectionModeToggle';
import { getCategoryViewsFromQuick, getViewsFromQuick} from './QuickMode/GetViewsQuick';





//>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<
//BASIC INTERFACES
//>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<
export interface Roster {
    categories: Category[];
}

export interface Category {
    categoryTitle: string;
    activities: Activity[];
}

export interface Activity {
    topic: string;
    //tags: Tag[];
}

/*START INTERFACES NOT IMPLEMENTED*/
//>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<
export interface ActivityTagged extends Activity {
    tags: Tag[];
}

//'Tag' type includes a list of descriptors of an activity that can be used to filter.
//For example if I'm in pain, I can filter by "Bed" and only activities that can be done in 
//Bed will be selected
type Tag = "iOS" | "Pain" | "Walking" | "Bed";
//>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<
/*END INTERFACES NOT IMPLEMENTED*/

//>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<
//ROSTER LIBRARY INTERFACES
//>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<
export interface RosterState {
    //Library of all available activities sorted into categories
    rosterLibrary: Roster;
    rosterSelection: RosterSelection;

}

//>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<
//SELECTION INTERFACES
//>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<
//Settings obtained from RosterEnter() for one particular category
export interface RosterSelection {
    categorySelected: string;
    numActivities: number;
    activityDuration: number;
}

export interface SelectionsArr {
    selectionsArr: RosterSelection[];
}


//MultiSelections is the same as 'SelectionsArr' except Roster.tsx pipes data from <RosterEnterMulti> 
//into this before adding it to SelectionsArr
//*MULTI*
export interface MultiSelections { 
    selectionsArr: RosterSelection[];
}

//Quick Selections is for roster passed in from <QuickByuild />
//This will need to be converted into an object that implements 'RosterSelection' to run random selection algorithm
export interface QuickSelectionsOld {
    quickSelections: RosterSelection;
    // {categoryTitle: ‘quickBuild’, activities: Activity[]}.... Activity {topic: string}
}

export interface QuickSelections {
    category: Category;
    quickSelections: RosterSelection
}


//>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<
//GENERATE ROSTER INTERFACES: pass to <RosterView />
//>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<
//CategoryView includes the roster generated for one category
//Generated from rosterData and sent to RosterView to display to user
export interface CategoryView {
    title: string;
    activitiesSelected: string[];
    length: number;
}

export interface QuickView {
    activitiesSelected: string[],
    activityDuration: number,
}






/*
    Roster() Parent component 
    - stores database information about activities
    -defines the state needed to be shared between: 
        RosterEnter
        RosterView 
        & rosterLibrary database
    -It get's user request for roster from RosterEnter
    -Renders the output into RosterView
    **Implement later**
    -methods to add & remove items from the rosterLibrary
*/
export function Roster() {


    //Define music category
    const codingCat: Category = {
        categoryTitle: "Coding Roster", 
        activities:
        [
            {topic: "Execute Program: Typescript"}, 
            {topic: "Build Medication React App"},
            {topic: "Build Battlefields React App"},
            {topic: "COSC260: Web programming tutorials"},
            {topic: "COSC260: Web programming tutorials"},
        ]
    };

    const iOSCodeCat: Category = {
        categoryTitle: 'iOS Coding Roster',
        activities:
        [
            {topic: "pythonista"},
            {topic: "play.js"},
            {topic: "Read: w3schools or js tutorials.net"},
            {topic: "Lectures: COSC260 or Crockford"}
        ]
    };

    const musicPrimaryCat: Category = {
        categoryTitle: "Music Primary Roster",
        activities:
        [
            {topic: "Jazz Review"},
            {topic: "Jazz New"},
            {topic: "Technical exercises"},
            {topic: "keys"},
        ]
    }

    //Roster2 = Coding
    const musicExtraCat: Category = {
        categoryTitle: "Music Extra Roster",
        activities: 
        [
            {topic: "Open tuning: Gonzalez"},
            {topic: "Reading: Bach"},
            {topic: "Gazza"},
            {topic: "Ableton"},
            {topic: "vox scales"},
            {topic: "singing"},
        ]
    };    

    //Initialise our roster library
    const rosterLibraryInitInternal: Roster = {
        categories: 
        [
            musicPrimaryCat,
            musicExtraCat,
            codingCat,
            iOSCodeCat,
        ],
    };


    //If no valid match to pull from RosterStorage then just use rosterLibraryInitInternal
    let rosterLibraryInit: Roster;
    //const importRost = getRoster('rosterOriginal') 
    const importRost = getRoster('rosterOriginal') 
    if (importRost !== undefined) {
        rosterLibraryInit = Object.assign(importRost);
        
    }
    else {
        rosterLibraryInit = rosterLibraryInitInternal
    }
    
    //= getRoster('rosterOriginal');

    //Initialise rosterSelection
    const rosterSelectionInit: RosterSelection = {
        categorySelected: "",
        numActivities: 0,
        activityDuration: 0,
    }

    const selectionsArrInit: SelectionsArr = {
        selectionsArr: [rosterSelectionInit],
    }

    //Initialise RosterState
    const rosterStateInit: RosterState = {
        rosterLibrary: rosterLibraryInit,
        rosterSelection: rosterSelectionInit,
    }

    //*MULTI*Initialise MultiSelections
    const multiSelectionsInit: MultiSelections = {
        selectionsArr: [rosterSelectionInit],
    }

    //Initialise quickSelections initial state
    const quickSelectionsInit: QuickSelections = {
        category: {
            categoryTitle: "QuickBuild",
            activities: [],
        },
        quickSelections: {
            categorySelected: "QuickBuild",
            numActivities: 0,
            activityDuration: 0,
        }
    }
    
    //Initialise hooks
    //We can delete this soon unless it breaks something or maybe will need it later
    //const [rosterState,setRosterState] = useState<RosterState>(rosterStateInit); 
    //Stores the state of the Roster database
    const [rosterData,setRosterData] = useState<Roster>(rosterLibraryInit);
    //Stores information gathered from RosterEnter for a given category
    const [rosterSelection,setRosterSelection] = useState<RosterSelection>(rosterSelectionInit);
    //Stores information for each rosterSelection inputted into RosterSelection()
    const [selectionsHook,setSelectionsHook] = useState<SelectionsArr|undefined>(undefined);
    ////*MULTI* Stores selections passed from <RosterEnterMulti />
    const [multiSelections,setMultiSelections] = useState<MultiSelections>(multiSelectionsInit);
    //*QuickBuild* selections stores information inputted from <QuickBuild />
    const [quickSelections,setQuickSelections] = useState<QuickSelections>(quickSelectionsInit);

    //Toggle for switching between RosterEnterMulti & QuickBuild
    const [selectionMode,setSelectionMode] = useState<string>('QuickBuild');
    
    //hook toggle for rosterModify Window
    const [storageSelect,setStorageSelect] = useState<string>('default');

    //This appends a rosterSelection to SelectionsArr then clears original rosterSelections
    //Used for selection from <RosterEnter />
    function updateSelectionsArr(newCategory: string, newNumActivities:number,newActivityDuration:number) {
        let newRosterSelection: RosterSelection = {
            categorySelected: newCategory,
            numActivities: newNumActivities,
            activityDuration: newActivityDuration,
        }
        //If selectionsHook hasn't been used yet it will be undefined
        if (selectionsHook === undefined) {
            setSelectionsHook({
                selectionsArr: [newRosterSelection],
            })
        }
        //If a selection(s) have been made just append it
        else {
            console.log("CALLED: FALSE UPDATING");
            let newSelectionsArr = [...selectionsHook.selectionsArr.slice(),newRosterSelection];
            setSelectionsHook({selectionsArr:newSelectionsArr});
        }


    }

    //getCategoriesFromRoster() extracts a string[] of all categories in rosterData
    function getCategoriesFromRoster(rosterData: Roster): string[]  {
        let strArr: string[] = [];
        rosterData.categories.map((category) => {
            strArr = [...strArr.slice(),category.categoryTitle]
        })
        return strArr;
    }


    //This has the old function component for <RosterEnter ... />
    const rosterEnterOld: JSX.Element = <RosterEnter 
    categories={getCategoriesFromRoster(rosterData)/*['cat1','cat2']*/} 
    //update rosterSelection after clicking submit
    setSelection={(newCategory: string, newNumActivities:number,newActivityDuration:number) => {
        console.log("Test: setRosterSelection function called:")
        //debugger;
        setRosterSelection({
            ...rosterSelection,
            categorySelected: newCategory,
            numActivities: newNumActivities,
            activityDuration: newActivityDuration,
        })
        updateSelectionsArr(newCategory,newNumActivities,newActivityDuration);
        
    }}
    />

    //Destructure rosterSelection for RosterEnter() props
    //const [rosterLibrary,numActivities,activityDuration]: RosterSelection = rosterState.rosterLibrary;
    //console.table(rosterState);
    return (
        <div className="Roster">
            <header className="Roster-header">
            <ViewRosterStorage display={true} rosterName={'rosterOriginal'} />
            
            <h1>Rosterz app.... or whatever!!</h1>


            <SelectionModeToggle 
                toggleFunc={(newMode: string) => {
                    setSelectionMode(newMode)
                }}
            />

            {/*Conditionally render roster entry & roster result components based on selectionMode [QuickBuildMode or RosterEnterMulti] */}
            {selectionMode === "QuickBuild" &&
                <QuickBuild 
                    minimise={false}
                    setSelections={(quickSelectionsArg: QuickSelections) => {
                        //categorySelected: string, numActivities: number, activityDuration:number
                        console.log("Test: QuickBuild setSelections called:");
                        setQuickSelections({
                            ...quickSelectionsArg
                        })
                    }} 
                />
            }

            {selectionMode ==="RosterEnterMulti" &&
                <RosterEnterMulti 
                    categories={getCategoriesFromRoster(rosterData)} 
                    setSelections={(multiSelections: MultiSelections) => {
                        //categorySelected: string, numActivities: number, activityDuration:number
                        console.log("Test: RosterEnterMulti Submission made:");
                        setMultiSelections({
                            ...multiSelections 
                        })
                    }} 
                />

            }


            {selectionMode === "RosterEnterMulti" &&
                <RosterView views={getViews(rosterData,multiSelections)}/>
            }
            {selectionMode === "QuickBuild" &&
                <RosterViewQuick 
                    views={getViewsFromQuick(quickSelections)}
                />                
            }

            



            <div></div>
            

            <ViewEnterState display={false} multiSelections={multiSelections} rosterData={rosterData} />
            {/*{'>>>\n'} JSON.stringify(getViews(rosterData,selectionsHook))*/}
            {/*<RosterView views={getCategoryViewsFromQuick(quickSelections)}/>*/}
            
            
            

            
            
            
            
            {/*
                <h5>RosterState</h5>
                <ViewRosterState rosterSelection={rosterSelection} rosterData={rosterData}/> 
            */}
            
       
            </header>
        </div>
    )
}



//If display === 'true' render RosterEnter() State
 function ViewEnterState(props: {display: boolean, multiSelections: MultiSelections, rosterData: Roster}) {

    return (
        <>
        {props.display 
            ? <div className="RosterComponent">
                <DisplayState condition={true} valueToDisplay={{multiSelections: [props.multiSelections]}} />
                <br /><br />
                getViewsFromMulti(): 
                <br />
                <DisplayState condition={true} valueToDisplay={JSON.stringify(getViews(props.rosterData,props.multiSelections))} />
            </div>  
            : <></>
        }
        </>
     
    )
 }



//Prints state information to console
function ViewRosterState(props: {rosterData: Roster,rosterSelection: RosterSelection}) {
    return (
        <>
            Click buttons to print state to console:
            <br/>
            <input
                type="button"
                value="rosteLibrary"
                onClick={() => console.table(props.rosterData)}
            />
            <input
                type="button"
                value="rosterSelection"
                onClick={() => console.table(props.rosterSelection)}
            />


        </>
    )
}









    //This adds a of selection to SelectionsArr then clears original rosterSelections
    /*
    function addSelectionToSelectionsArrOLD() {
        console.log("CALLED updateSelectionsArr()")
        let newRosterSelection: RosterSelection = {
            categorySelected: rosterSelection.categorySelected,
            numActivities: rosterSelection.numActivities,
            activityDuration: rosterSelection.activityDuration,
        }
        //If selectionsHook hasn't been used yet
        if (selectionsHook === undefined) {
            //Create roster
            console.log("CALLED: TRUE FIRST TIME");
            
            setSelectionsHook({
                selectionsArr: [newRosterSelection],
            })
        }
        
        else {
            console.log("CALLED: FALSE UPDATING");

            //Make a local copy
            let newSelectionsArr = [...selectionsHook.selectionsArr.slice(),newRosterSelection];
            setSelectionsHook({selectionsArr:newSelectionsArr});
        }


    }
    */







    /*EXTRA THEORY
    Useful tools: Object.keys(rosterData), Object.entries(rosterData), Object.is(val1,val2)
    */