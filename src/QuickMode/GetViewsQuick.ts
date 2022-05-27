import { CategoryView, QuickSelections, QuickView } from "../Roster";



export function getViewsFromQuick(quickBuild: QuickSelections) {
    const numActivities = quickBuild.quickSelections.numActivities;
    //activityList contains all activities entered in QuickBuild. Uses map to extract the string title from each 'Activity' object
    const activityList: string[] = quickBuild.category.activities.map((activity) => {
        return activity.topic;
    })
    const quickView: QuickView = {
        activitiesSelected: getRanActivitiesQuick(numActivities,activityList),
        activityDuration: quickBuild.quickSelections.activityDuration,
    }
    return quickView;
    
}

//getViewsFromQuickBuild() 
//FUNCTION: takes a QuickSelections Object from <QuickBuild > mode and outputs it as a CategoryView[] 
//PURPOSE: This function used in <Roster> to pass compatible data structure to <GetViews>
//Dependencies: uses getRanActivitiesQuick(), getCategoryViewQuick() & genRandInclusiveRange()
export function getCategoryViewsFromQuick(quickBuild: QuickSelections):CategoryView[] {
    const numActivities = quickBuild.quickSelections.numActivities;
    const activityDuration = quickBuild.quickSelections.activityDuration;
    //activityList contains all activities entered in QuickBuild. Uses map to extract the string title from each 'Activity' object
    const activityList: string[] = quickBuild.category.activities.map((activity) => {
        return activity.topic;
    })
    //generate sequence of random activities from activityList
    const randActivities: string[] = getRanActivitiesQuick(numActivities,activityList);
    //Convert to categoryView[] array: For each activity in randActivities make a CategoryView object with
    const categoriesView = getCategoryViewQuick(randActivities,activityDuration);
    return categoriesView;
}



//getCategoryViewQuick() takes a string[] of selected activities and converts them to CategoryView[]
function getCategoryViewQuick(randActivities: string[], activityDuration: number): CategoryView[] {
    let buildFromFor: CategoryView = {
        title:"QuickBuild",
        activitiesSelected: randActivities,
        length: activityDuration,
    };
    //Return wrapped in array
    return [buildFromFor];

}

//getRanActivitiesQuick() randomly selects an activity from 'activityList'... 'numActivities' times.
function getRanActivitiesQuick(numActivities: number, activityList: string[]): string[] {
    let counter = 0;
    let randActivities: string[] = [];
    //Get a random activity numActivities times
    while (counter < numActivities) {
        //Get randomIndex in range
        const randomIndex = genRandInclusiveRange(0,activityList.length);
        //Grab the randomly selected activity corresponding to the randomIndex
        const activityToAdd = activityList[randomIndex];
        //Add the randomly selected activity to randActivities
        randActivities = [...randActivities,activityToAdd];
        counter += 1;
    }
    console.log(">>>>>RandActivities = ",randActivities);
    return randActivities;
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


    /*
    export interface CategoryView {
        title: string;
        activitiesSelected: string[];
        length: number;
    }

    export interface QuickSelections {
    category: Category;
    quickSelections: RosterSelection
    }

    export interface Category {
    categoryTitle: string;
    activities: Activity[];
    }

    export interface RosterSelection {
    categorySelected: string;
    numActivities: number;
    activityDuration: number;
    }


    */


