import styled from "styled-components";

import { T6 } from "../../styles/Text";

const Ingredients = ({ contents, ...props }) => {
  const ingridientItems = contents.map((ingredient, idx) => (
    <StIngredientBox key={idx}>
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
  background: #f0eadc;
  border-radius: 6px;
  padding: 5px 8px;
`;

const StIngredient = styled(T6)`
  color: #8e7b6d;
`;
