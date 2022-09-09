import React, { useState, useMemo, useCallback } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";
import SmallButton from "../../elements/buttons/SmallButton";
import Toolbar from "./Toolbar";

const RecipeCalendar = () => {
  const VIEWS = ["Month", "Day"];
  const [view, setView] = useState(VIEWS[0]);

  moment.locale("ko-KR");
  const localizer = momentLocalizer(moment);

  const { defaultDate } = useMemo(
    () => ({
      defaultDate: new Date(),
    }),
    []
  );

  const myEventList = [
    {
      start: "2022-08-31",
      end: "2022-09-01",
      title: "special event",
      category: "아침",
    },
    {
      start: "2022-09-01",
      end: "2022-09-01",
      title: "special event",
      category: "아침",
    },
    {
      start: "2022-09-01",
      end: "2022-09-01",
      title: "special event",
      category: "아침",
    },
    {
      start: "2022-09-01",
      end: "2022-09-01",
      title: "special event",
      category: "저녁",
    },
    {
      start: "2022-09-01",
      end: "2022-09-01",
      title: "special event",
      category: "점심",
    },
    {
      start: "2022-09-01",
      end: "2022-09-01",
      title: "special event",
      category: "간식",
    },
  ];

  const scheduleList = myEventList.map((event, idx) => {
    const startTimeFormat = event.start.replace(/-/g, "/");
    const endTimeFormat = event.end.replace(/-/g, "/");
    return {
      title: event.title,
      allDay: false,
      start: new Date(startTimeFormat),
      end: new Date(endTimeFormat),
      category: event.category,
    };
  });

  const clickHandler = () => {
    if (view === VIEWS[0]) {
      setView(VIEWS[1]);
      return;
    }
    setView(VIEWS[0]);
  };

  return (
    <>
      Cal
      <SmallButton type='button' content={view} onClick={clickHandler} />
      <div>
        <Calendar
          defaultDate={defaultDate}
          events={scheduleList}
          style={{ height: "500px", width: "80%" }}
          localizer={localizer}
          components={{
            toolbar: Toolbar,
          }}
          defaultView='month'
        />
      </div>
    </>
  );
};

export default RecipeCalendar;
