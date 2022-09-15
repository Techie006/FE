import { useSelector } from "react-redux";
import styled from "styled-components";

import Calendar from "./Calendar";
import WeekRecipes from "./WeekRecipes";

const StatisticsLayout = () => {
  const updateOpen = useSelector((state) => state.calendar.updateOpen);
  const recipeOpen = useSelector((state) => state.calendar.recipeOpen);

  return (
    <StWrapper>
      {/* {updateOpen? } */}
      <StSection isCalendar={true}>
        <Calendar />
      </StSection>
      <StSection>
        <WeekRecipes />
      </StSection>
    </StWrapper>
  );
};

export default StatisticsLayout;

const StWrapper = styled.div`
  display: grid;
  padding: 20px 84px;
  grid-template-columns: repeat(4, 25%);
  grid-column-gap: 20px;
  /* tablet */
  @media all and (max-width: 1024px) {
    padding: 20px 30px;
    grid-template-columns: repeat(4, 25%);
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
  /* mobile */
  @media all and (max-width: 600px) {
    grid-column: 1;
  }
`;
