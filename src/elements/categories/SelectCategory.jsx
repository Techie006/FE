import styled from "styled-components";

const SelectCategory = () => {
    return (
        <StyledSelect
            placeholder={"choose"}
            >
                        <StyledCategoryItem
                            label = "item1"
                            value = ""
                            />
                        <StyledCategoryItem
                            label = "item2"
                            value = ""
                        />
             
                        <StyledCategoryItem
                            label = "item3"
                            value = ""
                        />
             
                        <StyledCategoryItem
                            label = "item4"
                            value = ""
                        />
        </StyledSelect>

    );
};

export default SelectCategory;

const StyledSelect = styled.select`
  width: 180px;
  height: 30px;
  margin: 0px 0px 20px 0px;
  
`;

const StyledCategoryItem = styled.option`
  
`;



