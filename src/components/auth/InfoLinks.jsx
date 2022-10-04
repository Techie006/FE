import { Link } from "react-router-dom";
import styled from "styled-components";

const InfoLinks = () => {
  return (
    <StLayout>
      <StLink to='/auth' target='_blank'>
        이용약관
      </StLink>
      <StLink to='/auth' target='_blank'>
        개인정보 취급방침
      </StLink>
    </StLayout>
  );
};

export default InfoLinks;

const StLayout = styled.div`
  display: flex;
  margin-top: 10px;
  padding: 0px 95px;
  gap: 12px;
`;

const StLink = styled(Link)`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 17px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.5px;
  color: #5b5b5b;
  &:hover {
    text-decoration: underline;
  }
`;