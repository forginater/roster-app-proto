//Generic function: if condition is true, display the string 'valueToDisplay' as a JSON stringified object
export function DisplayState(props: {condition: boolean, valueToDisplay: any}) {
	if (props.condition) {
			return <>{JSON.stringify(props.valueToDisplay)}</>
	} else {
		return <></>
	}
}

export function DisplayStates(props: {condition: boolean, valuesToDisplay: any}) {
	return (
		<>
		</>
	)
}

function doNothing() {
    console.log();
}


//Attempted to make a display that rolls through an iterable
/* 
//Generic function: if condition is true, display the string 'valueToDisplay' as a JSON stringified object
export function DisplayState(props: {condition: boolean, valueToDisplay: any}) {
	if (props.condition) {
		if ((props.valueToDisplay !== null && Symbol.iterator in Object(props.valueToDisplay) || Array.isArray(props.valueToDisplay))) 
		let returnObj: string = ""
		for (let elem in props.valueToDisplay()) {
			returnObj += elem
		}
		console.log("IFBRANCH");
		return (
			<>{JSON.stringify(returnObj)}</>
		)
	} else {
		console.log("ElseBRANCH");
		return <>{JSON.stringify(props.valueToDisplay)}</>
	}
}
else {
	return <></>
}
}
*/