import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
/*************************************************************************************
 * MemoryGameClass - Is an example of doing the game with a old school react class
 * MemoryGameHooks - Is an uses Hooks instead
 *************************************************************************************/

//import MemoryGameClass from "./MemoryGameClass";
import MemoryGameHooks from "./MemoryGameHooks";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<MemoryGameHooks />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
