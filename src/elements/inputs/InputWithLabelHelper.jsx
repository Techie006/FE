import styled from "styled-components";
import { useForm } from "react-hook-form";

const InputWithLabelHelper = () => {
    const {register, handleSubmit, formState: { errors },} = useForm({mode:"onChange"});

  return (
    <StyledWrapper>
    <form onSubmit={handleSubmit}>
        <input
            type="text"
            placeholder="placeholder1"
            {...register("name1", {
                required : "error msg",
            })} 
        />
        {errors.name1 ? <div>msg</div>
        :
        <StyledErrorMsg>error</StyledErrorMsg>}

        <input
            type="text"
            placeholder="placeholder2"
            {...register("name2", {
                required : "error msg",
            })} 
        />
        {errors.name2 ? <div>msg</div>
        :
        <StyledErrorMsg>error</StyledErrorMsg>}
                
    </form>
    </StyledWrapper>
  );
};

export default InputWithLabelHelper;

const StyledWrapper = styled.div`
    font-size : 12px;
    margin : 5px;
    color: ${(props) => props.theme.msgColor};
`
const StyledErrorMsg = styled.div`
    color: ${(props) => props.theme.errorMsgColor};
`

