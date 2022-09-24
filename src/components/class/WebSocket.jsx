import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useRef, useCallback, useEffect } from "react";
import webstomp from "webstomp-client";
import SockJs from "sockjs-client";
import { saveStompClient } from "../../modules/redux/cookingClass";

const WebSocket = (props) => {
  const { redisClassId } = useParams();

  const isLogin = useSelector((state) => state.auth.isLogin);
  const userInfo = useSelector((state) => state.auth.userInfo);

  const dispatch = useDispatch();

  // 리렌더링이 되더라도 값을 유지
  const stompClient = useRef({});
  const subscription = useRef({});

  const getHeader = useCallback(() => {
    if (isLogin)
      return {
        Authorization: localStorage.getItem("Authorization"),
      };
    else return {};
  }, [isLogin]);

  const createData = useCallback(
    (eventType, message = "") => ({
      type: eventType,
      redis_class_id: redisClassId,
      member_id: userInfo.member_id,
      nickname: userInfo.username,
      profile_img: userInfo.profile_img,
      message: message,
      viewer_num: 0,
    }),
    [redisClassId, userInfo]
  );

  const sendEvent = useCallback(
    (event, message) => {
      stompClient.current.send(
        `/pub/chat`,
        JSON.stringify(createData(event, message)),
        getHeader()
      );
    },
    [getHeader, createData]
  );

  const connectSocket = useCallback(() => {
    // 1. webSocket 클라이언트 생성
    const sock = new SockJs("http://3.36.56.125/ws");
    stompClient.current = webstomp.over(sock);

    // 2. webSocket 연결
    stompClient.current.connect(getHeader(), () => {
      sendEvent("ENTER");

      subscription.current = stompClient.current.subscribe(
        `/sub/chat/${redisClassId}`,
        (frame) => {
          console.log(frame);
          const resp = JSON.parse(frame.body);
          const { type } = resp;
          switch (type) {
            case "ENTER":
              console.log("enter");
              return;
            case "MESSAGE":
              console.log("message");
              return;
            case "LEAVE":
              console.log("leave");
              return;
            default:
              return;
          }
        },
        getHeader()
      );
    });
  }, [getHeader, sendEvent, redisClassId]);

  const disconnectSocket = useCallback(() => {
    // 1. webSocket 연결 해지 전 Leave 이벤트 전달
    stompClient.current.send(
      `/pub/chat`,
      JSON.stringify(createData("LEAVE")),
      getHeader()
    );

    // 2. webSocket 연결 해지
    subscription.current.unsubscribe();
    stompClient.current.disconnect();
  }, [createData, getHeader]);

  useEffect(() => {
    connectSocket();
    return () => disconnectSocket();
  }, [connectSocket, disconnectSocket]);

  useEffect(() => {
    dispatch(saveStompClient({ stompClient: stompClient.current }));
  }, [stompClient]);

  return <></>;
};

export default WebSocket;
