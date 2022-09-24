import styled from "styled-components";

import UserImg from "../../elements/molecules/UserImg";
import { Text } from "../../styles/Text";

const Chat = ({ username, profile_img, message }) => {
  return (
    <StWrapper>
      <UserImg src={profile_img} alt={`profile_${username}`} />
      <Text>{`${username} ${message}`}</Text>
    </StWrapper>
  );
};

export default Chat;

const StWrapper = styled.div`
  display: flex;
`;
