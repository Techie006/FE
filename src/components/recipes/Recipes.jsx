import { useState, useRef, useCallback, useEffect } from "react";
import styled from "styled-components";

// import { apis } from "../../shared/axios";
import RESP_CHAE from "../../server/response_chae";
import Loader from "../common/Loader";
import Recipe from "./Recipe";
import DetailModal from "./DetailModal";

const Recipes = (props) => {
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [recipe, setRecipe] = useState({
    id: -1,
    recipe_name: "",
  });

  const pageNum = useRef(0);
  const hasMore = useRef(true);
  // const PAGELIMIT = 5;

  const get_data = useCallback(async () => {
    const resp = RESP_CHAE.RECIPES.GET_RECIPES_SUCCESS;
    // const resp = RESP_CHAE.RECIPES.GET_RECIPE_FAIL;
    // const resp = await apis.get_recipes({ pageNum.current, PAGELIMIT });
    const { result, content } = resp.data;


    if (!result) {
      setLoading(false);
      return;
    }

    setRecipes((prev) => [...prev, ...content.recipes]);
    pageNum.current = content.current_page_num;
    hasMore.current = content.current_page_num !== content.total_page_num;
    setLoading(false);
  }, []);

  useEffect(() => {
    get_data();
  }, [get_data]);

  const clickHandler = (recipe) => {
    setShowModal((prev) => !prev);
    setRecipe({ ...recipe });
  };

  const recipesView = recipes.map((recipe) => (
    <Recipe key={recipe.id} {...recipe} onClick={clickHandler} />
  ));

  return (
    <StWrapper>
      {loading ? <Loader /> : null}
      {!loading ? recipesView : null}
      {!loading && showModal ? (
        <DetailModal
          id={recipe.id}
          recipeName={recipe.recipe_name}
          onClick={clickHandler}
        />
      ) : null}
    </StWrapper>
  );
};

export default Recipes;

const StWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;

`;

