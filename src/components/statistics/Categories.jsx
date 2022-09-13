import { useState, useCallback, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import styled from "styled-components";

import RESP_CHAE from "../../server/response_chae";
// import { apis } from "../../shared/axios";
import Loader from "../common/Loader";
import HelpMsg from "../common/HelpMsg";

// TODO 불필요 한 것 같음...
// TODO api 변경하기 -> 상위 3개만 가져오도록 처리할지, 아니면 무한 스크롤로 처리할지?
// TODO label 한국어로 바꾸기 오는 API 형태 배열로 바꾸기.
const Categories = (props) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [showMsg, setShowMsg] = useState(false);

  const get_data = useCallback(async () => {
    const resp = RESP_CHAE.STATISTICS.GET_CATEGORY_SUCCESS;
    // const resp = RESP_CHAE.STATISTICS.GET_CATEGORY_FAIL;
    // const resp = await apis.get_category();

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

  // if (process.env.REACT_APP_DEBUG_ON) {
  //   console.log(`[Categories] states: loading, showMsg, data`);
  //   console.log(loading);
  //   console.log(showMsg);
  //   console.log(data);
  // }

  const labels = Object.keys(data);
  const nums = Object.values(data);
  // let diagram = labels?.map((label, i) => (
  //   <StCategory key={i}>{`${label} : ${nums[i]}`}</StCategory>
  // ));
  // diagram = diagram.slice(0, 3);

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
        <ReactApexChart
          type='donut'
          series={nums}
          height='80%'
          options={{
            title: {
              text: "우리집 재료 현황",
              align: "center",
            },
            dataLabels: {
              enabled: false,
            },
            legend: {
              fontSize: "12px",
              fontWeight: "500",
              fontFamily: "Noto Sans KR",
              position: "bottom",
            },
            labels: labels,
            // colors: CHART_COLORS,
            tooltip: {
              style: {
                fontSize: "12px",
                fontWeight: "500",
                fontFamily: "Noto Sans KR",
              },
              y: {
                formatter: (value) => `${value}개`,
                title: {
                  formatter: (seriesName) => seriesName,
                },
              },
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
      ) : null}
    </>
  );
};

export default Categories;

const StCategory = styled.div`
  background-color: tomato;
  /* background-color: ${(props) => props.theme.section.box.background}; */
  border-radius: ${(props) => props.theme.section.box.borderRadius};
  box-shadow: ${(props) => props.theme.section.box.boxShadow};

  display: flex;
  align-items: center;
  text-align: center;

  font-weight: ${(props) => props.theme.section.box.fontWeight};
  font-size: ${(props) => props.theme.section.box.fontWeight};
  line-height: ${(props) => props.theme.section.box.lineHeight};
  &:hover {
    cursor: default;
  }
`;
