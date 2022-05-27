import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {StateOfWorld} from './TypeScript_Class';
import { Roster_Old } from './_ni/Roster_Old';
import {Roster} from './Roster';
import App from './_ni/App';

//stateOfWorld includes typescript implementation of a React Class
const stateOfWorld: JSX.Element = <StateOfWorld />;
//roster includes roster app
const roster: JSX.Element = <Roster />;

//Original react app
const app: JSX.Element = <App />;

ReactDOM.render(
  
  <React.StrictMode>
    {
      //We can select which React App to run
      //stateOfWorld
      roster
      
      
    }
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
