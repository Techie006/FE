import styled from "styled-components";

const UnderlineCategory = ({ contents, onClick, selectedCategory = "" }) => {
  const categoryItems = contents.map((category, idx) => (
    <StBox key={idx} onClick={onClick} disabled={category === selectedCategory}>
      <StContent>{category}</StContent>
    </StBox>
  ));

  return <StWrapper>{categoryItems}</StWrapper>;
};

export default UnderlineCategory;

const StWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px;
  gap: 12px;
`;

const StBox = styled.button`
  display: flex;
  flex-direction: row;
  flex: none;
  flex-grow: 0;
  align-items: flex-start;
  padding: 2px 10px;
  gap: 10px;
  border: none;

  background-color: ${(props) =>
    !props.disabled ? props.theme.btnBGColor : props.theme.selectBtnBGColor};
  border-radius: ${(props) => props.theme.btnBorderRadius};
  color: ${(props) =>
    !props.disabled ? props.theme.btnTxtColor : props.theme.selectBtnTxtColor};

  // TODO change as design comes out!
  &:hover {
    cursor: ${(props) => (!props.disabled ? "pointer" : "default")};
    transition: ${(props) => props.theme.transition};
    transform: ${(props) => props.theme.transform};
  }
`;

const StContent = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  font-style: ${(props) => props.theme.btnFontStyle};
  font-weight: ${(props) => props.theme.btnFontWeight};
  font-size: ${(props) => props.theme.btnFontSize};
  line-height: ${(props) => props.theme.btnLineHeight};
  color: inherit;
`;
