import React from 'react';
import GridTemplate from "../../elements/templates/GridTemplate";
import SigninForm from './SigninForm';
import styled from "styled-components";

const FormLayout = () => {
    return (
        <div>
            <GridTemplate></GridTemplate>
            <SigninForm/>
        </div>
    );
};

export default FormLayout;

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

