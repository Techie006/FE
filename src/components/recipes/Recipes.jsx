import { useState, useRef, useCallback, useEffect } from "react";
import styled from "styled-components";

// import { apis } from "../../shared/axios";
import RESP_CHAE from "../../server/response_chae";
import Loader from "../common/Loader";
import HelpMsg from "../common/HelpMsg";
import Recipe from "./Recipe";
import DetailModal from "./DetailModal";

const Recipes = (props) => {
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [showMsg, setShowMsg] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState(-1);

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
      setShowMsg(true);
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

  const clickHandler = (id) => {
    setShowModal((prev) => !prev);
    setId(id);
  };

  const recipesView = recipes.map((recipe) => (
    <Recipe key={recipe.id} {...recipe} onClick={clickHandler} />
  ));

  return (
    <StWrapper>
      {recipesView}
      {showModal ? <DetailModal id={id} onClick={clickHandler} /> : null}
    </StWrapper>
  );
};

export default Recipes;

const StWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
