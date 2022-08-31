import styled from "styled-components";
import { useForm } from "react-hook-form";

const SmallInput = () => {
    const {register, handleSubmit } = useForm({mode:"onChange"});

  return (
    <StyledWrapper>
    <form onSubmit={handleSubmit}>
        <input
            type="text"
            placeholder="SmallInput"
            {...register("name1", {
                required : "error msg",
            })} 
        />
    </form>
    </StyledWrapper>
  );
};

export default SmallInput;

const StyledWrapper = styled.div`

    input{
        margin : 10px;
        width : 70px;
        height : 20px;
        border-color: ${(props) => props.theme.inputBorderColor};
        &:hover {
            cursor: pointer;
            border-color: ${(props) => props.theme.inputBorderHoverColor};
          }
    }

`