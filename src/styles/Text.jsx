import styled from "styled-components";

export const H1 = styled.div``;

export const H2 = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 23px;
  margin-bottom: 20px;
  background-color: inherit;
`;

export const H3 = styled.div`
  font-weight: 700;
  font-size: 18px;
  line-height: 26px;
  background-color: inherit;
`;

export const Text = styled.div`
  font-size: 0.7rem;
`;

// TODO jangwoo
export const HelperText = styled(Text)`
  /* color: ${(props) => props.theme.helperTextColor}; */
`;

export const ErrorText = styled(Text)`
  /* color: ${(props) => props.theme.errorTextColor}; */
`;

export const ValidateText = styled(Text)`
  /* color: ${(props) => props.theme.successTextColor}; */
`;
