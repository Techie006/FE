import { useState, useCallback, useEffect } from "react";

import styled from "styled-components";

// import RESP from "../../server/response";
import { apis } from "../../shared/axios";
import { ST3 } from "../../styles/Text";
import Category from "../../elements/molecules/Category";
import LoadingSpinner from "../../elements/atoms/LoadingSpinner";
import HelperNav from "../../elements/molecules/HelperNav";
import LineChart from "./ApexCharts/LineChart";

const Changes = ({ type }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [showMsg, setShowMsg] = useState(false);
  const [view, setView] = useState("일별");

  const get_data = useCallback(
    async (view) => {
      let resp = {};
      if (type === "calorie") {
        // MOCK APIs
        // resp = RESP.STATISTICS.GET_CALORIES_SUCCESS;
        // resp = RESP.STATISTICS.GET_CALORIES_FAIL;

        resp = await apis.get_calories_ratio(view);
      }
      if (type === "nutrients") {
        // MOCK APIs
        // resp = RESP.STATISTICS.GET_NUTRIENTS_SUCCESS;
        // resp = RESP.STATISTICS.GET_NUTRIENTS_FAIL;

        resp = await apis.get_nutrients_ratio(view);
      }

      const {
        content: { empty, statistics },
      } = resp.data;

      // 	사용자가 요리한 레시피 내역이 없는 경우 처리
      if (empty) {
        setLoading(false);
        setShowMsg(true);
        return;
      }

      // 사용자가 요리한 레시피 내역이 있는 경우 처리
      setLoading(false);
      setData(statistics);
    },
    [type]
  );

  useEffect(() => {
    get_data(view);
  }, [get_data, view]);

  let calorieSeries = [];
  let nutrientsSeries = [];
  let labels = [];

  // 칼로리 section 이라면 칼로리 관련 정보 추출
  if (type === "calorie") {
    // 칼로리 series 추출
    calorieSeries = [
      {
        name: "칼로리",
        data: data?.calories,
      },
    ];

    // 날짜 label 추출
    labels = data.days?.map((day) => new Date(day).toUTCString());
  }

  // 영양성분 section 이라면 칼로리 관련 정보 추출
  if (type === "nutrients") {
    // 영양성분 series 추출
    const NUTRIENTS = ["탄수화물", "단백질", "지방"];
    for (let i = 1; i < Object.keys(data).length; i++) {
      nutrientsSeries.push({
        name: NUTRIENTS[i - 1],
        data: data?.[Object.keys(data)[i]],
      });
    }

    // 날짜 label 추출
    labels = data?.days;
  }

  const chartInfo = {
    series: type === "calorie" ? calorieSeries : nutrientsSeries,
    labels: labels,
    base: type === "calorie" ? "kcal" : "g",
    colors:
      type === "calorie" ? ["#DFB078"] : ["#FFB356", "#FADD8A", "#79A6DC"],
  };

  const clickHandler = (e) => {
    const content = e.target.textContent;
    // 이미 선택된 뷰라면 클릭 처리하지 않음
    if (content === view) {
      return;
    }
    // 뷰 전환
    setView(content);
  };

  return (
    <>
      <StHeader>
        <ST3>나의 열량 섭취 변화</ST3>
        <Category
          contents={["일별", "주별", "월별"]}
          onClick={clickHandler}
          selectedCategory={view}
          page='statistics'
          func='filter'
        />
      </StHeader>
      {loading ? <LoadingSpinner /> : null}
      {!loading && showMsg ? (
        <HelperNav
          msg='아직 입력하신 식재료가 없네요. 홈으로 가서 새로운 식재료를 추가해보세요!'
          content='재료 추가하기'
          path={`/`}
          page='statistics'
        />
      ) : null}
      {!loading && !showMsg ? (
        <>
          <LineChart height='300px' view={view} chartInfo={chartInfo} />
        </>
      ) : null}
    </>
  );
};

export default Changes;

const StHeader = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
