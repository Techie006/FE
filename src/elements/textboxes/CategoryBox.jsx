import styled from "styled-components";

const CategoryBox = ({ label, num }) => {
  return (
    <StBox>
      <StContent>
        {label}: {num}
      </StContent>
    </StBox>
  );
};

export default CategoryBox;

const StBox = styled.div`
  width: 213px;
  height: 56px;

  background-color: ${(props) => props.theme.section.box.background};
  border-radius: ${(props) => props.theme.section.box.borderRadius};
  box-shadow: ${(props) => props.theme.section.box.boxShadow};

  &:hover {
    cursor: default;
  }
`;

const StContent = styled.div`
  display: flex;
  align-items: center;
  text-align: center;

  font-weight: ${(props) => props.theme.section.box.fontWeight};
  font-size: ${(props) => props.theme.section.box.fontWeight};
  line-height: ${(props) => props.theme.section.box.lineHeight};
`;
