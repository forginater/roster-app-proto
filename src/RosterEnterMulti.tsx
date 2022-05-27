import {useState} from 'react';
import { MultiSelections, RosterSelection } from './Roster';
import { DisplayState } from './Auxiliary';
import './Roster.css';
/* 
    <RosterEnter />
		PURPOSE: Display each category as a checkbox, when a category is selected 
			numActivities & duration fields are also displayed for that category.
			Upon clicking the 'Submit' button, all selected categories and their input fields will be 
			passed to the <Roster /> component as a 'MultiSelection' object.
			Also includes a button to display state
        
		PROPS:
            - string[] of all categories 
            - setSelection <=> update the selectionsArr hook in Roster.tsx

		HOOKS: 
			- entries: CategoryEntries stores category titles, selected status and input fields for each category.
			- numField & durationField..... <RenderFields /> stores input fields in the hooks for each category selected.
		    - categorySelected contains a boolean which when 'true' displays state of the 'entries' hook
    
		ASSUMPTIONS: 
			(1) <Roster /> updates it's state via 'setSelections' prop which expects data in the 'MultiSelections' format
			(2) getCategoryEntry() function will return undefined if there is no matching value
					=> No implication as it is only called by getNumActivities() & getDurationActivities() which are not called atm.
			(3) 
    BASIC IMPLEMENTATION: 
			-Selection data is stored in the local useState hook '[entries, setEntries]'
*/


//Props passed in from Roster.tsx
interface RosterEnterProps {
    categories: string[]
    setSelections: (s: MultiSelections) => void;
}

//CategoryEntry contains numActivities and duration input fields for each category 
//selected is toggled when a category checkbox is selected => displaying the input fields
interface CategoryEntry {
    category: string;
	selected: boolean
    numActivities: number;
    duration: number;
}

//'CategoryEntries' Array contains a 'CategoryEntry' object for each category passed in from Roster.tsx
interface CategoryEntries {
    categorySelections: CategoryEntry[];
}






export function RosterEnterMulti(props: RosterEnterProps) {

	/* 
        Initialise HOOK
		<=> user selection database
            Roster() parent component doesn't need to know anything about the field hooks
            Not until press submit, then need to update selection values in Roster() via setSelection prop
    */
   const [entries,setEntries] = useState<CategoryEntries>(getEntriesInit(props.categories));

	//getEntriesInit()
	//	Purpose: Build CategoryEntries from props.categories: string[] to initialise our entries useState hook

	
	//getCategoryEntry() returns whichever categoryEntry has a matching 'categoryTitle'
	function getCategoryEntry(categoryTitle:string): CategoryEntry | undefined{
		for (const categoryEntry of Object.values(entries.categorySelections)) {
			if (categoryEntry.category === categoryTitle) {
				return categoryEntry;
			}
			else {
				return undefined;
			}
		}
		
	}

	/*getSTATE FUNCTIONS */
	/*getNumField() and getDurationField return the current value of the input fields for the matching category from entries */
	function getNumActivities(title: string, entries: CategoryEntries): number  {
		let matchingCat = getCategoryEntry(title);
		return matchingCat === undefined 
			? 0
			: matchingCat.numActivities;
	}
	
	function getDurationActivities(title: string, entries: CategoryEntries): number {
		let matchingCat = getCategoryEntry(title);
		return matchingCat === undefined
			? 0
			: matchingCat.duration;
	}


	/*SETSTATE FUNCTIONS*/
	//Note the 3 methods of cloning an object: spread operator, Object.assign or JSON
	//toggle the matching category to true when selected
	function setCategoryStatus(categoryTitle:string): void { 
		console.log("Calling setCategoryStatus function")
		//Clone original
		let newEntries = {
			...entries
		}
		
		//MUTATOR: update clone
		newEntries.categorySelections.forEach((categoryEntry) => {
			if (categoryEntry.category === categoryTitle) {
				categoryEntry.selected = !categoryEntry.selected;
				console.log("ZORG",categoryTitle,)
			}
		})
		//Replace entries hook with clone
		setEntries({
			...newEntries,
		});

	}

	//update the numField in the 'entries' databse
	function setNum(categoryTitle:string,newValue:number) {
		//Clone original
		const newEntries = Object.assign({},entries);
		//MUTATOR: update clone
		newEntries.categorySelections.forEach((categoryEntry) => {
			if (categoryEntry.category === categoryTitle) {
			categoryEntry.numActivities = newValue;
			}
		})
		setEntries({
			...newEntries,
		})
	}

	//update the duration field in the 'entries' database
	function setDuration(categoryTitle:string,newValue:number) {
		//Clone original
		const newEntries = Object.assign({},entries);
		//MUTATOR: update clone
		newEntries.categorySelections.forEach((categoryEntry) => {
			if (categoryEntry.category === categoryTitle) {
			categoryEntry.duration = newValue;
			}
		})
		setEntries({
			...newEntries,
		})
	}


    //const [categorySelectedField, setCategorySelectedField] = useState
    return (
        
        <div className="RosterComponent">

            <h2 id="Title">Enter Selection</h2>
            Select Categories, number of activities and duration
			<RenderEntries 
				categoryTitles={props.categories} 
				entries={entries} 
				setCategoryStatus={setCategoryStatus}
				setNum={setNum} 
				setDuration={setDuration}/>
			<SubmitButton entries={entries} setSelections={props.setSelections}/>
			<ViewState entries={entries}/>

        </div>
    )
}




