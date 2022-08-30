import styled from "styled-components";

import MediumLink from "./MediumLink";

const MediumLinkWithHelper = ({ helper, content, link }) => {
  return (
    <StyledWrapper>
      <StyledHelper>{helper}</StyledHelper>
      <MediumLink content={content} link={link} />
    </StyledWrapper>
  );
};

export default MediumLinkWithHelper;

// TODO 디자인 - width 지정
const StyledWrapper = styled.div`
  width: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledHelper = styled.div`
  text-align: center;
  font-size: 0.9rem;
  color: ${(props) => props.theme.helperTextColor};
`;
