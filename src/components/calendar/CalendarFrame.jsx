import { useSelector } from "react-redux";
import styled from "styled-components";

import GridTemplate from "../../elements/templates/GridTemplate";

import Calendar from "./Calendar";
import WeekDiets from "./WeekDiets";
// import DietModal from "./DietModal";

const CalendarFrame = () => {
  const modalOpen = useSelector((state) => state.calendar.modalType);

  return (
    <>
      <GridTemplate>
        <StCalendarSection>
          <Calendar />
        </StCalendarSection>
        <StWeekSection>
          <WeekDiets />
        </StWeekSection>
      </GridTemplate>
      {/* {modalOpen ? <DietModal /> : null} */}
    </>
  );
};

export default CalendarFrame;

const StGrid = styled.div`
  background: ${(props) => props.theme.section.layout.background};
  border-radius: ${(props) => props.theme.section.layout.borderRadius};
  box-shadow: ${(props) => props.theme.section.layout.boxShadow};
`;

const StCalendarSection = styled(StGrid)`
  grid-column: 1 / span 8;

  /* mobile */
  @media all and (max-width: 600px) {
    grid-column: 1 / span 4;
  }
`;

const StWeekSection = styled(StGrid)`
  grid-column: 9 / span 4;

  /* mobile */
  @media all and (max-width: 600px) {
    grid-column: 1 / span 4;
  }
`;
