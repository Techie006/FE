import { useState, useRef, useEffect } from "react";

import axios from "axios";
import { apis } from "../../shared/axios";
import RESP_CHAE from "../../server/response_chae";
import Loader from "../common/Loader";
import HelpMsg from "../common/HelpMsg";

const Recipes = (props) => {
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState({});
  const [showMsg, setShowMsg] = useState(false);

  const pageNum = useRef(0);
  const hasMore = useRef(true);
  // const PAGELIMIT = 5;

  const get_data = async () => {
    const resp = RESP_CHAE.RECIPES.GET_RECIPE_SUCCESS;
    // const resp = RESP_CHAE.RECIPES.GET_RECIPE_FAIL;
    // const resp = await apis.get_recipes({ pageNum.current, PAGELIMIT });
    const { result, content } = resp.data;

    if (!result) {
      setLoading(false);
      setShowMsg(true);
      return;
    }

    setRecipes({ ...recipes, ...content.recipes });
    pageNum.current = content.current_page_num;
    hasMore.current = content.current_page_num !== content.total_page_num;
    setLoading(false);
  };

  useEffect(() => {
    get_data();
  }, []);

  console.log(recipes);

  return <>Recipes</>;
};

export default Recipes;