//<SubmitButton /> passes a 'MultiSelections' interface object with selected categories and input fields to the <Roster /> parent component.
//input validation: if nothing has been selected
export function SubmitButton(props: {entries: CategoryEntries, setSelections: (s: MultiSelections) => void}) {
	return (
		<div>
			<input 
				type="button"
				value="Submit"
				onClick={(Event) => {
					console.log("Submit button pressed using Array.reduce()!!")

					const rosterSelections = props.entries.categorySelections.reduce((result: RosterSelection[], categoryEntry: CategoryEntry) => {
						if (categoryEntry.selected === true) {
							const thisRosterSelection = { 
								categorySelected: categoryEntry.category, 
								numActivities: categoryEntry.numActivities,
								activityDuration: categoryEntry.duration
							};
							
							result = [...result,thisRosterSelection];
						}
						return result;
					}, []) /*initial value of result is []*/
					//Now we need to call setSelections
					props.setSelections(({selectionsArr: rosterSelections}))
					console.log(JSON.stringify(rosterSelections,null,4));
					console.log("TEST:LENGTH",rosterSelections.length);
				}}
			/>
		</div>
	)
}





//RenderEntries(): 
//	-> For each category display the categoryTitle and corresponding entry fields for 'number of activies' & 'duration'
export function RenderEntries(props: {categoryTitles: string[], entries: CategoryEntries, setCategoryStatus: (title: string) => void, setNum: (title: string, val: number) => void, setDuration: (title: string, val: number) => void}) {
    return (
		//Make note: When using map to create JSX element, 
		//can’t have square bracket after arrow or it won’t render the thing

		//How to get the status of
        <div>
			
			{props.categoryTitles.map((title,index) => 
			
				<div className="CategoryEntry">
					{/*Render Category Title*/}
					<input 
						type="checkbox"
						value={title}
						id={index.toString()}
						name={title}
						onChange={(Event) => {
							props.setCategoryStatus(Event.target.value)
						}}
					/>
					<label>
					{title}
					</label>
					<br />
					<div>
						
						<CheckIfSelected 
							title={title} 
							entries={props.entries}
							setNum={props.setNum} 
							setDuration={props.setDuration}
						/>
						
						

					</div>

				</div>
			)}
            

        </div>
    )
}




function CheckIfSelected(props: {title: string, entries: CategoryEntries, setNum: (title: string, val: number) => void, setDuration: (title: string, val: number) => void}) {
	const categorySelected = getSelectedStatus(props.title,props.entries)
	if (categorySelected) {
		return (
			<RenderFields 
				/*
				numField={getNumField(props.title,props.entries)}
				durationField={getDurationField(props.title,props.entries)}
				*/
				title={props.title}
				setNum={props.setNum} 
				setDuration={props.setDuration}
			/>
		)
	}
	else {
		return (
			<></>
		)
	}
}

