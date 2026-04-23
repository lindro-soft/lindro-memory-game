import React from "react";
import { createRoot } from "react-dom/client";
import MemoryGameClass from "./MemoryGameClass";
import MemoryGameHooks from "./MemoryGameHooks";

it("renders MemoryGameClass without crashing", () => {
  const div = document.createElement("div");
  const root = createRoot(div);
  root.render(<MemoryGameClass />);
  root.unmount();
});

it("renders MemoryGameHooks without crashing", () => {
  const div = document.createElement("div");
  const root = createRoot(div);
  root.render(<MemoryGameHooks />);
  root.unmount();
});
