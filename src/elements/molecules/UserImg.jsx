import styled from "styled-components";

import Image from "../atoms/Image";

const UserImg = (src, alt, ...props) => {
  return (
    <div {...props}>
      <StWrapper>
        <Image src={src} alt={alt} />
      </StWrapper>
    </div>
  );
};

export default UserImg;

const StWrapper = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;
