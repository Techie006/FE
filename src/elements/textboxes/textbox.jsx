import styled from "styled-components";

const Textbox = ({ content }) => {
  return (
    <StBox>
      <StContent>{content}</StContent>
    </StBox>
  );
};

export default Textbox;

const StBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const StContent = styled.div`
  display: inline;
  padding: 6px 16px;

  background-color: ${(props) => props.theme.txtBoxBGColor};
  border-radius: ${(props) => props.theme.txtBoxBorderRadius};

  font-weight: ${(props) => props.theme.txtBoxFontWeight};
  font-size: ${(props) => props.theme.txtBoxFontSize};
  line-height: ${(props) => props.theme.txtBoxLineHeight};

  &:hover {
    cursor: default;
  }
`;
