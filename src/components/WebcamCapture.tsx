'use client'; // needed only if using Next.js App Router

import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

const videoConstraints = {
  width: 300,
  height: 300,
  facingMode: 'user',
};

const WebcamCapture = ({ onCapture }: { onCapture: (imgSrc: string) => void }) => {
  const webcamRef = useRef<Webcam>(null);
  const [showCamera, setShowCamera] = useState(false);

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      onCapture(imageSrc);
      setShowCamera(false);
    }
  };

  return (
    <div>
      {!showCamera && (
        <button onClick={() => setShowCamera(true)} className="bg-black-primary !text-white px-4 py-1 rounded-lg">
          Open Webcam
        </button>
      )}

      {showCamera && (
        <div className="mt-4">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
            mirrored
            className="rounded shadow"
          />
          <div className="mt-2 flex gap-3">
            <button onClick={() => setShowCamera(false)} className="!bg-blue-secondary !text-black-primary rounded-lg px-6 py-1.5">
              Cancel
            </button>
            <button onClick={capture} className="!bg-black-primary !text-white rounded-lg px-6 py-1.5 cursor-pointer">
              Capture
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebcamCapture;
