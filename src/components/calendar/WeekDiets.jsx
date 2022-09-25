import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import styled from "styled-components";

import { __getWeeklyDiets } from "../../modules/redux/calendar";
import { ST1 } from "../../styles/Text";
import LoadingSpinner from "../../elements/atoms/LoadingSpinner";
import Diet from "./Diet";

const WeekDiets = (props) => {
  const loading = useSelector((state) => state.calendar.isLoading);
  const diets = useSelector((state) => state.calendar.weeklyDiets);

  const dispatch = useDispatch();

  useEffect(() => {
    const date = new Date().toISOString().slice(0, 10);
    dispatch(__getWeeklyDiets({ date }));
  }, [dispatch]);

  const weeklyDiets =
    diets !== undefined
      ? diets.map((diet) => <Diet key={diet.id} {...diet} />)
      : null;

  return (
    <StLayout>
      <ST1>이번주 식단을 확인해보세요!</ST1>
      {loading ? <LoadingSpinner /> : null}
      {!loading ? <StRecipePart>{weeklyDiets}</StRecipePart> : null}
    </StLayout>
  );
};

export default WeekDiets;

const StLayout = styled.div`
  margin: 16px 18px;
`;

const StRecipePart = styled.div`
  margin: 8px 18px;
  height: 551px;
  overflow: scroll;
`;
