import { useState, useCallback, useEffect } from "react";
import styled from "styled-components";

import RESP from "../../server/response";
import { apis } from "../../shared/axios";
import LoadingSpinner from "../../elements/atoms/LoadingSpinner";
import HelperButton from "../../elements/molecules/HelperButton";
import { ChartColors } from "../../styles/Colors";
import "./Chart.css";
import DonutChart from "./DonutChart";

const DueStatus = (props) => {
  const [loading, setLoading] = useState(true);
  const [showMsg, setShowMsg] = useState(false);
  const [data, setData] = useState({});

  const getData = useCallback(async () => {
    // MOCK API for test
    // const resp = RESP.STATISTICS.GET_STATE_SUCCESS;
    // const resp = RESP.STATISTICS.GET_STATE_FAIL;

    const resp = await apis.get_state();

    const {
      content: { count },
    } = resp.data;

    // 식재료가 하나도 없는 상태 처리
    if (JSON.stringify(count) === JSON.stringify([0, 0, 0])) {
      setLoading(false);
      setShowMsg(true);
      return;
    }

    setLoading(false);
    setData(count);
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  // TODO API 만료 -> 임박 -> 정상 순서로 받기
  const LABELS = ["임박", "만료", "정상"];
  const CHART_COLORS = ChartColors.due;

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

export default DueStatus;
