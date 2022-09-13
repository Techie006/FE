import { useState, useCallback, useEffect } from "react";
import Chart from "react-apexcharts";
import styled from "styled-components";

import RESP_CHAE from "../../server/response_chae";
// import { apis } from "../../shared/axios";
import Loader from "../common/Loader";
import HelpMsg from "../common/HelpMsg";
import { StTitle } from "../../elements/texts/pageTexts";
import UnderlineCategory from "../../elements/categories/UnderlineCategory";

const Calories = (props) => {
  const CALORIE = "칼로리";
  const FILTERS = {
    day: "일별",
    week: "주별",
    month: "월별",
  };

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [showMsg, setShowMsg] = useState(false);
  const [filter, setFilter] = useState(FILTERS.day);

  const get_data = useCallback(async () => {
    const resp = RESP_CHAE.STATISTICS.GET_CALORIES_SUCCESS;
    // const resp = RESP_CHAE.STATISTICS.GET_CALORIES_FAIL;
    // const resp = await apis.get_calories_ratio({filter});

    const { result, content } = resp.data;

    if (!result) {
      setLoading(false);
      setShowMsg(true);
      return;
    }

    setLoading(false);
    setData({ ...content.statistics });
  }, []);

  useEffect(() => {
    get_data();
  }, [get_data, filter]);

  // if (process.env.REACT_APP_DEBUG_ON) {
  //   console.log(`[Calories] states: loading, showMsg, data`);
  //   console.log(loading);
  //   console.log(showMsg);
  //   console.log(data);
  // }

  const caloriesSeries = [
    {
      name: CALORIE,
      data: data?.calories,
    },
  ];

  const labels = data.days?.map((day) => new Date(day).toUTCString());

  const clickHandler = (e) => {
    const content = e.target.textContent;
    if (filter === content) {
      return;
    }
    switch (content) {
      case FILTERS.day:
        setFilter(FILTERS.day);
        break;
      case FILTERS.week:
        setFilter(FILTERS.week);
        break;
      case FILTERS.month:
        setFilter(FILTERS.month);
        break;
      default:
        break;
    }
  };

  return (
    <>
      {loading ? <Loader /> : null}
      {!loading && showMsg ? (
        <HelpMsg
          msg='아직 입력하신 식재료가 없네요. 홈으로 가서 새로운 식재료를 추가해보세요!'
          goto='홈으로 '
          path={`/home`}
        />
      ) : null}
      {!loading && !showMsg ? (
        <>
          <StHeader>
            <StTitle>나의 열량 섭취 변화</StTitle>
            <UnderlineCategory
              contents={Object.values(FILTERS)}
              onClick={clickHandler}
              selectedCategory={filter}
            />
          </StHeader>
          <Chart
            type='line'
            series={caloriesSeries}
            height='80%'
            options={{
              chart: {
                toolbar: {
                  show: false,
                },
              },
              dataLabels: {
                enabled: false,
              },
              legend: {
                show: true,
                position: "bottom",
              },
              labels: labels,
              xaxis: {
                type: "datetime",
                // labels: {
                //   format: `yy년 MM월`,
                // },
                axisTicks: {
                  show: false,
                },
                axisBorder: {
                  show: false,
                },
              },
              tooltip: {
                y: {
                  formatter: (value) => `${value}kcal`,
                },
              },
              grid: {
                show: false,
              },
            }}
          />
        </>
      ) : null}
    </>
  );
};

export default Calories;

const StHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
