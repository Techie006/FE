import { useState, useCallback, useEffect } from "react";
import styled from "styled-components";

import RESP from "../../server/response";
import { apis } from "../../shared/axios";
import LoadingSpinner from "../../elements/atoms/LoadingSpinner";
import HelperButton from "../../elements/molecules/HelperButton";
import { ChartColors } from "../../styles/Colors";
import DonutChart from "./DonutChart";

const CategoryStatus = (props) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [showMsg, setShowMsg] = useState(false);

  const get_data = useCallback(async () => {
    // MOCK API
    // const resp = RESP.STATISTICS.GET_CATEGORY_SUCCESS;
    // const resp = RESP.STATISTICS.GET_CATEGORY_FAIL;

    const resp = await apis.get_category();

    const {
      content: { count },
    } = resp.data;

    // 식품군 모두 하나도 없는 상태 처리
    if (JSON.stringify(count) === JSON.stringify([0, 0, 0, 0, 0])) {
      setLoading(false);
      setShowMsg(true);
      return;
    }

    setLoading(false);

    setData(count);
  }, []);

  useEffect(() => {
    get_data();
  }, [get_data]);

  const LABELS = ["농산물", "축산물", "해산물", "기타", "음료류"];
  const CHART_COLORS = ChartColors.category;

  return (
    <>
      {loading ? <LoadingSpinner /> : null}
      {!loading && showMsg ? (
        <HelperButton
          msg='아직 입력한 식재료가 없네요. 식재료를 추가하고 나만의 통계를 확인해보세요.'
          content='재료 추가하기'
          page='statistics'
          path={`/`}
        />
      ) : null}
      {!loading && !showMsg ? (
        <DonutChart
          height='300px'
          padding='28px 0px 0px 0px'
          series={data}
          title='유통기한 현황'
          labels={LABELS}
          colors={CHART_COLORS}
        />
      ) : null}
    </>
  );
};

export default CategoryStatus;

const StWrapper = styled.div`
  height: 300px;
`;
