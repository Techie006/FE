import { useSelector } from "react-redux";
import styled from "styled-components";

import GridTemplate from "../../elements/templates/GridTemplate";

import Calendar from "./Calendar";
import WeekDiets from "./WeekDiets";
import DietModal from "./modal/DietModal";
import SearchModal from "../../elements/organisms/SearchModal";
import DatePicker from "../../elements/molecules/DatePicker";

const CalendarFrame = () => {
  const dietModalOpen = useSelector((state) => state.calendar.dietModalOpen);
  const searchModalOpen = useSelector(
    (state) => state.calendar.searchModalOpen
  );
  const datePickerOpen = useSelector((state) => state.calendar.datePickerOpen);

  return (
    <>
      <GridTemplate height='621px'>
        <StCalendarSection>
          <Calendar />
        </StCalendarSection>
        <StWeekSection>
          <WeekDiets />
        </StWeekSection>
      </GridTemplate>
      {dietModalOpen ? <DietModal /> : null}
      {searchModalOpen ? <SearchModal pageFrom='calendar' /> : null}
      {datePickerOpen ? <DatePicker depth={1.5} /> : null}
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
