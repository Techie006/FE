import styled from "styled-components";

const ButtonCategory = ({ contents,type,onClick }) => {
    const categoryItems = contents.map((category, index)=> (
        <StyledButton 
        key= {index}
        type= {type}
        onClick={onClick}
        >{category}</StyledButton>
    ))
    return (
        <StyledWrapper>
            <StyledCategory>{categoryItems}</StyledCategory>
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
const StyledCategory = styled.div`
    display : flex;
    flex-direction : row;
    justify-contents : left;
`

const StyledButton = styled.button`
    border : 2px solid black;
    border-radius : 20px;

    background-color : white;


    padding : 2px;
    margin : 10px;

    color : ${(props) => props.theme.categoryItemColor};
    text-align : center;
    &:hover {
        cursor: pointer;
        color: ${(props) => props.theme.categoryItemHoverColor};
        transition: ${(props) => props.theme.transition};
        transform: ${(props) => props.theme.transform};
      }
`