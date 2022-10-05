import { useState, useCallback, useEffect } from "react";
import styled from "styled-components";

// import RESP from "../../server/response";
import { apis } from "../../shared/axios";
import { ST3 } from "../../styles/Text";
import LoadingSpinner from "../../elements/atoms/LoadingSpinner";
import HelperNav from "../../elements/molecules/HelperNav";
import DonutChart from "./ApexCharts/DonutChart";

const Ingredients = ({ fromMain = false }) => {
  const [loading, setLoading] = useState(true);
  const [showMsg, setShowMsg] = useState(false);
  const [data, setData] = useState({
    due: [],
    category: [],
  });

  // ApexChart에 전달될 차트 관련 정보
  const ChartInfo = {
    LABELS: {
      due: ["만료", "임박", "정상"],
      category: ["농산물", "축산물", "해산물", "음료류", "기타"],
    },
    CHART_COLORS: {
      due: ["#FF7528", "#FADD8A", "#84BBB2"],
      category: ["#FFDD7C", "#FFB356", "#FF8E42", "#79A6DC", "#74BDB2"],
    },
  };

  const getData = useCallback(async (type) => {
    let resp = {};
    let empty = [];
    if (type === "due") {
      // MOCK API
      // resp = RESP.STATISTICS.GET_STATE_SUCCESS;
      // resp = RESP.STATISTICS.GET_STATE_FAIL;

      resp = await apis.get_state();
      empty = [0, 0, 0];
    }
    if (type === "category") {
      // MOCK API
      // resp = RESP.STATISTICS.GET_CATEGORY_SUCCESS;
      // resp = RESP.STATISTICS.GET_CATEGORY_FAIL;

      resp = await apis.get_category();
      empty = [0, 0, 0, 0, 0];
    }

    const {
      content: { count },
    } = resp.data;

    // 식재료가 하나도 없는 상태 처리
    if (JSON.stringify(count) === JSON.stringify(empty)) {
      setLoading(false);
      setShowMsg(true);
      return;
    }

    // 식재료 통계 데이터 컴포넌트에 반영
    setData((prev) => ({ ...prev, [type]: count }));
    setLoading(false);
  }, []);

  useEffect(() => {
    getData("due");

    // 메인 페이지에서 요청한 경우 카테고리별 분류는 보여주지 않음
    if (!fromMain) {
      getData("category");
    }
  }, [getData, fromMain]);

  return (
    <>
      <ST3>오늘 우리집 식재료 상태는?</ST3>
      {/* {loading ? <LoadingSpinner /> : null} */}
      {!loading && showMsg ? (
        <HelperNav
          msg='아직 추가된 내용이 없어요./ 우리집 식재료를 추가해서/ 나만의 통계를 확인해보세요!'
          content='재료 추가하기'
          page='statistics'
          path={`/`}
        />
      ) : null}
      {!loading && !showMsg ? (
        <StLayout>
          {/* Due Status */}
          <DonutChart
            height='300px'
            padding='28px 0px 0px 0px'
            series={data.due}
            title='식재료 유통기한 현황'
            labels={ChartInfo.LABELS.due}
            colors={ChartInfo.CHART_COLORS.due}
          />
          {/* Category Status (statistics 페이지에서만 보임) */}
          {!fromMain ? (
            <DonutChart
              height='300px'
              padding='28px 0px 0px 0px'
              series={data.category}
              title='식재료 식품분류 현황'
              labels={ChartInfo.LABELS.category}
              colors={ChartInfo.CHART_COLORS.category}
            />
          ) : null}
        </StLayout>
      ) : null}
    </>
  );
};

export default Ingredients;

// Section 내부 분할
const StLayout = styled.div`
  // @pc, tablet 2열 분할
  display: grid;
  justify-items: center;
  justify-content: space-between;
  grid-template-columns: repeat(2, 1fr);

  // @mobile 1열
  @media all and (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;
