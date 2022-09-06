import { useState, useCallback, useEffect } from "react";

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

  return (
    <>
      <div>
        {id} {recipeName}
      </div>
      {loading ? <Loader /> : null}
      {!loading ? <></> : null}
    </>
  );
};

export default Detail;
