import styled from "styled-components";

const Textbox = ({ content, ...props }) => {
  return (
    <StBox>
      <StLayout {...props}>
        <StContent>{content}</StContent>
      </StLayout>
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

const StLayout = styled.div`
  display: inline;
  padding: 6px 16px;

  // layout
  border-radius: ${(props) => props.theme.textbox.borderRadius};
  box-shadow: ${(props) => props.theme.textbox.boxShadow};

  // colors
  background: ${(props) => props.theme.textbox.colors.background};
`;

const StContent = styled.div`
  // content
  font-weight: ${(props) => props.theme.textbox.fontWeight};
  font-size: ${(props) => props.theme.textbox.fontSize};
  line-height: ${(props) => props.theme.textbox.lineHeight};

  // colors
  background: inherit;

  &:hover {
    cursor: default;
  }
`;
