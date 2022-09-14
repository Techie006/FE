import styled from "styled-components";

import Calendar from "./Calendar";

const StatisticsLayout = () => {
  return (
    <StWrapper>
      <StSection isCalendar={true}>
        <Calendar />
      </StSection>
      <StSection>weekly recipes</StSection>
    </StWrapper>
  );
};

export default StatisticsLayout;

const StWrapper = styled.div`
  display: grid;
  padding: 20px 84px;
  grid-template-columns: repeat(4, 20%);
  grid-column-gap: 20px;
  /* tablet */
  @media all and (max-width: 1024px) {
    padding: 20px 30px;
    grid-template-columns: repeat(4, 20%);
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
  grid-column: ${(props) => (props.isCalendar ? `1 / span 3` : null)};
  padding: 18px 18px;
  background: ${(props) => props.theme.section.layout.background};
  box-shadow: ${(props) => props.theme.section.layout.boxShadow};
  border-radius: ${(props) => props.theme.section.layout.borderRadius};
`;
