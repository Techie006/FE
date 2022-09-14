import { useState, useCallback, useEffect } from "react";
import Chart from "react-apexcharts";
import styled from "styled-components";

import RESP_CHAE from "../../server/response_chae";
// import { apis } from "../../shared/axios";
import Loader from "../common/Loader";
import HelpMsg from "../common/HelpMsg";
import { StTitle } from "../../elements/texts/pageTexts";
import UnderlineCategory from "../../elements/categories/UnderlineCategory";

const Nutrients = (props) => {
  const NUTRIENTS = ["탄수화물", "단백질", "지방", "나트륨"];
  const FILTERS = {
    day: "일별",
    week: "주별",
    month: "월별",
  };
  const CHART_COLORS = ["#FF5C01", "#FFDD7C", "#74BDB2"];

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [showMsg, setShowMsg] = useState(false);
  const [filter, setFilter] = useState(FILTERS.day);

  const get_data = useCallback(async () => {
    const resp = RESP_CHAE.STATISTICS.GET_NUTRIENTS_SUCCESS;
    // const resp = RESP_CHAE.STATISTICS.GET_NUTRIENTS_FAIL;
    // const resp = await apis.get_nutrients_ratio({filter});

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
  //   console.log(`[Nutrients] states: loading, showMsg, data`);
  //   console.log(loading);
  //   console.log(showMsg);
  //   console.log(data);
  // }

  const labels = data?.days;
  let nutrientsSeries = [];
  for (let i = 1; i < Object.keys(data).length; i++) {
    nutrientsSeries.push({
      name: NUTRIENTS[i - 1],
      data: data?.[Object.keys(data)[i]],
    });
  }

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
            <StTitle>나의 영양 성분 섭취 변화</StTitle>
            <UnderlineCategory
              contents={Object.values(FILTERS)}
              onClick={clickHandler}
              selectedCategory={filter}
            />
          </StHeader>
          <Chart
            type='line'
            height='80%'
            series={nutrientsSeries}
            options={{
              chart: {
                fontFamily: "Noto Sans KR",
                fontSize: "12px",
                fontWeight: "700",
                toolbar: {
                  show: false,
                },
                stacked: true,
              },
              xaxis: {
                type: "datetime",
                tooltip: {
                  enabled: false,
                },
                labels: {
                  format: filter !== FILTERS.month ? `MM월 dd일` : `yy년 MM월`,
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
                  formatter: (value) => `${value}g`,
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
                  formatter: (value) => `${value}g`,
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

export default Nutrients;

const StHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
