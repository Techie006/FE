import { useRef, useEffect } from "react";

const ClassVideo = ({ streamManager, hidden, mute }) => {
  const videoRef = useRef();

  useEffect(() => {
    if (streamManager !== undefined && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, []);

  return (
    <>
      <video
        ref={videoRef}
        autoPlay={true}
        muted={mute}
        hidden={hidden}
        className='video-items'
      ></video>
    </>
  );
};

export default ClassVideo;
