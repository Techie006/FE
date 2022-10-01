import React from 'react';
import GridTemplate from "../../elements/templates/GridTemplate";
import SigninForm from './SigninForm';
import styled from "styled-components";



const FormLayout = () => {
    return (
            <StWrapper>
                <SigninForm/>
            </StWrapper>
    );
};

export default FormLayout;

const StWrapper = styled.div``