import { useState, useCallback, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import styled from "styled-components";

import RESP from "../../server/response";
// import { apis } from "../../shared/axios";
import LoadingSpinner from "../../elements/atoms/LoadingSpinner";
import HelperButton from "../../elements/molecules/HelperButton";
import { ChartColors } from "../../styles/Colors";

const Categories = (props) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [showMsg, setShowMsg] = useState(false);

  const get_data = useCallback(async () => {
    const resp = RESP.STATISTICS.GET_CATEGORY_SUCCESS;
    // const resp = RESP.STATISTICS.GET_CATEGORY_FAIL;
    // const resp = await apis.get_category();

    const { content } = resp.data;

    // 식품군 모두 하나도 없는 상태 처리
    // 배열 비교
    if (JSON.stringify(content.count) === JSON.stringify([0, 0, 0, 0, 0])) {
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

  const LABELS = ["농산물", "축산물", "해산물", "기타", "음료류"];
  const CHART_COLORS = ChartColors.categories;
  // TODO isLogin 붙이기
  const counts = data === undefined ? data.count : [1, 1, 1, 1, 1];

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
        <StWrapper>
          <ReactApexChart
            type='donut'
            series={counts}
            height='85%'
            options={{
              chart: {
                fontFamily: "Noto Sans KR",
                fontSize: "12px",
                fontWeight: "500",
                toolbar: {
                  show: false,
                },
              },
              title: {
                text: "제품군 현황",
                align: "center",
              },
              dataLabels: {
                enabled: false,
              },
              legend: {
                position: "bottom",
              },
              labels: LABELS,
              colors: CHART_COLORS,
              tooltip: {
                y: {
                  formatter: (value) => `${value}개`,
                  title: {
                    formatter: (seriesName) => seriesName,
                  },
                },
                theme: "light",
                fillSeriesColor: false,
              },
              plotOptions: {
                pie: {
                  expandOnClick: false,
                  donut: {
                    size: "50%",
                  },
                },
              },
            }}
          />
        </StWrapper>
      ) : null}
    </>
  );
};

export default Categories;

const StWrapper = styled.div`
  height: 300px;
`;
