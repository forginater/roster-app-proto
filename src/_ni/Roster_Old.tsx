import React from 'react';
import {useState} from 'react';



/*
    To add to roster
        SCIENCE: (physics, neuro, chem, bio) 
    MATHS:
        -Linear Algebra
        -Calculus textbook
        -Brilliant
        -Discrete Mathematics
        -Python maths textbook
    STATS:
        - python implement (STAT100, PSYC220)   
        - STAT100 questions
    PYTHON: 
        - pythonista projects
        - python cookbook
        - w3
        - MIT course
            
    Computer Coding:
        - COSC260: Tutorials, Assignments, Lectures
        - React Projects
        - React
        - 7 languages: Scala, Clojure, Prolog
        
    Replit Coding:
        - Learn Haskell for great good: Replit
        - SICP in [javascript, scheme]
        - Bash (O-Reilly book)
*/

/*
    Properties to add later:
    History: like in Sudoku, allows me to track amount of time spent doing things
    Also weight 
*/

interface Rosters {
    rosterCategories: Roster[];
}

interface Roster {
    category: string;
    activities: Activity[];
}

interface Activity {
    topic: string;
    //tags: Tag[];

}

interface Tag {
    tag: string;
    /* 
        //Tag: string
        //Eg compatible with pain, Can be done on phone, Can be done while walking, Possible while tired/inebriated
        //High priority vs secondary priority
    */    
}

export function Roster_Old() {

    /*
        INITIALISE OUR ROSTERS
    */

    //Consider using a Record/Map object thing for identifying (Check Kane Code)

    //Roster[] =

    //Roster1 = Music
    const musicRoster: Roster = {
        category: "Music Roster: ", 
        activities:
        [
            {topic: "Execute Program: Typescript"}, 
            {topic: "Build Medication React App"},
            {topic: "Build Battlefields React App"},
            {topic: "COSC260: Web programming tutorials"},
        ]
    };

    //Roster2 = Coding
    const codingRoster: Roster = {
        category: "Coding Roster: ",
        activities: 
        [
            {topic: "Jazz"},
            {topic: "Open tuning: Gonzalez"},
            {topic: "Reading: Bach"},
            {topic: "Gazza"},
            {topic: "Ableton"},
            {topic: "vox scales"},
            {topic: "singing"},
        ]
    };
    
    const rosters_data: Rosters = {
        rosterCategories: 
        [
            musicRoster,
            codingRoster,
        ],
    };
    

    /* 
        INITIALISE useState HOOKS
    */
   const [rostersState, setRosters] = useState<Rosters>(rosters_data);
    


    /*Our return JSX.Element*/
    return (
        <div className="App">
            <h1>Roster</h1>
            <h3>Testing Purposes</h3>

            <ViewRoster rosterProp={getRosterFunc(rostersState,0)} />

            {/*TESTING*/}
            <PrintJSON strInput={JSON.stringify(rosters_data,null,4).toString()} />
            {/*
            This is how you check a type directly in React
             <p>{(typeof JSON.stringify(rosters_data,null,4).toString())}</p>
            */}
           
        </div>
    );
};

//This function allows us to extract a roster based on its index
const getRosterFunc = (rostersVar: Rosters, index: number): Roster => {
    return rostersVar.rosterCategories[index];
 };



//View a Roster 
function ViewRoster(props: any) {
    return (
        <div>
            <h3>
                ViewRoster Component:
                {props.rosterProp}
            </h3>
        </div>
    )
};

//View Programming Category
function ViewCodingRoster(props: any) {
    return (
        <></>
    )
};

//Print JSON overview of Roster State
function PrintJSON(props: any) {
    return (
        <>
            {props.strInput}
        </>
    )
}

//Print Roster with randomly selected activities for x number of minutes
//Eg 2 * Music Activities for 15m each + 1 * programming activities for 30m

//Later: 