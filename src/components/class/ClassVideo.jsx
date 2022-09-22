import { useState, useMemo, useEffect } from "react";
import { OpenVidu } from "openvidu-browser";

import { apis } from "../../shared/axios";

const ClassVideo = (props) => {
  const [loading, setLoading] = useState(true);
  const [OV, setOV] = useState();
  const [Session, setSession] = useState();
  const [username, setUsername] = useState();
  const [sessionId, setSessionId] = useState();
  const [Token, setToken] = useState();

  const [publisher, setPublisher] = useState();
  const [subscribers, setSubscribers] = useState();

  const initPublish = async () => {
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
    setLoading(false);
    return token_id;
  };

  // publish
  const joinSession = () => {
    // 1. OpenVidu 객체 생성하고 세션 시작, 저장
    let _OV = new OpenVidu();
    _OV.enableProdMode();
    let _session = _OV.initSession();

    // 2. 저장
    setOV(_OV);
    setSession(_session);

    // 2. OpenVidu 세션 연결
    const connection = async () => {
      // token 생성
      const token_id = await initPublish();
      const sendData = { clientData: username };

      const connect_resp = await _session.connect(token_id, sendData);
      const sendOption = {
        audioSource: false,
        videoSource: undefined,
        resolution: "1280x720",
        frameRate: 10,
      };

      // user media 객체 생성
      const media_resp = await _OV.getUserMedia(sendOption);
      const mediaStream = media_resp;

      let videoTrack = mediaStream.getVideoTracks()[0];

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

    connection();
  };

  useEffect(() => {
    joinSession();
  }, []);

  return <>C</>;
};

export default ClassVideo;
