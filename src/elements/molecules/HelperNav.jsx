import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { ReactComponent as NoInfo } from "../../assets/illustrations/no_info_color.svg";
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
        {/* 이미지를 보여줘야 하는 경우  */}
        {withImg ? <NoInfo /> : null}
        {messages}
        {/* 버튼을 보여줘야 하는 경우 */}
        {!withImg ? (
          <Button
            type='button'
            content={content}
            onClick={clickHandler}
            page={page}
            func='helper'
            marginTop={"20px"}
          />
        ) : null}
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
