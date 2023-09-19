
import "./App.css";
import React, { useEffect, useRef } from "react";
import CLOUDS from "vanta/dist/vanta.clouds.min.js";
import Draggable from "react-draggable";

function App() {
  const audio = useRef(null);

  const playAudio = () => {
    if (audio.current) {
      audio.current.play();
    }
  };

  useEffect(() => {
    audio.current = new Audio("/mainback.mp3");
    audio.current.loop = true;
    let vantaEffect = null;

    function refreshVanta() {
      if (vantaEffect) vantaEffect.destroy();
      vantaEffect = CLOUDS({
        el: "#vanta",
        mouseControls: true,
        touchControls: true,
        gyroControls: true,
        minHeight: 100.0,
        minWidth: 100.0,
        sunColor: 0xffa400,
        speed: 2.75,
      });
    }

    refreshVanta();
    window.addEventListener('resize', refreshVanta);

    // Create a MutationObserver instance to listen for changes in the body's class list
    const observer = new MutationObserver((mutationsList) => {
      for (let mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          if (document.body.classList.contains('react-draggable-transparent-selection')) {
            audio.current.play();
          }
        }
      }
    });

    // Start observing the body for configured mutations
    observer.observe(document.body, { attributes: true });

    // Clean up the observer when the component is unmounted
    return () => {
      observer.disconnect();
      if (vantaEffect) vantaEffect.destroy();
      window.removeEventListener('resize', refreshVanta);
    }
  }, []);



  return (
    <>
      <div className="App">
        <div className="bg" id="vanta">
          <Draggable>
            <div className="flex flex-col draggable mx-auto z-50 relative">
              <a href="/doc1.pdf" download onClick={playAudio}>
                <img
                  className="draggable-img"
                  src="/folder.png"
                  alt="Draggable item"
                />
                <div className="overlay-text">
                  <br />
                  <br />
                  <br />
                  <p class="text-gray-500 dark:text-gray-400"> resume
                    <span class="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline">
                      <br />
                      <svg class="w-4 h-4 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                      </svg>
                    </span>
                  </p>
                </div>
              </a>
            </div>
          </Draggable>
          {/* ... */}
        </div>
      </div>
    </>
  );
}

export default App;
