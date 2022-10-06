import styled from "styled-components";

import { ReactComponent as QuestionMark } from "../../assets/icons/common/question.svg";

const Helper = () => {
  return (
    <StLayout
      href='https://sweet-snapper-a98.notion.site/Team7_Final-Project-ce1a1c47d78e47aa94c9c71deada4e68'
      target='_blank'
    >
      <QuestionMark />
    </StLayout>
  );
};

export default Helper;

const StLayout = styled.a`
  position: fixed;
  top: 87%;
  left: 90%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background: #ffead8;
  border: none;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.15);
  &:hover {
    cursor: pointer;
    background: #ffa842;
  }
`;
