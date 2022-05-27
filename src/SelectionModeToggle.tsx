import './Roster.css';
import {useState} from 'react';

interface SelectionModeToggleProps {
    toggleFunc: (s: string) => void;
}

//The purpose of <SelectionModeToggle /> is to allow user to switch between different app modes
export function SelectionModeToggle(props: SelectionModeToggleProps) {
    

    //The radio group must have share the same name (the value of the name attribute) to be treated as a group.
    //value attribute defines the unique value associated with each radio button. 

    return ( 
        <div className="RosterComponent">
            <h3>Select Mode:</h3>
            <label>
                QuickBuild
                
                <input 
                    type="radio"
                    value="QuickBuild"
                    name="Mode"
                    onChange={(e) => props.toggleFunc(e.target.value)}
                />
            </label>
            <br />
            <label>
                RosterEnterMulti
                <input 
                    type="radio"
                    value="RosterEnterMulti"
                    name="Mode"
                    onChange={(e) => props.toggleFunc(e.target.value)}
                />
            </label>
            <br />

        </div>
    )
    
}