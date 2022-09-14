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
  padding: 6px 16px;
  gap: 10px;
  background-color: ${(props) => props.theme.txtBoxBGColor};
  border-radius: ${(props) => props.theme.txtBoxBorderRadius};
  &:hover {
    cursor: default;
  }
`;

const StContent = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  background-color: inherit;
  font-weight: ${(props) => props.theme.txtBoxFontWeight};
  font-size: ${(props) => props.theme.txtBoxFontSize};
  line-height: ${(props) => props.theme.txtBoxLineHeight};
`;