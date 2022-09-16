import { useState, useCallback, useEffect } from "react";
import Chart from "react-apexcharts";
import styled from "styled-components";

// import RESP_CHAE from "../../server/response_chae";
import { apis } from "../../shared/axios";
import Loader from "../common/Loader";
import HelpMsg from "../common/HelpMsg";
import { StTitle } from "../../elements/texts/pageTexts";
import ButtonCategory from "../../elements/categories/ButtonCategory";

const Calories = (props) => {
  const CALORIE = "칼로리";
  const VIEWS = {
    day: "일별",
    week: "주별",
    month: "월별",
  };

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [showMsg, setShowMsg] = useState(false);
  const [view, setview] = useState(VIEWS.day);

  const get_data = useCallback(async () => {
    // const resp = RESP_CHAE.STATISTICS.GET_CALORIES_SUCCESS;
    // const resp = RESP_CHAE.STATISTICS.GET_CALORIES_FAIL;
    const resp = await apis.get_calories_ratio({ view });

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
  }, [get_data, view]);

  const caloriesSeries = [
    {
      name: CALORIE,
      data: data?.calories,
    },
  ];

  const labels = data.days?.map((day) => new Date(day).toUTCString());
  const CHART_COLORS = ["#FFDD7C", "#FFDD7C", "#74BDB2"];

  const clickHandler = (e) => {
    const content = e.target.textContent;
    if (view === content) {
      return;
    }
    switch (content) {
      case VIEWS.day:
        setview(VIEWS.day);
        return;
      case VIEWS.week:
        setview(VIEWS.week);
        return;
      case VIEWS.month:
        setview(VIEWS.month);
        return;
      default:
        return;
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
            <ButtonCategory
              contents={Object.values(VIEWS)}
              onClick={clickHandler}
              selectedCategory={view}
            />
          </StHeader>
          <Chart
            type='line'
            series={caloriesSeries}
            height='70%'
            options={{
              chart: {
                fontFamily: "Noto Sans KR",
                fontSize: "12px",
                fontWeight: "700",
                toolbar: {
                  show: false,
                },
              },
              xaxis: {
                type: "datetime",
                tooltip: {
                  enabled: false,
                },
                labels: {
                  format: view !== VIEWS.month ? `MM월 dd일` : `yy년 MM월`,
                },
                axisTicks: {
                  show: false,
                },
                axisBorder: {
                  show: false,
                },
              },
              yaxis: {
                labels: {
                  formatter: (value) => `${value}kcal`,
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
              colors: CHART_COLORS,
              storke: {
                curve: "smooth",
                width: 3,
              },
              markers: {
                size: 1,
              },
              tooltip: {
                x: {
                  show: false,
                },
                y: {
                  formatter: (value) => `${value}kcal`,
                },
              },
              grid: {
                show: false,
                // TODO for apex-chart x-axis trimming error
                // https://github.com/apexcharts/apexcharts.js/issues/305
                padding: {
                  left: 50,
                  right: 40,
                },
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
