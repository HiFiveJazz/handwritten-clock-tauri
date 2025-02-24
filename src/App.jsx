import React, { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import HandwrittenClock from "./components/HandwrittenClock/HandwrittenClock";
import Clock from "./components/Clock/Clock";

function App() {
  // Declare a state variable for the name
  const [name, setName] = useState("");
  const [greetMsg, setGreetMsg] = useState("");

  async function greet() {
    // Now `name` is defined from state
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <main className="container">
      <Clock/>
      <HandwrittenClock
        folder="letters/0"
        title="Handwritten Clock"
        description="Cycling through SVG letters."
        delay={100}  
      />
      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>
      <p>{greetMsg}</p>
    </main>
  );
}

export default App;

