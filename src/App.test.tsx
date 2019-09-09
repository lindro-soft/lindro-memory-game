import React from "react";
import ReactDOM from "react-dom";
import MemoryGameClass from "./MemoryGameClass";
import MemoryGameHooks from "./MemoryGameHooks";

it("renders MemoryGameClass without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<MemoryGameClass />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders MemoryGameHooks without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<MemoryGameHooks />, div);
  ReactDOM.unmountComponentAtNode(div);
});
