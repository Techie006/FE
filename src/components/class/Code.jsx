import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { OpenVidu } from "openvidu-browser";
import styled from "styled-components";

import { apis } from "../../shared/axios";
import ClassVideo from "./ClassVideo";

const VideoFrame = (props) => {
  const { status, redisClassId } = useParams();

  const [isPublisher, setIsPublisher] = useState(status === "publisher");
  const [OV, setOV] = useState();
  const [session, setSession] = useState();
  const [username, setUsername] = useState();

  // 방 번호
  const [sessionId, setSessionId] = useState();
  const [token, setToken] = useState();

  // 각 연결 번호
  const [connectionId, setConnectionId] = useState();

  const [publisher, setPublisher] = useState();
  const [subscribers, setSubscribers] = useState();

  const [destroyedStream, setDestroyedStream] = useState("");
  const [checkMyScreen, setCheckMyScreen] = useState("");

  const getToken = async () => {
    // createSession: session 생성하고 sessionId 받아 저장
    const session_resp = await apis.create_session();

    const { status: session_status } = session_resp;
    // 연결 실패
    if (session_status === 409) {
      // sweetAlert으로 변경하기
      console.log("Such session with given sessionID already exists!");
      return;
    }

    const { id: session_id } = session_resp.data;

    // createToken: session 생성하고 sessionId 받아 저장
    const token_resp = await apis.create_token({ sessionId: session_id });

    const { status: token_status } = token_resp;

    // 이미 종료된 세션이기 때문에 연결 실패
    if (token_status === 400) {
      // sweetAlert으로 변경하기
      console.log("이미 종료된 세션에 접근하셨습니다.");
      return;
    }

    const { token: token_id } = token_resp.data;

    setSessionId(session_id);
    setToken(token_id);
    return token_id;
  };

  const deleteSubscriber = (streamManager, id) => {
    console.log("체크1", streamManager);
    console.log("체크2", id);
    const prevSubscribers = subscribers;
    let index = prevSubscribers.indexOf(streamManager, 0);
    try {
      console.log("지우기");
      setSubscribers((current) =>
        current.filter((sub) => {
          return sub.stream.session.options.sessionId !== id;
        })
      );
    } catch (error) {
      console.log(error);
    }
    // if (index > -1) {
    //   console.log("지우기")
    //   prevSubscribers.splice(index, 1);
    //   setSubscribers(current=>current.filter(sub=>{
    //     return sub.stream.session.options.sessionId !== id
    //   }));
    // }
  };

  // publish
  const joinSession = async () => {
    console.log("**********join session");

    // 1. OpenVidu 객체 생성하고 세션 시작, 저장
    let _OV = new OpenVidu();
    _OV.enableProdMode();
    let _session = _OV.initSession();

    // 2. 세션에서 이벤트가 발생할 때의 작업 지정
    // 2-1 session에 참여한 사용자 추가
    _session.on("connectionCreated", (event) => {
      console.log("**********connection_created");
      console.log(event);
      // let _subscriber = _session.subscribe(event.stream, undefined);

      // const _subscribers = subscribers.push(_subscriber);

      // setSubscribers([..._subscribers]);
    });

    // 2-2 session에서 disconnect한 사용자 삭제
    // _session.on("streamDestroyed", (event) => {
    //   console.log("**********sessionDisconnected!!!");
    //   if (event.stream.typeOfVideo === "CUSTOM") {
    //     deleteSubscriber(
    //       event.stream.streamManager,
    //       event.stream.session.options.sessionId
    //     );
    //   } else {
    //     setDestroyedStream(event.stream.streamManager);
    //     setCheckMyScreen(true);
    //   }
    // });

    // // 2-3 예외처리
    // _session.on("exception", (exception) => {
    //   console.log("**********exception!!!");
    //   console.warn(exception);
    // });

    console.log(_session);
    console.log(sessionId);
    console.log(token);

    // // 2. 저장
    // setOV(_OV);
    // setSession(_session);

    // 3. OpenVidu 세션 연결
    // token 생성
    const token_id = await getToken();
    const sendData = { clientData: username };

    await _session.connect(token_id, sendData);

    console.log("Connected to server!! ***");

    // // 3-A. publish
    const connectPub = async () => {
      const sendOption = {
        audioSource: false,
        videoSource: undefined,
        resolution: "1280x720",
        frameRate: 10,
      };

      // user media 객체 생성 : 사용자에게 권한 허용 여부 물어야 하기 때문
      const media_resp = await _OV.getUserMedia(sendOption);
      const _mediaStream = media_resp;

      let videoTrack = _mediaStream.getVideoTracks()[0];
      // https://www.w3.org/TR/mst-content-hint/#dom-mediastreamtrack-contenthint
      videoTrack.contentHint = "motion";

      const pubOption = {
        audioSource: undefined,
        videoSource: videoTrack,
        publishAudio: true,
        publishVideo: true,
        // resolution: '1280x720',
        // frameRate: 10,
        insertMode: "APPEND",
        mirror: true,
      };

      const publisher = _OV.initPublisher(username, pubOption);

      publisher.once("accessAllowed", () => {
        _session.publish(publisher);
        setPublisher(publisher);
      });
    };

    connectPub();

    console.log(subscribers);
    console.log(_session);
    // connectPub();
  };

  const leaveSession = () => {
    if (session) {
      session.disconnect();
    }

    setOV(null);
  };

  useEffect(() => {
    joinSession();
    return leaveSession();
  }, []);

  useEffect(() => {
    console.log(publisher);
  }, [publisher]);

  useEffect(() => {
    console.log(subscribers);
  }, [subscribers]);

  const subscriberVideos =
    subscribers !== undefined ? (
      subscribers.map((subscriber, idx) => (
        <ClassVideo
          key={idx}
          streamManager={subscriber}
          hidden={false}
          muted={false}
        />
      ))
    ) : (
      <div>no</div>
    );

  return (
    <>
      {publisher !== undefined ? (
        <ClassVideo streamManager={publisher} hidden={false} muted={false} />
      ) : null}
      {subscriberVideos}
    </>
  );
};

export default VideoFrame;

const StVideo = styled.video`
  background: 1px solid black;
`;
