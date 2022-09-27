import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import styled from "styled-components";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/ko";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "./react-big-calendar/style.css";
import LoadingSpinner from "../../elements/atoms/LoadingSpinner";
import Toolbar from "./react-big-calendar/Toolbar";
import { __getAllDiets, openDietModal } from "../../modules/redux/calendar";

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
      category: time,
    };
  });

  // TODO timezone 이슈 해결
  const clickSlotHandler = (slot) => {
    const { start } = slot;
    const date = start.toISOString().slice(0, 10);
    dispatch(openDietModal({ diet: {}, type: "create", date }));
  };

  const clickEventHandler = (event) => {
    const { recipe_id } = event;
    console.log(recipe_id);
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
            views={["month"]}
            localizer={localizer}
            culture='ko'
            defaultDate={defaultDate}
            defaultView='month'
            events={diets}
            popup // 하루에 3개 이상 식단이 있으면 팝업으로 처리
            selectable
            onSelectSlot={clickSlotHandler} // calendar 각 칸 선택시 추가 기록 가능
            onSelectEvent={clickEventHandler} // calendar 각 식단 선택시 레시피 모달 확인 가능
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
