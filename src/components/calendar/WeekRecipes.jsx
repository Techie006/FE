import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import styled from "styled-components";

// import { apis } from "../../shared/axios";
// import RESP_CHAE from "../../server/response_chae";
import Loader from "../common/Loader";
import Recipe from "./Recipe";
import { __getWeeklyDiets } from "../../modules/redux/calendar";

const WeekRecipes = (props) => {
  // const [loading, setLoading] = useState(true);
  // const [recipes, setRecipes] = useState([]);

  // const get_data = async () => {
  //   const resp = RESP_CHAE.CALENDAR.GET_WEEKLY_SUCCESS;
  //   // const resp = apis.get_weekly_diets();

  //   const {
  //     result,
  //     content,
  //     status: { message },
  //   } = resp.data;

  //   if (!result) {
  //     alert(message);
  //     return;
  //   }

  //   setRecipes([...content.recipes]);
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   get_data();
  // }, []);

  // const loading = useSelector((state) => state.calendar.isLoading);
  // const recipes = useSelector((state) => state.calendar.weeklyRecipes);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(__getWeeklyDiets());
  // }, [dispatch]);

  const loading = useSelector((state) => state.calendar.isLoading);
  const recipes = useSelector((state) => state.calendar.weeklyDiets);

  const dispatch = useDispatch();

  useEffect(() => {
    const date = new Date().toISOString().slice(0, 10);
    dispatch(__getWeeklyDiets({ date }));
  }, [dispatch]);

  const weeklyRecipes =
    recipes !== undefined
      ? recipes.map((recipe) => <Recipe key={recipe.id} {...recipe} />)
      : null;

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
