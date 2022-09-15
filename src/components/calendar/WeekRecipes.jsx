import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { __getWeeklyDiets } from "../../modules/redux/calendar";

// import { apis } from "../../shared/axios";
import RESP_CHAE from "../../server/response_chae";
import Loader from "../common/Loader";
import Recipe from "./Recipe";

const WeekRecipes = (props) => {
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);

  const get_data = async () => {
    const resp = RESP_CHAE.CALENDAR.GET_WEEKLY_SUCCESS;
    // const resp = apis.get_weekly_diets();

    const {
      result,
      content,
      status: { message },
    } = resp.data;

    if (!result) {
      alert(message);
      return;
    }

    setRecipes([...content.recipes]);
    setLoading(false);
  };

  useEffect(() => {
    get_data();
  }, []);

  // const loading = useSelector((state) => state.calendar.isLoading);
  // const recipes = useSelector((state) => state.calendar.weeklyRecipes);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(__getWeeklyDiets());
  // }, [dispatch]);

  const weeklyRecipes = recipes.map((recipe) => (
    <Recipe key={recipe.id} {...recipe} />
  ));

  return (
    <>
      {loading ? <Loader /> : null}
      {!loading ? (
        <>
          <StTitle>이번주 식단</StTitle>
          <StRecipeWrapper>{weeklyRecipes}</StRecipeWrapper>
        </>
      ) : null}
    </>
  );
};

export default WeekRecipes;

const StTitle = styled.div`
  margin-bottom: 20px;
`;

const StRecipeWrapper = styled.div`
  height: 400px;
  overflow: scroll;
`;
