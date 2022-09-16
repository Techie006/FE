import { useState, useCallback, useEffect } from "react";
import Chart from "react-apexcharts";
import styled from "styled-components";

// import RESP_CHAE from "../../server/response_chae";
import { apis } from "../../shared/axios";
import "./Chart.css";
import Loader from "../common/Loader";
import HelpMsg from "../common/HelpMsg";
import { StTitle } from "../../elements/texts/pageTexts";
import ButtonCategory from "../../elements/categories/ButtonCategory";

const Nutrients = (props) => {
  const NUTRIENTS = ["탄수화물", "단백질", "지방"];
  const VIEWS = {
    day: "일별",
    week: "주별",
    month: "월별",
  };
  const NUTRIENT_COLORS = ["#FFB356", "#FFDD7C", "#79A6DC"];

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [showMsg, setShowMsg] = useState(false);
  const [view, setview] = useState(VIEWS.day);

  const get_data = useCallback(async () => {
    // const resp = RESP_CHAE.STATISTICS.GET_NUTRIENTS_SUCCESS;
    // const resp = RESP_CHAE.STATISTICS.GET_NUTRIENTS_FAIL;

    const resp = await apis.get_nutrients_ratio({ view });

    const { result, content } = resp.data;

    if (!result) {
      setLoading(false);
      setShowMsg(true);
      return;
    }

    setLoading(false);
    setData({ ...content });
  }, [view]);

  useEffect(() => {
    get_data();
  }, [get_data, view]);

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
    if (view === content) {
      return;
    }
    switch (content) {
      case VIEWS.day:
        setview(VIEWS.day);
        break;
      case VIEWS.week:
        setview(VIEWS.week);
        break;
      case VIEWS.month:
        setview(VIEWS.month);
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
            <StTitle>나의 영양성분 섭취 변화</StTitle>
            <ButtonCategory
              contents={Object.values(VIEWS)}
              onClick={clickHandler}
              selectedCategory={view}
            />
          </StHeader>
          <Chart
            type='line'
            height='85%'
            series={nutrientsSeries}
            options={{
              chart: {
                fontFamily: "Noto Sans KR",
                fontSize: "12px",
                fontWeight: 500,
                toolbar: {
                  show: false,
                  tools: {
                    download: false,
                    zoom: false,
                    zoomin: false,
                    zoomout: false,
                  },
                },
              },
              xaxis: {
                type: "datetime",
                tooltip: {
                  enabled: false,
                },
                labels: {
                  format: view !== VIEWS.month ? `MM월 dd일` : `yy년 MM월`,
                  style: {
                    colors: new Array(7).fill("#939393"),
                    fontSize: "12px",
                    fontWeight: 500,
                  },
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
                  style: {
                    colors: new Array(7).fill("#939393"),
                    fontSize: "12px",
                    fontWeight: 500,
                  },
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
              colors: NUTRIENT_COLORS,
              storke: {
                curve: "smooth",
                width: 4,
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
                // for apex-chart x-axis trimming error
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