//<RenderFields /> displays numActivities and duration fields for each selected category
//the local hooks numField and durationField set and store the value inputted into the field
//the props setNum and setDuration update the values in the 'entries' database
function RenderFields(props: {title: string, setNum: (title: string, val: number) => void, setDuration: (title: string, val: number) => void}) {
	const [numField,setNumField] = useState<number>(0);
	const [durationField,setDurationField] = useState<number>(0);

    return (
        <div className="Fields">
			{/*Render NumActivities & duration fields*/}

			<label>
			NumActivities:
				<input 
					type="number"
					value={numField}
					onChange={(e) => {
						if (!isNaN(parseInt(e.target.value))) {
							setNumField(parseInt(e.target.value))
							props.setNum(props.title,parseInt(e.target.value))
						} else {
							console.log("NaN alert: Please enter a valid number into NumActivities!!");
						}
					}}
				/>
			</label>
			
			<br/>
			<label>
				Duration:
				<input 
					type="number"
					value={durationField}
					onChange={(e) => {
						if (!isNaN(parseInt(e.target.value))) {
							setDurationField(parseInt(e.target.value))
							props.setDuration(props.title,parseInt(e.target.value));
						} else {
							console.log("NaN alert: Please enter a valid number into duration!!");
						}
					}}
				/>
			</label>
        </div>
    )
}

//<ViewState /> checks whether the 'display state' button has been toggled, if it has been toggled the
//[viewState,setViewState] hook is set to 'true' and <DisplayState /> displays our entries as a JSON string.
function ViewState(props: {entries: CategoryEntries}) {
	const [viewState,setViewState] = useState<boolean>(false);
	return (
		<>
			<label>
				Click to view entries state:
				<input 
					type="button"
					onClick={(e) => {
						setViewState(!viewState)
					}}
				/>
			</label>
			<br/>
			<DisplayState condition={viewState} valueToDisplay={props.entries}/>
		</>
	)
}




/*AUXILLIARY FUNCTIONS*/

//getEntriesInit() is used to calculate our initial entries value stored in the [entries, setEntries] useState hook
function getEntriesInit(categoriesArg: string[]) {
	//Define our CategoryEntries Object
	let entriesLocal: CategoryEntries = {
		categorySelections: [],
	};
	//For each category Build a CategoryEntries Object
	categoriesArg.map((category,index) => { 
		let categoryEntry: CategoryEntry = {category: category, selected: false, numActivities: 0, duration: 0,}
		//Add categoryEntry to entriesLocal
		entriesLocal = {
			categorySelections: [...entriesLocal.categorySelections.slice(), categoryEntry]
		}
	});
	return entriesLocal; 
}

//Used by <CheckIfSelected /> to check which category checkboxes have been selected. 
//Those returning condition = 'true' will display inputFields in <RenderFields />
function getSelectedStatus(title: string, entries: CategoryEntries): boolean {
	let condition = false;
	for (const categoryEntry of Object.values(entries.categorySelections)) {
		if (categoryEntry.category === title && categoryEntry.selected === true) {
			condition = true;	
		}
	}
	return condition;
}



/* */
//<SubmitButton /> passes a 'MultiSelections' interface object with selected categories and input fields to the <Roster /> parent component.
//input validation: if nothing has been selected
/*
export function SubmitButton(props: {entries: CategoryEntries, setSelections: (s: MultiSelections) => void}) {
	return (
		<div>
			<input 
				type="button"
				value="Submit"
				onClick={(Event) => {
					console.log("Submit button pressed using Array.map()!!")
					
					//extract category, numActivities & duration from 'entries' and put into rosterSelections Array

					const rosterSelections = props.entries.categorySelections.map((categoryEntry: CategoryEntry) => {
						//Only include selected Categories
						if (categoryEntry.selected === true && categoryEntry !== undefined) {
							//Pass
							return { 
								categorySelected: categoryEntry.category, 
								numActivities: categoryEntry.numActivities,
								activityDuration: categoryEntry.duration
							};
						}
					})
					//We're getting type mismatch.... the map above in some cases could define selectionsArr as a {RosterSelection | 'undefined'}[]
					const filteredSelections: RosterSelection[] = rosterSelections.filter((rosterSelection) => {
						return (rosterSelection !== (null || undefined));
					})
					props.setSelections({selectionsArr: filteredSelections});
					console.log(JSON.stringify(rosterSelections,null,4));
					console.log("TEST:LENGTH",rosterSelections.length);	
				}}
			/>
		</div>
	)
}
*/