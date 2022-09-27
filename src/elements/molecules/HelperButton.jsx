import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { T1 } from "../../styles/Text";
import Button from "../atoms/Button";

const HelpButton = ({ msg, content, path, page, ...props }) => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(`${path}`);
  };

  const messages = msg
    .split(".")
    .map((message, idx) => <T1 key={idx}>{message}</T1>);

  return (
    <div style={{ ...props }}>
      <StWrapper>
        {messages}
        <Button
          type='button'
          content={content}
          onClick={clickHandler}
          page={page}
          func='helper'
          marginTop={"58px"}
        />
      </StWrapper>
    </div>
  );
};

export default HelpButton;

const StWrapper = styled.div`
  margin-top: 56px;
  margin-bottom: 110px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
