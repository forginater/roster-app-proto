import React from 'react';

interface SugarProps {
}

interface StatePropertyFields {
    onOrOff: boolean;
    numTimesClicked: number;
    
}

function WorldStateButton(props: {numTimesClicked: number, value: boolean, onClick:any}) {
    let thisString: string = "Gimme Sugaar: "
    return (
        <div>
            <label>
                
                <button onClick={props.onClick}>
                    {/*Note: method of declaring strings inisde of JSX Elements*/}
                    {thisString}
                    {" "} 
                    {props.value.toString().toUpperCase()}
                </button>
                This button has been clicked: {props.numTimesClicked}
            </label>
        </div>
    )
}

export class StateOfWorld extends React.Component<SugarProps,StatePropertyFields> {
    constructor(props: SugarProps) {
        super(props);
        this.state = {
            onOrOff: true,
            numTimesClicked: 0,
        };
    }

    //notice to declare function we don't use 'function' keyword 
    //and to pass this as a prop to Button in render() we use this.handleClickFunc()
    handleClickFunc(clickedArg: number): void {
        console.log("Button Pressed");
        //Demonstrating can call StateOfWorld Class without passing through function argument
        const otherVar: number = this.state.numTimesClicked;
        this.setState({
            onOrOff: !this.state.onOrOff,
            numTimesClicked: clickedArg + 1,
        })
    };

    

    dummyHandleClickFunc(clickedArg: number) {
        console.log("Clicking dummy Button HandleClick Func at play");
        //const onState: boolean = true;
        /*this.setState({
            onOrOff: true,
            numTimesClicked: 3,
        }) */
    }

    checkTypeFunc(someObj: any): string {
                return (typeof someObj).toString();
    }




    render() {
        //{console.log(typeof this.handleClickFunc(this.state.numTimesClicked))}
        //{this.checkTypeFunc(this.handleClickFunc(this.state.numTimesClicked))}
        /*PRINTING FUNCTION TYPE ATTEMPT GIVES ERROR*/
        //<FuncTypeDisplay inputProp={this.checkTypeFunc(this.handleClickFunc(this.state.numTimesClicked))}/>
        //<FuncTypeDisplay inputProp={"dummyStringProp"}/>
        /* OTHER METHOD OF ABOVE*/
        //{() => this.checkTypeFunc(this.handleClickFunc(this.state.numTimesClicked))}
        return (
        <div>
            <h1>
                State of the SugarPropz:
            </h1>
            <WorldStateButton 
                numTimesClicked={this.state.numTimesClicked} 
                value={this.state.onOrOff} 
                onClick={() => this.handleClickFunc(this.state.numTimesClicked)}
            />
            <p>
                Print Function Type:
                <br/>
                <FuncTypeDisplay inputProp={"inputProp = dummyString"} />
            </p>
            
            
            
        </div>
        
        
    )}
}

function FuncTypeDisplay(props: {inputProp: string}) {
    return (
        <> {props.inputProp}</>
    )
}