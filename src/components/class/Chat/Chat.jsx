import { useSelector } from "react-redux";
import styled from "styled-components";

import UserImg from "../../../elements/molecules/UserImg";

const Chat = ({ nickname: username, profile_img, message }) => {
  const userInfo = useSelector((state) => state.auth.userInfo);

  return (
    <StLayout>
      <UserImg src={profile_img} alt={`profile_${username}`} />
      <StUsername>{username}</StUsername>
      <StMessage isMe={userInfo.username === username}>{message}</StMessage>
    </StLayout>
  );
};

export default Chat;

const StLayout = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  margin-bottom: 10px;
`;

const StUsername = styled.div`
  margin-left: 10px;
  margin-right: 6px;
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 17px;
  letter-spacing: -0.5px;
  color: #a5a5a5;
`;

const StMessage = styled.div`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
  letter-spacing: -0.5px;
  color: ${(props) => (!props.isMe ? "#282828" : "#F07401")};
`;
