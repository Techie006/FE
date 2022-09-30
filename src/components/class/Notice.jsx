import styled from "styled-components";

const Notice = ({ message }) => {
  return (
    <StWrapper>
      <StMessage>{message}</StMessage>
    </StWrapper>
  );
};

export default Notice;

const StWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  justify-content: center;
`;

const StMessage = styled.div`
  font-family: "Noto Sans KR";
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 17px;
  letter-spacing: -0.5px;
  color: #d3d3d3;
`;
