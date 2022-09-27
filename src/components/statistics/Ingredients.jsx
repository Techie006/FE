import { useState, useCallback, useEffect } from "react";
import styled from "styled-components";

// import RESP from "../../server/response";
import { apis } from "../../shared/axios";
import { ST3 } from "../../styles/Text";
import { ChartColors } from "../../styles/Colors";
import LoadingSpinner from "../../elements/atoms/LoadingSpinner";
import HelperButton from "../../elements/molecules/HelperButton";
import DonutChart from "./ApexCharts/DonutChart";

const Ingredients = (props) => {
  const [loading, setLoading] = useState(true);
  const [showMsg, setShowMsg] = useState(false);
  const [data, setData] = useState({
    due: [],
    category: [],
  });

  const ChartInfo = {
    LABELS: {
      due: ["만료", "임박", "정상"],
      category: ["농산물", "축산물", "해산물", "음료류", "기타"],
    },
    CHART_COLORS: {
      due: ChartColors.due,
      category: ChartColors.category,
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

    setData((prev) => ({ ...prev, [type]: count }));
    setLoading(false);
  }, []);

  useEffect(() => {
    getData("due");
    getData("category");
  }, [getData]);

  return (
    <>
      <ST3>오늘 우리집 식재료 상태는?</ST3>
      {loading ? <LoadingSpinner /> : null}
      {!loading && showMsg ? (
        <HelperButton
          msg='아직 입력한 식재료가 없어요. 재료를 추가하고 나만의 통계를 확인해보세요!'
          content='재료 추가하기'
          page='section'
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
          {/* Category Status */}
          <DonutChart
            height='300px'
            padding='28px 0px 0px 0px'
            series={data.category}
            title='식재료 식품분류 현황'
            labels={ChartInfo.LABELS.category}
            colors={ChartInfo.CHART_COLORS.category}
          />
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
