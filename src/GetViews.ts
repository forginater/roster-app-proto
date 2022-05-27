import React from 'react';
import { isConditionalExpression } from 'typescript';
import { CategoryView, MultiSelections, QuickSelections, Roster, RosterSelection, SelectionsArr } from "./Roster";

//This file takes extracts randomly selected activities from 'rosterData' according to 
//user requested 'selectionsHook'
//NOTE: I wrote this on Seroquel so design/readability perhaps not too gre

//Following comment????
//generateCategoriesView() Returns the information that will be rendered by RosterView() component






//>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<
//Following Used in selectionMode === "RosterEnterMulti"
//>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<
//FUNCTION HIERARCHY
//getViews() calls
//  getRandActivities() calls
//      getMatchingActivities()
//    & genRandInclusiveRange
//>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<



//Calls getRandActivities() to get user requested number of activities
export function getViews(rosterData: Roster, selectionsHook: SelectionsArr|undefined): CategoryView[] {
    const dummyCategoriesView: CategoryView[] = 
    [ 
        /*1st*/{title: "DummyCategory1", activitiesSelected: ['jazz','keys'], length: 15},
        /*2nd*/{title: "DummyCategory2", activitiesSelected: ['executeProgram'], length: 20}
    ]
    

    //Check selections have been made <=> rosterSelections != undefined
    if (selectionsHook === undefined) {
        console.log("Tried to call GenerateRoster() before selection(s) were made")
        return dummyCategoriesView
    }
    else {
        //Create new 
        let numSelections = selectionsHook.selectionsArr.length;
        let categoriesView: CategoryView[] = new Array(numSelections);
        //loop through each rosterSelection & For each 'title' in rosterSelections: 
        selectionsHook.selectionsArr.map((selection,index) => {
            //Following for testing purposes
            console.log("title",selection.categorySelected," @index #: ",index)
            //Get Randomly generated activities 
            let randActivities: string[] = getRandActivities(rosterData, selection);
            //Combine each view in a CategoryView[] and return
            categoriesView[index] = {
                title: selection.categorySelected, //string
                activitiesSelected: randActivities, //string[]
                length: selection.activityDuration, //number
            };
        });
        return categoriesView;
    }
}



/*
getRandActivities():
Returns RandActivities requested by getViews() parent function
*/
export function getRandActivities(rosterData: Roster, selection: RosterSelection): string[] {
    //numActivities determines how many activities to generate
    let numActivities: number = selection.numActivities;
    let index = 0;
    let returnArr: string[] = [];//new Array(numActivities);
    //Get the array of activities that belong to the selected category
    let categoryActivities = getMatchingActivities(rosterData, selection.categorySelected);
    while (index < numActivities) {
        //Generate a random number that lies in the range of possible indices of categoryActivities
        let randomIndex: number = genRandInclusiveRange(0,categoryActivities.length);
        //Randomly extract an activity
        let randActivity = categoryActivities[randomIndex];
        //Append activity to return array
        returnArr.push(randActivity)
        index++;
    }
    return returnArr;
}


/*Auxillary functions*/
//getMatchingActivities() called by its parent function getRandActivities()
//GetCategories() returns a string[] with all activities for a particular category 
//contained within rosterState.RosterLibrary
export function getMatchingActivities(rosterData: Roster, categoryTitleArg: string): string[] {
    let matchingActivities: string[] = [];
    const catz = rosterData.categories.map((category) => {
        ////Check if category.categoryTitle is equal to the categoryTitle supplied as argument
        if (category.categoryTitle === categoryTitleArg) { //LHS returns the value, we want key
            //use nested map to append each corresponding activity to matchingActivities string[] array
            category.activities.map((activity) => {
                matchingActivities = [...matchingActivities.slice(),activity.topic]
            });
        } 
    });
    return matchingActivities;
}   

export function genRandInclusiveRange(min: number, max: number) {
    //delta has same magnitude as range but relative to 1
    const delta = max-min; //Maybe need to add 1
      //The Math.random() function returns a floating-point, random          
      //number in the range from 0 (inclusive) up to but not including 1.
      const initialRand = Math.random();
      //Scale random number so it falls within the delta range (relative to 1)
      const randScaled = initialRand * delta;
      //translating by min shifted randShifted so it's in the correct range between min (inclusive) & max (exclusive)
      const randShifted = randScaled + min;
      //floored is rounded down to next integer (so it will be inclusive of both min & max values)
      const floored = Math.floor(randShifted);
      return floored;
}




//>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<
//Following code not used
//>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<

//Only place this was is implemented is <ViewEnterState /> in Roster.tsx
function getViewsFromMulti(rosterData: Roster, multiSelections: MultiSelections) { 
    //Get number of categories selected
    let numCategoriesSelected = multiSelections.selectionsArr.length;
    //declare our return CategoryView[] 
    let categoriesView: CategoryView[] = new Array(numCategoriesSelected);
    let multiSelectionsLocal = {...multiSelections};
    
    let index = 0;
    for (const rosterSelection of multiSelectionsLocal.selectionsArr) {
        console.log("Calling getViewFromMulti() with category: ",rosterSelection);
        //Get random activities from selected categories
        let randActivities: string[] = getRandActivities(rosterData,rosterSelection)
        //Combine each view in a categoryView[] and return
        categoriesView[index] = {
            title: rosterSelection.categorySelected,
            activitiesSelected: randActivities,
            length: rosterSelection.activityDuration,
        };
        index++; //increment index value
    }
    return categoriesView;
}