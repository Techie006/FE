import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Button from "../atoms/Button";

const HelperNav = ({ msg, content, path, page, withImg = false, ...props }) => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(`${path}`);
  };

  // /를 기준으로 메시지 내용 줄 분리
  const messages = msg
    .split("/")
    .map((message, idx) => <StText key={idx}>{message}</StText>);

  return (
    <div style={{ ...props }}>
      <StLayout>
        {messages}
        {withImg ? <div>hi</div> : null}
        <Button
          type='button'
          content={content}
          onClick={clickHandler}
          page={page}
          func='helper'
          marginTop={"20px"}
        />
      </StLayout>
    </div>
  );
};

export default HelperNav;

const StLayout = styled.div`
  margin-top: 75px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StText = styled.div`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 23px;
  color: #c0c0c0;
`;
