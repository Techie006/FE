import { useState, useRef, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import webstomp from "webstomp-client";
import SockJs from "sockjs-client";

// TODO change v4 -> v5
const ClassDetail = () => {
  const [chats, setChats] = useState([]);

  // 리렌더링이 되더라도 값을 유지
  const stompClient = useRef({});

  const { roomId } = useParams();

  useEffect(() => {
    // 1. webSocket 클라이언트 생성
    // wsCreate();
    const sock = new SockJs("http://3.36.56.125/ws");
    stompClient.current = webstomp.over(sock);
    let subscription;

    // 2. webSocket 연결
    stompClient.current.connect({ Authorization: "hi auth" }, () => {
      console.log("연결 완료");
      // enterHandler();
      const data = {
        id: "0",
        type: "ENTER",
        room_id: roomId,
        member_id: 1,
        nickname: "erica",
        profile_img:
          "https://www.attendit.net/images/easyblog_shared/July_2018/7-4-18/b2ap3_large_totw_network_profile_400.jpg",
        message: "first check!",
        viewer_num: 0,
        createdAt: "",
      };
      console.log(data);

      stompClient.current.send(
        `/pub/chat`,
        JSON.stringify(data),
        {}
        // {
        //   Authorization: "hi auth",
        // }
      );

      // subscribeHandler();
      subscription = stompClient.current.subscribe(
        `/sub/chat/${roomId}`,
        (frame) => {
          console.log(frame);
          // 이벤트별 동작 분기 필요
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
        // { Authorization: "auth hi" }
        {}
      );
    });

    // 3. webSocket 연결 해지
    return () => {
      // leaveHandler();
      const data = {
        type: "MESSGAE",
        viewer_num: 0,
        room_id: roomId,
        member_id: 1,
        nickname: "erica",
        profile_img:
          "https://www.attendit.net/images/easyblog_shared/July_2018/7-4-18/b2ap3_large_totw_network_profile_400.jpg",
        message: "first leave!",
      };
      console.log(data);
      stompClient.current.send(`/pub/chat`, JSON.stringify(data), {
        Authorization: "hi auth",
      });
      console.log("퇴장 메시지 전송");
      subscription.current.unsubscribe();
      stompClient.current.disconnect();
    };
  }, [roomId]);

  const submitHandler = (e) => {
    e.preventDefault();
    const message = e.target.querySelector("input").value;
    // messageHandler(message);
    const data = {
      type: "MESSAGE",
      viewer_num: 0,
      room_id: roomId,
      member_id: 1,
      nickname: "erica",
      profile_img:
        "https://www.attendit.net/images/easyblog_shared/July_2018/7-4-18/b2ap3_large_totw_network_profile_400.jpg",
      message: message,
    };
    console.log(data);
    stompClient.current.send(`/pub/chat`, JSON.stringify(data), {});
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <input type='text' placeholder='chat message' />
        <button type='submit'>제출</button>
      </form>
    </>
  );
};

export default ClassDetail;
