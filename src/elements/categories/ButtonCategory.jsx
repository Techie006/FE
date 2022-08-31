import styled from "styled-components";

const ButtonCategory = ({ onClick }) => {
    return (
        <StyledWrapper onClick={onClick}>

            <StyledButton>전체</StyledButton>
            <StyledButton>수입</StyledButton>
            <StyledButton>지출</StyledButton>

        </StyledWrapper>
    );
};

export default ButtonCategory;

const StyledWrapper = styled.div`
    display : flex;
    flex-direction : row;
    justify-contents : left;
    
    background-color : gray;
`

const StyledButton = styled.button`
    border : 2px solid black;
    border-radius : 20px;

    background-color : white;

    width : 50px;
    height : 30px;

    padding : 2px;
    margin : 10px;

    text-align : center;
    &:hover {
        cursor: pointer;
        font-weight : bold;

        color: ${(props) => props.theme.SelectedCategoryItemColor};
        transition: ${(props) => props.theme.transition};
        transform: ${(props) => props.theme.transform};
      }
`