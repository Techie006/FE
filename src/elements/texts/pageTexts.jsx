import styled from "styled-components";

export const StTitle = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 23px;
  margin-bottom: 20px;
  background-color: inherit;
`;

export const SectionTitle = styled.div`
  font-weight: 700;
  font-size: 16px;
  line-height: 23px;
  margin-bottom: 20px;
  background-color: inherit;
`;

export const AccentText = styled.div`
  font-weight: bold;
  font-size: 1.2rem;
`;

export const NormalText = styled.div`
  font-size: 1rem;
`;

export const SmallText = styled.div`
  font-size: 0.7rem;
`;

export const HelperText = styled(SmallText)`
  font-weight: lighter;
  color: ${(props) => props.theme.helperTextColor};
`;

export const ErrorText = styled(SmallText)`
  color: ${(props) => props.theme.errorTextColor};
`;

export const ValidateText = styled(SmallText)`
  color: ${(props) => props.theme.successTextColor};
`;