// import { useState, useEffect } from "react";
// import { OpenVidu } from "openvidu-browser";
// import styled from "styled-components";

// import { apis } from "../../shared/axios";
// import ClassVideo from "./ClassVideo";

// const VideoFrame = (props) => {
//   const [OVState, setOVState] = useState({
//     mySessionId: "SessionA",
//     myUserName: "Participant" + Math.floor(Math.random() * 100),
//     session: undefined,
//     mainStreamManager: undefined, // Main video of the page. Will be the 'publisher' or one of the 'subscribers'
//     publisher: undefined,
//     subscribers: [],
//   });

//   // 세션 생성하고 토큰 발급받음 -> 서버단에서 수행하도록 변경
//   const getToken = async () => {
//     // createSession: session 생성하고 sessionId 받아 저장
//     const session_resp = await apis.create_session();

//     const { status: session_status } = session_resp;
//     // 연결 실패
//     if (session_status === 409) {
//       // sweetAlert으로 변경하기
//       console.log("Such session with given sessionID already exists!");
//       return;
//     }

//     const { id: session_id } = session_resp.data;

//     const connect_resp = await apis.get_session;

//     // createToken: session 생성하고 sessionId 받아 저장
//     const token_resp = await apis.create_token({ sessionId: session_id });

//     const { status: token_status } = token_resp;

//     // 이미 종료된 세션이기 때문에 연결 실패
//     if (token_status === 400) {
//       // sweetAlert으로 변경하기
//       console.log("이미 종료된 세션에 접근하셨습니다.");
//       return;
//     }

//     const { token } = token_resp.data;
//     return token;
//   };

//   //
//   const joinSession = async () => {
//     const newOV = new OpenVidu();

//     const newSession = newOV.initSession();

//     // On every new Stream received...
//     newSession.on("streamCreated", (event) => {
//       console.log("Stream Created******");
//       // Subscribe to the Stream to receive it. Second parameter is undefined
//       // so OpenVidu doesn't create an HTML video by its own
//       const newSubscriber = newSession.subscribe(event.stream, undefined);

//       let newSubscribers = OVState.subscribers.push(newSubscriber);

//       // Update the state with the new subscribers

//       setOVState((prev) => ({ ...prev, subscribers: newSubscribers }));
//     });

//     // // On every Stream destroyed...
//     newSession.on("streamDestroyed", (event) => {
//       // Remove the stream from 'subscribers' array
//       console.log("***Delete stream");
//     });

//     // // On every asynchronous exception...
//     newSession.on("exception", (exception) => {
//       console.warn(exception);
//     });

//     setOVState((prev) => ({ ...prev, session: newSession }));

//     // --- 4) Connect to the session with a valid user token ---

//     // Get a token from the OpenVidu deployment
//     const token = await getToken();

//     // First param is the token got from the OpenVidu deployment. Second param can be retrieved by every user on event
//     // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
//     newSession.connect(token, { clientData: OVState.myUserName });

//     // --- 5) Get your own camera stream ---

//     // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
//     // element: we will manage it on our own) and with the desired properties
//     let publisher = await newOV.initPublisherAsync(undefined, {
//       audioSource: undefined, // The source of audio. If undefined default microphone
//       videoSource: undefined, // The source of video. If undefined default webcam
//       publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
//       publishVideo: true, // Whether you want to start publishing with your video enabled or not
//       resolution: "640x480", // The resolution of your video
//       frameRate: 30, // The frame rate of your video
//       insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
//       mirror: false, // Whether to mirror your local video or not
//     });

//     // --- 6) Publish your stream ---

//     newSession.publish(publisher);

//     // Obtain the current video device in use
//     var devices = await newOV.getDevices();
//     var videoDevices = devices.filter((device) => device.kind === "videoinput");
//     var currentVideoDeviceId = publisher.stream
//       .getMediaStream()
//       .getVideoTracks()[0]
//       .getSettings().deviceId;
//     var currentVideoDevice = videoDevices.find(
//       (device) => device.deviceId === currentVideoDeviceId
//     );

//     // Set the main video in the page to display our webcam and store our Publisher
//     setOVState((prev) => ({
//       ...prev,
//       session: newSession,
//       currentVideoDevice,
//       mainStreamManager: publisher,
//       publisher,
//     }));
//   };

//   useEffect(() => {
//     joinSession();
//   }, []);

//   useEffect(() => {
//     console.log(OVState);
//   }, [OVState]);

//   return (
//     <>
//       {OVState.mainStreamManager !== undefined ? (
//         <ClassVideo streamManager={OVState.mainStreamManager} />
//       ) : (
//         <div>null</div>
//       )}
//       {OVState.subscribers !== [] ? (
//         OVState.subscribers.map((sub, i) => (
//           <ClassVideo streamManager={sub} key={i} />
//         ))
//       ) : (
//         <div>null</div>
//       )}
//     </>
//   );
// };

// export default VideoFrame;

// const StVideo = styled.video`
//   background: 1px solid black;
// `;
