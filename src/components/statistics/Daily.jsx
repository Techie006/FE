import { useState, useRef, useCallback, useEffect } from "react";
import Chart from "react-apexcharts";
import styled from "styled-components";

// import RESP_CHAE from "../../server/response_chae";
import "./Chart.css";
import { apis } from "../../shared/axios";
import Loader from "../common/Loader";
import HelpMsg from "../common/HelpMsg";
import { StTitle } from "../../elements/texts/pageTexts";
import ButtonCategory from "../../elements/categories/ButtonCategory";

const Daily = (props) => {
  const CRITERIAS = ["열량", "영양성분"];
  const CALORIE = "칼로리";
  const NUTRIENTS = ["탄수화물", "단백질", "지방"];
  const LABELS = ["어제", "오늘"];
  const BASES = ["kcal", "g"];
  const NUTRIENTS_COLORS = ["#FFB356", "#FFDD7C", "#79A6DC"];
  const CALORIE_COLOR = ["#DFB078"];

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [showMsg, setShowMsg] = useState(false);
  const [criteria, setCriteria] = useState(CRITERIAS[0]);

  const base = useRef(BASES[0]);

  const get_data = useCallback(async () => {
    // const resp = RESP_CHAE.STATISTICS.GET_DAILY_SUCCESS;
    // const resp = RESP_CHAE.STATISTICS.GET_DAILY_FAIL;
    const resp = await apis.get_daily();

    const { result, content } = resp.data;

    if (!result) {
      setLoading(false);
      setShowMsg(true);
      return;
    }

    setLoading(false);
    setData({ ...content });
  }, []);

  useEffect(() => {
    get_data();
  }, [get_data]);

  const caloriesSeries = [
    {
      name: CALORIE,
      data: [data.yesterday?.calories || 0, data.today?.calories || 0],
    },
  ];

  const nutrientsSeries = data.yesterday?.nutrients.map((nutrient, i) => {
    return {
      name: NUTRIENTS[i],
      data: [data.yesterday?.nutrients[i] || 0, data.today?.nutrients[i] || 0],
    };
  });

  const clickHandler = (e) => {
    if (criteria === CRITERIAS[0]) {
      setCriteria(CRITERIAS[1]);
      base.current = BASES[1];
      return;
    }
    setCriteria(CRITERIAS[0]);
    base.current = BASES[0];
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
            <StTitle>오늘 우리 식단은?</StTitle>
            <ButtonCategory
              contents={CRITERIAS}
              onClick={clickHandler}
              selectedCategory={criteria}
            />
          </StHeader>
          <Chart
            type='bar'
            height='85%'
            series={
              criteria === CRITERIAS[0] ? caloriesSeries : nutrientsSeries
            }
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
              plotOptions: {
                bar: {
                  horizontal: true,
                },
              },
              xaxis: {
                axisBorder: {
                  show: false,
                },
                labels: {
                  formatter: (value) => {
                    let num = Number(value);
                    if (num % 1 === 0) {
                      return `${value}${base.current}`;
                    }
                    return `${Number(value).toFixed(1)}${base.current}`;
                  },
                  style: {
                    colors: new Array(7).fill("#939393"),
                    fontSize: "12px",
                    fontWeight: 500,
                  },
                },
                axisTicks: {
                  show: false,
                },
              },
              yaxis: {
                axisBorder: {
                  show: false,
                },
                axisTicks: {
                  show: false,
                },
                labels: {
                  style: {
                    colors: new Array(2).fill("#939393"),
                    fontSize: "12px",
                    fontWeight: 500,
                  },
                },
              },
              dataLabels: {
                enabled: false,
              },
              labels: LABELS,
              colors:
                criteria === CRITERIAS[0] ? CALORIE_COLOR : NUTRIENTS_COLORS,
              tooltip: {
                x: {
                  show: false,
                },
                y: {
                  formatter: (value) => `${value}${base.current}`,
                },
              },
              legend: {
                showForSingleSeries: true,
                markers: {
                  radius: 50,
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

export default Daily;

const StHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
