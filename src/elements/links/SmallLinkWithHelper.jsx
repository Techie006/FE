import styled from "styled-components";

import SmallLink from "./SmallLink";

const SmallLinkWithHelper = ({ helper, content, link }) => {
  return (
    <StyledWrapper>
      <StyledHelper>{helper}</StyledHelper>
      <SmallLink content={content} link={link} />
    </StyledWrapper>
  );
};

export default SmallLinkWithHelper;

// TODO 디자인 - width 지정
const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StyledHelper = styled.div`
  text-align: center;
  font-size: 0.7rem;
  color: ${(props) => props.theme.helperTextColor};
  margin-right: 5px;
`;
