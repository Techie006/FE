import { useState, useCallback, useEffect } from "react";
import styled from "styled-components";

// import { apis } from "../../shared/axios";
import RESP_CHAE from "../../server/response_chae";
import Loader from "../common/Loader";

const Detail = ({ id, recipeName }) => {
  const [loading, setLoading] = useState(true);
  const [recipe, setRecipe] = useState({});

  const get_data = useCallback(async () => {
    const resp = RESP_CHAE.RECIPES.GET_RECIPE_SUCCESS;
    // const resp = RESP_CHAE.RECIPES.GET_RECIPE_FAIL;
    // const resp = await apis.get_recipes({ pageNum.current, PAGELIMIT });
    const { result, content } = resp.data;

    if (!result) {
      setLoading(false);
      return;
    }

    setRecipe(content.recipe);
    setLoading(false);
  }, []);

  useEffect(() => {
    get_data();
  }, [get_data]);

  console.log(recipe);

  const ingredients = recipe.ingredients?.join(" ");
  const instruction = recipe.manual_desc?.map((desc, idx) => (
    <div>
      <div>{desc}</div>
      {recipe?.manual_imgs[idx] !== "" ? (
        <img src={recipe?.manual_imgs[idx]} alt={`img${idx}`} />
      ) : null}
    </div>
  ));

  return (
    <>
      <div>{recipeName}</div>
      {loading ? <Loader /> : null}
      {!loading ? (
        <StWrapper>
          <div>{ingredients}</div>
          <div>
            <div>조리방법: {recipe.method}</div>
            <div>카테고리: {recipe.category}</div>
            <div>열량: {recipe.calorie}</div>
          </div>
          {instruction}
        </StWrapper>
      ) : null}
    </>
  );
};

export default Detail;

const StWrapper = styled.div``;
