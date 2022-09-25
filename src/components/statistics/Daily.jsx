import { useState, useRef, useCallback, useEffect } from "react";
import styled from "styled-components";

import RESP from "../../server/response";
// import { apis } from "../../shared/axios";
import { ST3 } from "../../styles/Text";
import LoadingSpinner from "../../elements/atoms/LoadingSpinner";
import HelperButton from "../../elements/molecules/HelperButton";

import Category from "../../elements/molecules/Category";
import BarChart from "./ApexCharts/BarChart";

const Daily = (props) => {
  const chartInfo = {
    LABELS: {
      nutrients: ["탄수화물", "단백질", "지방"],
      calorie: "칼로리",
    },
    CRITERIAS: ["열량", "영양성분"],
    BASES: ["kcal", "g"],
    AXIS: ["어제", "오늘"],
    COLORS: {
      nutrients: ["#FFB356", "#FFDD7C", "#79A6DC"],
      calorie: ["#DFB078"],
    },
  };

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [showMsg, setShowMsg] = useState(false);

  const [criteria, setCriteria] = useState("열량");
  const base = useRef("kcal");

  const getData = useCallback(async () => {
    const resp = RESP.STATISTICS.GET_DAILY_SUCCESS;
    // const resp = RESP.STATISTICS.GET_DAILY_FAIL;
    // const resp = await apis.get_daily();

    const { result } = resp.data;

    // 사용자가 요리 완료한 레시피 내역이 없는 상태 처리
    if (!result) {
      setLoading(false);
      setShowMsg(true);
      return;
    }

    const {
      content: { statistics },
    } = resp.data;

    setLoading(false);
    setData(statistics);
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  // 칼로리 series	추출
  const calorieSeries = [
    {
      name: "칼로리",
      data: [data.yesterday?.calories, data.today?.calories],
    },
  ];

  // 영양성분 series	추출
  const NUTRIENTS = ["탄수화물", "단백질", "지방"];
  const nutrientsSeries = data.yesterday?.nutrients.map((nutrient, i) => {
    return {
      name: NUTRIENTS[i],
      data: [data.yesterday?.nutrients[i], data.today?.nutrients[i]],
    };
  });

  // barchart 분류 기준(열량/영양성분) 변경
  const clickHandler = (e) => {
    if (criteria === "열량") {
      setCriteria("영양성분");
      base.current = "kcal";
      return;
    }
    if (criteria === "영양성분") {
      setCriteria("열량");
      base.current = "g";
    }
  };

  return (
    <>
      <StHeader>
        <ST3>오늘 우리집 식재료 상태는?</ST3>
        <Category
          contents={["열량", "영양성분"]}
          onClick={clickHandler}
          selectedCategory={criteria}
          page='statistics'
        />
      </StHeader>
      {loading ? <LoadingSpinner /> : null}
      {!loading && showMsg ? (
        <HelperButton
          msg='최근 요리한 내역이 없어요. 냉장고 속 재료로 뚝딱 만들 수 있는 레시피를 확인해보세요!'
          content='추천 레시피 확인하기'
          page='section'
          path={`/`}
        />
      ) : null}
      {!loading && !showMsg ? (
        <BarChart
          height='300px'
          criteria={criteria}
          base={base.current}
          series={{ calorieSeries, nutrientsSeries }}
          chartInfo={chartInfo}
        />
      ) : null}
    </>
  );
};

export default Daily;

const StHeader = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
