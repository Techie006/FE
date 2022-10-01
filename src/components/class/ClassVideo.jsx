import { useRef, useEffect } from "react";
import styled from "styled-components";

const ClassVideo = ({ streamManager, hidden = false, mute = false, isPub }) => {
  const videoRef = useRef();

  if (isPub) {
    console.log("*** publisher video info ****");
  } else {
    console.log("*** sub video info ***");
  }
  console.log(streamManager, isPub);

  useEffect(() => {
    if (streamManager !== undefined && videoRef.current) {
      streamManager.addVideoElement(videoRef.current);
    }
  }, [streamManager]);

  return (
    <>
      <StVideo
        isPub={isPub}
        ref={videoRef}
        autoPlay={true}
        muted={mute}
        hidden={hidden}
        className='video-items'
      ></StVideo>
    </>
  );
};

export default ClassVideo;

const StVideo = styled.video`
  max-width: 100%;
  height: auto;
  padding: 30px 18px;
`;
