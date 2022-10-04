import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { OpenVidu } from "openvidu-browser";

import ClassVideo from "./ClassVideo";

const OpenViduVideo = (props) => {
  const sessionId = useSelector((state) => state.cookingClass.sessionId);
  // const token = useSelector((state) => state.cookingClass.token);
  const fullToken = useSelector((state) => state.cookingClass.fullToken);
  const userInfo = useSelector((state) => state.auth.userInfo);

  const [ov, setOv] = useState({
    mySessionId: sessionId,
    myUserName: "Participant" + Math.floor(Math.random() * 100),
    session: undefined,
    mainStreamManager: undefined, // Main video of the page. Will be the 'publisher' or one of the 'subscribers'
    publisher: undefined,
    subscribers: [],
  });
  const [session, setSession] = useState();
  const [publisher, setPublisher] = useState();
  const [subscribers, setSubscribers] = useState([]);

  const { role } = useParams();

  // 세션 생성하고 토큰 발급받음 -> 서버단에서 수행하도록 변경
  // const getToken = async () => {
  //   // createSession: session 생성하고 sessionId 받아 저장
  //   const session_resp = await apis.create_session();

  //   const { status: session_status } = session_resp;
  //   // 연결 실패
  //   if (session_status === 409) {
  //     // sweetAlert으로 변경하기
  //     console.log("Such session with given sessionID already exists!");
  //     return;
  //   }

  //   const { id: session_id } = session_resp.data;

  //   const connect_resp = await apis.get_session;

  //   // createToken: session 생성하고 sessionId 받아 저장
  //   const token_resp = await apis.create_token({ sessionId: session_id });

  //   const { status: token_status } = token_resp;

  //   // 이미 종료된 세션이기 때문에 연결 실패
  //   if (token_status === 400) {
  //     // sweetAlert으로 변경하기
  //     console.log("이미 종료된 세션에 접근하셨습니다.");
  //     return;
  //   }

  //   const { token } = token_resp.data;
  //   return token;
  // };

  // 1. 신규 OpenVidu 객체 생성하고 세션 및 스트림 형성
  const joinSession = async () => {
    const OV = new OpenVidu();

    // newOV.enableProdMode();

    const session = OV.initSession();

    // 신규 stream 생성 시 session이 해당 stream subscribe 하게 처리
    // 즉, 특정 스트림 구독
    session.on("streamCreated", (event) => {
      const subscriber = session.subscribe(event.stream, undefined);
      // 저장한 OpenVidu 객체의 subscribers 추가
      setSubscribers([...subscribers, subscriber]);
    });

    // stream 사라질 때 session이 수행할 코드 작성
    // 즉, 특정 스트림 구독 해제
    session.on("streamDestroyed", (event) => {
      // 구독자 삭제
      const deletedSubscriber = event.stream.streamManager;
      const deletedIdx = subscribers.indexOf(deletedSubscriber);
      if (deletedIdx === -1) {
        return;
      }
      setSubscribers(subscribers.splice(deletedIdx, 1));
    });

    // 예외 발생 시 경고 메시지 콘솔에 프린트
    session.on("exception", (exception) => {
      console.warn(exception);
    });

    setOv(OV);
    setSession(session);
  };

  // 2. 세션에 연결함
  const connectSession = async () => {
    if (!session) {
      return;
    }
    await session.connect(fullToken, {
      clientData: {
        nickname: userInfo.username,
      },
    });

    // 쿠킹클래스 시작한 유저인 경우(publisher)만 publish 수행
    if (role === "pub") {
      initPublish();
    }
  };

  // 3. 쿠킹 클래스 오픈한 유저인 경우만 publish 수행
  const initPublish = async () => {
    const mediaStream = await ov.getUserMedia({
      audioSource: false,
      videoSource: undefined,
      resolution: "640x480",
      frameRate: 60,
    });

    const videoTrack = mediaStream.getVideoTracks()[0];

    const publisher = ov.initPublisher("video_container", {
      audioSource: undefined,
      videoSource: videoTrack,
      publishAudio: true,
      publishVideo: true,
      insertMode: "APPEND",
      mirror: true,
    });

    publisher.once("accessAllowed", () => {
      session.publish(publisher);
      setPublisher(publisher);
    });
  };

  // 4. 쿠킹 클래스 유저가 세션에서 떠남
  const leaveSession = async () => {
    if (session) {
      session.disconnect();
      // 세션 떠나기
      setSession(undefined);
      setOv(undefined);
    }
  };

  useEffect(() => {
    joinSession();
  }, []);

  useEffect(() => {
    connectSession();
    return () => leaveSession();
  }, [session]);

  // cookingClass publisher가 나가면 페이지에서 나감.
  useEffect(() => {}, [subVideos]);

  // 쿠킹클래스에 들어온 유저의 경우 subVideo를 통해 publish된 실시간 영상을 볼 수 있음
  const subVideos = subscribers?.map((subscriber, idx) => (
    <ClassVideo key={idx} streamManager={subscriber} isPub={false} />
  ));

  return (
    <>
      {role === "pub" ? (
        <ClassVideo streamManager={publisher} isPub={true} />
      ) : (
        subVideos
      )}
    </>
  );
};

export default OpenViduVideo;
