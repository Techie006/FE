import styled from "styled-components";

const UnderlineCategory = () => {
    return (
        <StyledWrapper>
            Category title
            <StyledCategory>
                        <StyledCategoryItem>text1</StyledCategoryItem>
                        <StyledCategoryItem>text2</StyledCategoryItem>
                        <StyledCategoryItem>text3</StyledCategoryItem>
                        <StyledCategoryItem>text4</StyledCategoryItem>
            </StyledCategory>
        </StyledWrapper>
    );
};

export default UnderlineCategory;

const StyledWrapper = styled.div`
    display : flex;
    flex-direction : column;

    font-size : 20px;
    color : black;
    

    text-align : center;
`

const StyledCategory = styled.div`
        display : flex;
        flex-direction : row;
        padding : 5px;
        color : red;
        
`

const StyledCategoryItem = styled.div`
        width : 50px;
        margin : 5px;
        color : ${(props) => props.theme.categoryItemColor};
        
        text-align : center;
        &:hover {
            cursor: pointer;
            font-weight : bold;
            text-decoration : underline;
            color: ${(props) => props.theme.SelectedCategoryItemColor};
            transition: ${(props) => props.theme.transition};
            transform: ${(props) => props.theme.transform};
          }
        
`