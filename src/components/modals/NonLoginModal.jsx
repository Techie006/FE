import React from 'react';
import styled from "styled-components";

const NonLoginModal = ({ onclose }) => {
    return (
        <StyledModalBackground>
            <StyledContent>
                <div onClick={onclose}>
                    로그인하자
                </div>
            </StyledContent>
        </StyledModalBackground>
    );
};

export default NonLoginModal;

const StyledModalBackground = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    background-color : rgba(0, 0, 0, 0.8);
    align-items: center;
    justify-content: center;
    position: fixed;
    left: 0;
    top: 0;
    text-align: center;
    .calendar_container {
        position:relative;
    }
`
const StyledContent = styled.div`
    display : flex;
    flex-direction : column;
    justify-content: left;
    align-items: left;
    text-align: left;
    height: 70%;
    width: 450px;
    border : 1px solid black;
    border-radius: 15px;
    position: relative;
    overflow: scroll;
    background-color : white;
    padding : 30px;
`