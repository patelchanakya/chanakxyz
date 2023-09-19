import "./App.css";
import CLOUDS from "vanta/dist/vanta.clouds.min.js";
import React, { useEffect, useRef } from "react";
import "./App.css";
import Draggable from "react-draggable";

function App() {
  const audio = useRef(null);

  useEffect(() => {
    audio.current = new Audio("/mainback.mp3");
    audio.current.loop = true;

    VANTA.CLOUDS({
      el: "#vanta",
      mouseControls: true,
      touchControls: true,
      gyroControls: true,
      minHeight: 100.0,
      minWidth: 100.0,
      sunColor: 0xffa400,
      speed: 2.75,
    });

    // Clean up function
    return () => {
      audio.pause();
    };
  }, []);

  const playAudio = () => {
    const playPromise = audio.current.play();
    if (playPromise !== undefined) {
      playPromise
        .then((_) => {
          // Automatic playback started!
        })
        .catch((error) => {
          console.log("Playback prevented", error);
        });
    }
  };

  return (
    <>
      <div className="App">
        <div className="bg" id="vanta">
          <Draggable>
            <div className="draggable justify-center pr-10 z-50">
              <a href="/file_to_download.png" download onClick={playAudio}>
                <img
                  className="draggable-img"
                  src="/folder.png"
                  alt="Draggable item"
                />
              </a>
            </div>
          </Draggable>

          <Draggable>
            <div className="draggable pl-3 justify-center z-50">
              <h3>my resume</h3>
            </div>
          </Draggable>
        </div>
      </div>
    </>
  );
}

export default App;
