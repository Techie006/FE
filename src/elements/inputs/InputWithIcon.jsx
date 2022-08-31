import styled from "styled-components";
import { useForm } from "react-hook-form";

const InputWithIcon = () => {
    const {register, handleSubmit } = useForm({mode:"onChange"});

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

        <input
            type="text"
            placeholder="placeholder2"
            {...register("name2", {
                required : "error msg",
            })} 
        />   
    </form>
    </StyledWrapper>
  );
};

export default InputWithIcon;

const StyledWrapper = styled.div`
    display : flex;
    flex-direction : column;

    input {
        margin : 10px;
        background-repeat: no-repeat;
        padding: 5px 5px;
        width: 120px;
        border-color: ${(props) => props.theme.inputBorderColor};
        &:hover {
            cursor: pointer;
            border-color: ${(props) => props.theme.inputBorderHoverColor};
          }
    }

    input::-webkit-input-placeholder{
    background-image: url("https://cdn1.iconfinder.com/data/icons/hawcons/32/698627-icon-111-search-256.png");
    background-size: contain;
    background-position:  1px center;
    background-repeat: no-repeat;
    text-align: center;
    text-indent: 0;
    }
`

