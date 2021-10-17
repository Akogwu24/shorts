import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const [hasPhoto, setHasPhoto] = useState(false);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: {
          width: 1920,
          height: 1080,
        },
      })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  return (
    <div className='App'>
      <button onClick={getVideo}>Start</button>
      <div className='camera'>
        <video style={{ background: 'red' }} ref={videoRef}></video>
        <button>SNAP!</button>
      </div>
      <div className={`result ${hasPhoto ? 'hasPhoto' : ''}`}>
        <canvas ref={photoRef}></canvas>
        <button>Close!</button>
      </div>
    </div>
  );
}

export default App;
