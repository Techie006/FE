import styled from "styled-components";

import { SectionTitle } from "../../elements/texts/pageTexts";

const SectionLayout = (props) => {
  return (
    <>
      <StSection windowWidth={window.innerWidth}>
        <SectionTitle>{props.title}</SectionTitle>
        {props.children}
      </StSection>
    </>
  );
};

export default SectionLayout;

const StSection = styled.div`
  box-sizing: border-box;
  margin: 10px 10px;
  box-shadow: ${(props) => props.theme.boxShadow};
`;
