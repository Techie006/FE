import { useState, useRef, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import webstomp from "webstomp-client";
import SockJs from "sockjs-client";

// TODO change v4 -> v5
const ClassDetail = () => {
  const [chats, setChats] = useState([]);

  // 리렌더링이 되더라도 값을 유지
  const stompClient = useRef({});
  const subscription = useRef();

  const { roomId } = useParams();

  const enterHandler = useMemo(() => {
    stompClient.current.send(
      `/pub/chat/${roomId}`,
      JSON.stringify({
        type: "enter",
        viewer_num: 0,
        room_id: "1",
        member_id: 1,
        nickname: "erica",
        profile_img:
          "https://www.attendit.net/images/easyblog_shared/July_2018/7-4-18/b2ap3_large_totw_network_profile_400.jpg",
        message: "first check!",
      }),
      {
        Authorization: "hi auth",
      }
    );
    console.log("ENTER 이벤트 전송");
  }, [roomId]);

  const messageHandler = useMemo(
    (message) => {
      stompClient.current.send(
        `/pub/chat/${roomId}`,
        JSON.stringify({
          type: "message",
          viewer_num: 0,
          room_id: "1",
          member_id: 1,
          nickname: "erica",
          profile_img:
            "https://www.attendit.net/images/easyblog_shared/July_2018/7-4-18/b2ap3_large_totw_network_profile_400.jpg",
          message: message,
        }),
        {
          Authorization: "hi auth",
        }
      );
      console.log("Send Message");
    },
    [roomId]
  );

  const leaveHandler = useMemo(() => {
    stompClient.current.send(
      `/pub/chat/${roomId}`,
      JSON.stringify({
        type: "leave",
        viewer_num: 0,
        room_id: "1",
        member_id: 1,
        nickname: "erica",
        profile_img:
          "https://www.attendit.net/images/easyblog_shared/July_2018/7-4-18/b2ap3_large_totw_network_profile_400.jpg",
        message: "first check!",
      }),
      {
        Authorization: "hi auth",
      }
    );
    console.log("퇴장 메시지 전송");
  }, [roomId]);

  const subscribeHandler = useMemo(() => {
    subscription.current = stompClient.current.subscribe(
      `/sub/chat/${roomId}`,
      (frame) => {
        console.log(frame);
        // 이벤트별 동작 분기 필요
        console.log("subscription working");
        console.log("Subscription 수행 시 돌아갈 FE 코드 작성");
      },
      { Authorization: "auth hi" }
    );
  }, [roomId]);

  useEffect(() => {
    // 1. webSocket 클라이언트 생성
    const sock = new SockJs("http://3.36.56.125/ws");
    stompClient.current = webstomp.over(sock);

    // 2. webSocket 연결
    stompClient.current.connect({ Authorization: "hi auth" }, () => {
      console.log("연결 완료");
      enterHandler();
      subscribeHandler();
    });

    // 3. webSocket 연결 해지
    return () => {
      leaveHandler();
      subscription.current.unsubscribe();
      stompClient.current.disconnect();
    };
  }, [roomId, enterHandler, leaveHandler, subscribeHandler]);

  const submitHandler = (e) => {
    e.preventDefault();
    const message = e.target.querySelector("input").value;
    messageHandler(message);
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
