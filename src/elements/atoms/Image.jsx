import styled from "styled-components";

const Image = (src, alt, ...props) => {
  return (
    <div {...props}>
      <StImg src={src} alt={alt} />
    </div>
  );
};

export default Image;

const StImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
