import { useState, useCallback, useEffect } from "react";

import styled from "styled-components";

// import RESP from "../../server/response";
import { apis } from "../../shared/axios";
import "./Chart.css";
import { ST3 } from "../../styles/Text";
import Category from "../../elements/molecules/Category";
import LoadingSpinner from "../../elements/atoms/LoadingSpinner";
import HelperButton from "../../elements/molecules/HelperButton";
import LineChart from "./LineChart";

const Calories = (props) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [showMsg, setShowMsg] = useState(false);
  const [view, setView] = useState("day");
  const [viewKor, setViewKor] = useState("일별");

  const get_data = useCallback(async (view) => {
    // const resp = RESP.STATISTICS.GET_CALORIES_SUCCESS;
    // const resp = RESP.STATISTICS.GET_CALORIES_FAIL;
    const resp = await apis.get_calories_ratio({ view });

    // const { result } = resp.data;
    const { result, content: statistics } = resp.data;

    // 	사용자가 요리한 데이터 내역이 없는 경우 처리
    if (!result) {
      setLoading(false);
      setShowMsg(true);
      return;
    }

    // const { content: {statistics} } = resp.data;

    setLoading(false);
    setData(statistics);
  }, []);

  useEffect(() => {
    get_data(view);
  }, [get_data, view]);

  // 칼로리 series 추출
  const calorieSeries = [
    {
      name: "칼로리",
      data: data?.calories,
    },
  ];

  // 날짜 label 추출
  const labels = data.days?.map((day) => new Date(day).toUTCString());

  const chartInfo = {
    series: calorieSeries,
    labels: labels,
    base: "kcal",
    colors: ["#DFB078"],
  };

  const clickHandler = (e) => {
    const content = e.target.textContent;
    // 이미 선택된 뷰라면 클릭 처리하지 않음
    if (content === view) {
      return;
    }
    // 뷰 전환
    // setView(content);
    setViewKor(content);
    switch (content) {
      case "일별":
        setView("day");
        break;
      case "주별":
        setView("week");
        break;
      case "월별":
        setView("month");
        break;
      default:
        break;
    }
  };

  return (
    <>
      <StHeader>
        <ST3>나의 열량 섭취 변화</ST3>
        <Category
          contents={["일별", "주별", "월별"]}
          onClick={clickHandler}
          selectedCategory={viewKor}
          page='statistics'
        />
      </StHeader>
      {loading ? <LoadingSpinner /> : null}
      {!loading && showMsg ? (
        <HelperButton
          msg='아직 입력하신 식재료가 없네요. 홈으로 가서 새로운 식재료를 추가해보세요!'
          content='재료 추가하기'
          path={`/`}
          page='section'
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

export default Calories;

const StHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;
