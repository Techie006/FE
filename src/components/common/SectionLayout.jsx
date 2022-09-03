import styled from "styled-components";

const SectionLayout = (props) => {
  return (
    <StSection windowWidth={window.innerWidth}>{props.children}</StSection>
  );
};

export default SectionLayout;

const StSection = styled.div`
  box-sizing: border-box;
  margin: 10px 10px;
  box-shadow: ${(props) => props.theme.boxShadow};
  width: ${(props) => (props.windowWidth > 500 ? "40%" : "100%")};
`;
