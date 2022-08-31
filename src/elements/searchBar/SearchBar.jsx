import styled from "styled-components";
import { useForm } from "react-hook-form";

const SearchBar = () => {

    const {register, handleSubmit } = useForm({mode:"onChange"});

  return (
    <StyledWrapper>
        <form onSubmit={handleSubmit}>
        <input
            type="text"
            placeholder="LargeInput"
            {...register("name1", {
                required : "error msg",
            })} 
        />
        </form>
        <StyledButton>click</StyledButton>
    </StyledWrapper>
  );
};

export default SearchBar;

const StyledWrapper = styled.div`
    display: flex;
    flex-direction: row;    

    input{
        margin : 10px;
        width : 250px;
        height : 30px;
        border-radius : 15px;
        border-color: ${(props) => props.theme.serachBarBorderColor};
        &:hover {
            cursor: pointer;
            border-color: ${(props) => props.theme.serachBarBorderHoverColor};
        }
}
`;

const StyledButton = styled.button``;
