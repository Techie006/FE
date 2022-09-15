import React, { useState, useMemo, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "moment/locale/ko";

// import { apis } from "../../shared/axios";
import RESP_CHAE from "../../server/response_chae";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "./style.css";
import Loader from "../common/Loader";
import Toolbar from "./Toolbar";

const RecipeCalendar = () => {
  const [loading, setLoading] = useState(true);
  const [diets, setDiets] = useState([]);

  moment.locale("ko-KR");
  const localizer = momentLocalizer(moment);

  const { defaultDate } = useMemo(
    () => ({
      defaultDate: new Date(),
    }),
    []
  );

  const getData = async () => {
    const resp = RESP_CHAE.CALENDAR.GET_MONTHLY_DIETS_SUCCESS;
    // const resp = await apis.get_monthly_diets();

    const {
      result,
      content,
      status: { message },
    } = resp.data;

    if (!result) {
      alert(message);
      return;
    }

    const diets = content.recipes.map((recipe) => {
      const startTimeFormat = recipe.day.replace(/-/g, "/");
      return {
        id: recipe.id,
        recipe_id: recipe.recipe_id,
        title: recipe.recipe_name,
        allDay: false,
        start: new Date(startTimeFormat),
        end: new Date(startTimeFormat),
        category: recipe.time,
      };
    });

    setDiets(diets);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const clickSlotHandler = (slot) => {
    console.log(slot);
  };

  const clickEventHandler = (event) => {
    console.log(event);
  };

  return (
    <>
      {loading ? <Loader /> : null}
      {!loading ? (
        <Calendar
          style={{ height: "500px", width: "90%", margin: "auto" }}
          components={{
            toolbar: Toolbar,
          }}
          localizer={localizer}
          culture='ko'
          defaultDate={defaultDate}
          defaultView='month'
          events={diets}
          popup
          selectable
          onSelectSlot={clickSlotHandler}
          onSelectEvent={clickEventHandler}
        />
      ) : null}
    </>
  );
};

export default RecipeCalendar;
