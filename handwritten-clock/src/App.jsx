import React, { useState, useEffect } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

function App() {

  // const invoke = window.__TAURI__.core.invoke;
  const [consoleMsg, setConsoleMsg] = useState("");
  // const [greetMsg, setGreetMsg] = useState("");
  const [text, setName] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
      const interval = setInterval(() => {
        setCurrentTime(new Date().toLocaleTimeString());
      }, 1000);

      // Cleanup the interval on component unmount
      return () => clearInterval(interval);
    }, []);

  // async function greet() {
  //   // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
  //   setGreetMsg(await invoke("greet", { name }));
  // }

  async function printText() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setConsoleMsg(await invoke("count", { text }));
  }

  return (
    <main className="container">
      <h1>{currentTime}</h1> 
      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          // greet();
          printText();

        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>
      <p>{consoleMsg}</p>
    </main>
  );
}

export default App;
