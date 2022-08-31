import styled from "styled-components";
import { useForm } from "react-hook-form";

const LargeInput = () => {
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
    </StyledWrapper>
  );
};

export default LargeInput;

const StyledWrapper = styled.div`

    input{
        margin : 10px;
        width : 150px;
        height : 40px;
        border-color: ${(props) => props.theme.inputBorderColor};
        &:hover {
            cursor: pointer;
            border-color: ${(props) => props.theme.inputBorderHoverColor};
          }
    }

`