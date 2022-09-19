import styled from "styled-components";

import Status from "./Status";
// import Daily from "./Daily";
// import Calories from "./Calories";
// import Nutrients from "./Nutrients";

const StatisticsFrame = () => {
  return (
    <StWrapper>
      <StSection isTwo={true}>
        <Status />
      </StSection>
      {/* <StSection>
        <Daily />
      </StSection>
      <StSection>
        <Calories />
      </StSection>
      <StSection>
        <Nutrients />
      </StSection> */}
    </StWrapper>
  );
};

export default StatisticsFrame;

const StWrapper = styled.div`
  display: grid;
  grid-auto-rows: ${(props) => (props.isTwo ? "349px" : "minmax(349px, auto)")};
  padding: 20px 84px;
  grid-template-columns: repeat(2, 50%);
  grid-column-gap: 20px;
  grid-row-gap: 20px;

  /* tablet */
  @media all and (max-width: 1024px) {
    padding: 20px 30px;
    grid-template-columns: repeat(2, 50%);
    grid-column-gap: 20px;
    grid-row-gap: 20px;
  }

  /* mobile */
  @media all and (max-width: 600px) {
    padding: 16px 16px;
    grid-template-columns: repeat(1, 100%);
    grid-column-gap: 16px;
    grid-row-gap: 16px;
  }
`;

const StSection = styled.div`
  padding: 18px 18px;
  background: ${(props) => props.theme.section.layout.background};
  border-radius: ${(props) => props.theme.section.layout.borderRadius};
  box-shadow: ${(props) => props.theme.section.layout.boxShadow};
`;
