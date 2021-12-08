import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const [hasPhoto, setHasPhoto] = useState(false);
  const [cameraRunning, setCameraRunning] = useState(false);

  const getVideo = () => {
    setCameraRunning(true);
    navigator.mediaDevices
      .getUserMedia({
        video: {
          width: 1280,
          height: 720,
        },
      })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => console.error(err));
  };
  const takePhoto = () => {
    const width = 414;
    const height = width / (16 / 9);
    let video = videoRef.current;
    let photo = photoRef.current;
    photo.width = width;
    photo.height = height;
    let ctx = photo.getContext("2d");
    ctx.drawImage(video, 0, 0, width, height);
    setHasPhoto(true);
  };
  const stopCamera = () => {
    closePhoto();
    setHasPhoto(false);
    setCameraRunning(false);
    // let video = document.querySelector("video");
    // console.log("query selector", video);
  };

  const closePhoto = () => {
    let photo = photoRef.current;
    let ctx = photo.getContext("2d");
    ctx.clearRect(0, 0, photo.width, photo.height);
    setHasPhoto(false);
  };

  const retakePhoto = () => {
    closePhoto();
    takePhoto();
  };

  return (
    <div className="App">
      <button onClick={getVideo}>Start</button>
      <div className="camera">
        {cameraRunning && (
          <video style={{ background: "red" }} ref={videoRef}></video>
        )}
        <button onClick={takePhoto}>SNAP!</button>
      </div>
      <div className={`result ${hasPhoto ? "hasPhoto" : ""}`}>
        <canvas style={{ background: "hotpink" }} ref={photoRef}>
          your picture will apear here
        </canvas>
        <button onClick={closePhoto}>Close!</button>
        <button onClick={retakePhoto}>Retake Photo</button>
        <button onClick={stopCamera}>Stop Camera</button>
      </div>
    </div>
  );
}

export default App;
