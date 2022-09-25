import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import styled from "styled-components";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/ko";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "./ReactBigCalendar/style.css";
import LoadingSpinner from "../../elements/atoms/LoadingSpinner";
import Toolbar from "./ReactBigCalendar/Toolbar";
import { __getAllDiets } from "../../modules/redux/calendar";

const RecipeCalendar = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.calendar.isLoading);
  const allDiets = useSelector((state) => state.calendar.allDiets);

  useEffect(() => {
    const date = new Date().toISOString().slice(0, 7);
    dispatch(__getAllDiets({ date }));
  }, [dispatch]);

  // react-big-calendar 라이브러리 지역화
  moment.locale("ko-KR");
  const localizer = momentLocalizer(moment);

  const { defaultDate } = useMemo(
    () => ({
      defaultDate: new Date(),
    }),
    []
  );

  const diets = allDiets.map((recipe) => {
    const { id: diet_id, recipe_id, recipe_name, day, time } = recipe;
    const startTimeFormat = day.replace(/-/g, "/");
    return {
      id: diet_id,
      recipe_id: recipe_id,
      title: recipe_name,
      allDay: false,
      start: new Date(startTimeFormat),
      end: new Date(startTimeFormat),
      category: recipe.time,
    };
  });

  const clickSlotHandler = (slot) => {
    console.log(slot);
  };

  const clickEventHandler = (event) => {
    console.log(event);
  };

  return (
    <>
      {isLoading ? <LoadingSpinner /> : null}
      {!isLoading ? (
        <StLayout>
          <Calendar
            style={{ height: "500px", width: "100%", margin: "auto" }}
            components={{
              toolbar: Toolbar,
            }}
            localizer={localizer}
            culture='ko'
            defaultDate={defaultDate}
            defaultView='month'
            events={diets}
            popup // 하루에 3개 이상 식단이 있으면 팝업으로 처리
            selectable // calendar 각 칸 선택시 추가 기록 가능
            onSelectSlot={clickSlotHandler}
            onSelectEvent={clickEventHandler}
          />
        </StLayout>
      ) : null}
    </>
  );
};

export default RecipeCalendar;

const StLayout = styled.div`
  padding: 26px 20px;
`;
