import { useSelector } from "react-redux";
import styled from "styled-components";

import { ST2 } from "../../../styles/Text";

const ChatHeader = () => {
  const viewerNum = useSelector((state) => state.cookingClass.viewerNum);
  const userInfo = useSelector((state) => state.auth.userInfo);

  return (
    <>
      <StHeader>
        <ST2>실시간 채팅</ST2>
        <StViewer>{`총 ${viewerNum}명 시청중`}</StViewer>
      </StHeader>
      <StGreetingPart>
        <StGreeting>{`${userInfo.username}님 어서오세요!`}</StGreeting>
        <StGreeting>실시간으로 댓글을 달아보세요.</StGreeting>
      </StGreetingPart>
    </>
  );
};

export default ChatHeader;

const StHeader = styled.div`
  padding: 18px 18px 0px 18px;
`;

const StViewer = styled.div`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 16px;
  color: #a5a5a5;
`;

const StGreetingPart = styled.div`
  height: 54px;
  background: rgba(217, 217, 217, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StGreeting = styled.div`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 17px;
  color: #656565;
`;
