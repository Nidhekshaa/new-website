import { useEffect, useState } from 'react';

function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallBtn, setShowInstallBtn] = useState(false);
        const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const timerRef = useRef(null);
  const startTimeRef = useRef(0);
  const elapsedTimeRef = useRef(0);

  const update = () => {
    const currentTime = Date.now() - startTimeRef.current + elapsedTimeRef.current;
    setTime(currentTime);
  };

  const start = () => {
    if (!running) {
      startTimeRef.current = Date.now();
      timerRef.current = setInterval(update, 10);
      setRunning(true);
    }
  };

  const stop = () => {
    if (running) {
      clearInterval(timerRef.current);
      elapsedTimeRef.current += Date.now() - startTimeRef.current;
      setRunning(false);
    }
  };

  const reset = () => {
    clearInterval(timerRef.current);
    setTime(0);
    elapsedTimeRef.current = 0;
    setRunning(false);
    setLaps([]);
  };

  const lap = () => {
    if (running) {
      setLaps([...laps, time]);
    }
  };

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    const milliseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
  };
  
  useEffect(() => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();  
      setDeferredPrompt(e); 
      setShowInstallBtn(true); 
    });
  }, []);

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('App installed');
        } else {
          console.log('App installation rejected');
        }
        setDeferredPrompt(null);
        setShowInstallBtn(false);
      });
    }
  };

  return (
    <div>
    <div className="App" style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Stopwatch</h1>
      <div className="stopwatch" style={{ fontSize: '2em', marginBottom: '20px' }}>
        {formatTime(time)}
      </div>
      <div>
        <button onClick={start}>Start</button>
        <button onClick={stop}>Stop</button>
        <button onClick={reset}>Reset</button>
        <button onClick={lap}>Lap</button>
      </div>
      <ul className="laps" style={{ listStyle: 'none', padding: 0, marginTop: '20px' }}>
        {laps.map((lapTime, index) => (
          <li key={index}>Lap {index + 1}: {formatTime(lapTime)}</li>
        ))}
      </ul>
    </div>
      {showInstallBtn && <button onClick={handleInstallClick}>Install App</button>}
    </div>
  );
}

export default App;