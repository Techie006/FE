import { useState, useRef, useCallback, useEffect } from "react";
import Chart from "react-apexcharts";
import styled from "styled-components";

import RESP from "../../server/response";
import "./Chart.css";
// import { apis } from "../../shared/axios";
import LoadingSpinner from "../../elements/atoms/LoadingSpinner";
import HelperButton from "../../elements/molecules/HelperButton";
import { H2 } from "../../styles/Text";
import Category from "../../elements/molecules/Category";

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

  const getData = useCallback(async () => {
    const resp = RESP.STATISTICS.GET_DAILY_SUCCESS;
    // const resp = RESP.STATISTICS.GET_DAILY_FAIL;
    // const resp = await apis.get_daily();

    const { content } = resp.data;

    // 식재료가 하나도 없는 상태 처리
    // 배열 비교
    if (JSON.stringify(content.count) === JSON.stringify([0, 0, 0])) {
      setLoading(false);
      setShowMsg(true);
      return;
    }

    setLoading(false);
    setData({ ...content });
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

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

  console.log(criteria);

  return (
    <>
      {loading ? <LoadingSpinner /> : null}
      {!loading && showMsg ? (
        <HelperButton
          msg='아직 입력하신 식재료가 없네요. 홈으로 가서 새로운 식재료를 추가해보세요!'
          content='홈으로 '
          path={`/home`}
          page='sesction'
        />
      ) : null}
      {!loading && !showMsg ? (
        <>
          <StHeader>
            <H2>오늘 우리 식단은?</H2>
            <Category
              contents={CRITERIAS}
              onClick={clickHandler}
              selectedCategory={criteria}
              page='statistics'
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
