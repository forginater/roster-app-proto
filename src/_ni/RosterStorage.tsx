import { Category, Roster } from '../Roster';
import react from 'react';
import {useState} from 'react';



    //Define music category
    const codingCat: Category = {
        categoryTitle: "Coding Roster", 
        activities:
        [
            {topic: "Execute Program: Typescript"}, 
            {topic: "Build Medication React App"},
            {topic: "Build Battlefields React App"},
            {topic: "COSC260: Web programming tutorials"},
            {topic: "COSC260: Web programming Assignments"},
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
            {topic: "Open tuning: Gonzalez"},
            {topic: "Technical exercises"},
            {topic: "keys"},
            {topic: "looping: review"},
        ]
    }

    //Roster2 = Coding
    const musicExtraCat: Category = {
        categoryTitle: "Music Extra Roster",
        activities: 
        [
            {topic: "Reading: Bach & Claire de Lune"},
            {topic: "Garage Band"},
            {topic: "Logic"},
            {topic: "Ableton"},
            {topic: "vox scales"},
            {topic: "singing"},
        ]
    };    

    const stats: Category = {
        categoryTitle: "StatsCat",
        activities:
        [
            {topic: "STAT100: Review exercises by hand"},
            {topic: "STAT100: Assignments"},
            {topic: "STAT100: Lecture"},
            {topic: "STAT100: Implement in Python"},
            {topic: "STAT100: Multiple Regression"},
            {topic: "PSYC202: Textbook in Python"},
            {topic: "PSYC202: Assignments implement in Python"},
            {topic: "PSYC372: Lectures"},
            {topic: "PSYC372: Quizzes"},
        ]
    }

    const iOS: Category = {
        categoryTitle: "iOS",
        activities:
        [
            {topic: "Tenuto"},
            {topic: "Anki"},
        ]
    }




//Initialise our roster library
const rosterOrig: Roster = {
    categories:
    [
        musicPrimaryCat,
        musicExtraCat,
        codingCat,
        iOSCodeCat,
    ],
};


//RosterStorage
interface RosterInstance {
    rosterName: string;
    rosterInstance: Roster;
}

interface RosterStorage {
    rosterStorage: RosterInstance[];
}

const rosterOriginal: RosterInstance = {
    rosterName: 'rosterLibraryInit',
    rosterInstance: rosterOrig,
}

const rosterDuplicated: RosterInstance = {
    rosterName: 'dupeRost',
    rosterInstance: rosterOrig,
}

const musicRoster: RosterInstance = {
    rosterName: 'musicRoster',
    rosterInstance: {
        categories:
        [
            musicPrimaryCat,
            musicExtraCat,
        ]
    }
}

const allRosters: RosterStorage = {
    rosterStorage: [rosterOriginal,rosterDuplicated, musicRoster],
}


//getRoster() returns the roster with rosterName property === rosterName argument.
//If no match it returns undefined
export function getRoster(rosterName: string): Roster | undefined {
    let returnRost = undefined;
    for (const rostInst of Object.values(getRosterStorage().rosterStorage)) {
        if (rostInst.rosterName === rosterName) {
            returnRost = rostInst.rosterInstance;
        }
    }
    return returnRost;
    
}

export function getRosterStorage(): RosterStorage {
    return allRosters;
}

//getRosterNames() returns a string[] array of all the rosters contained in ''allRosters' 
export function getRosterNames(): string[] {
    let rosterNames: string[] = []; 
    for (const rosterInst of Object.values(allRosters.rosterStorage)) {
        //rosterNames = [...rosterNames, rosterInst.rosterName];
        rosterNames.push('Type = ' + typeof rosterInst.rosterName + '<<>>');
        rosterNames.push(' Value = ' + rosterInst.rosterName)
        
        console.log("TESTZORINATE",JSON.stringify(rosterInst.rosterName));
        
    }
    return rosterNames;
}

//This function displays the ViewRosterStorage() component
//props: display => whether
//
export function ViewRosterStorage(props: {display: boolean, rosterName: string}) {
    //These hooks are toggled when buttons are pressed in UI and they hide/display 
    //the <RosterStorageTest /> and <DisplayStorage /> components
    const [displayTest,setDisplayLibrary] = useState<boolean>(false);
    const [displayStorage,setDisplayStorage] = useState<boolean>(false);

    return (
        <div className="RosterComponent">
            {/*Display Test Component*/}
            <label>
                ViewTest:
                <input
                    type='button'
                    onClick={(e) => {
                        setDisplayLibrary(!displayTest)
                    }}
                />
            </label>
            <br/>
            {/*If displayTest === true then display RosterStorageTest*/}
            {displayTest
                ? <>
                    RosterStorageTest
                    <RosterStorageTest rosterName={props.rosterName}/>
                </>
                : <></>
            }
                
            {/*If props.display true then display components*/}
            <label>
                ViewRosterStorage
                <input 
                    type='button'
                    onClick={(e) => {
                        setDisplayStorage(!displayStorage)
                    }}
                />
            </label>
            {displayStorage
                ? <>
                    <hr/>
                    RosterStorage
                    <br/>
                    <DisplayRosters />
                </>
                : <></>
            }
        </div>
    )
}

function RosterStorageTest(props: {rosterName: string}) {
    return (
        <>
            BLaBlor:{getRosterNames()}
            <br/>
            {JSON.stringify(getRoster(props.rosterName))}
            {/*JSON.stringify(getRosterStorage())*/}
        </>
    )
}

function DisplayRosters(props: any) {
    return (
        <>
            <ul>

                <label>
                    <input
                        type="radio"
                        value="RosterVarvo"
                        onChange={(e) =>{
                            console.log(e.target.value);
                        }}
                    />
                </label>
            </ul>
        </>
    )
}

/* 
    TO IMPLEMENT:
        - Nested viewing mechanism
        - Ability to click on object and edit (maybe use hover) or delete the object
        - 
    
    HowTo:
        - For each category if select checkbox then activities will appear
*/



getRosterNames();

//export default roster_Storage;