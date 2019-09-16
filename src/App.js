import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import './App.css';

function App() {
  const windowHandle = useRef();
  const [count, setCount] = useState(0);
  const [isCounterOn, setIsCounterOn] = useState(false);

  const resetCount = useCallback(() => {
    setCount(0);
  }, [setCount]);

  useEffect(() => {
    const interval = setInterval(() => {
      if(isCounterOn) {
        setCount(c => c + 1);
      }
    }, 100);

    return () => {
      clearInterval(interval);
    }
  });

  const [portalTarget, setPortalTarget] = useState(document.getElementById('p2'));
  
  function openExternalPortal() {
    window.onChildOpened = () => {
      setPortalTarget(windowHandle.current.document.getElementById('p3'));
    };
    windowHandle.current = window.open('http://localhost:3000/page2.html', null, 'width=200,height=200;');    
  }

  function SomethingPortally({container}) {
    return container ? ReactDOM.createPortal(
      <div>The count is {count} <button type="button" onClick={resetCount}>Reset</button></div>,
      container
    ) : 'BROKEN';
  }

  return (
    <>
      <div>
        <h1>MAIN APP</h1>
        <button type="button" onClick={() => setIsCounterOn(on => !on)}>{isCounterOn ? 'Stop Counter' : 'Start Counter'}</button>
        <button type="button" onClick={openExternalPortal}>Open new window</button>
      </div>
      <SomethingPortally container={document.getElementById('p1')} />
      <SomethingPortally container={portalTarget} />
    </>
  );
}

export default App;
