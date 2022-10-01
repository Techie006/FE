import styled from "styled-components";

import { T6 } from "../../styles/Text";

const Ingredients = ({ contents, isInfo = false, ...props }) => {
  const ingridientItems = contents.map((ingredient, idx) => (
    <StIngredientBox key={idx} isInfo={isInfo}>
      <StIngredient>{ingredient}</StIngredient>
    </StIngredientBox>
  ));

  return <StWrapper style={{ ...props }}>{ingridientItems}</StWrapper>;
};

export default Ingredients;

const StWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 6px;
`;

const StIngredientBox = styled.div`
  background: ${(props) => (!props.isInfo ? "#f0eadc" : "#FFEAD8")};
  border-radius: 6px;
  padding: 5px 8px;
`;

const StIngredient = styled(T6)`
  color: #8e7b6d;
`;
