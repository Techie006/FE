import { useState, useCallback, useEffect } from "react";
import Chart from "react-apexcharts";

import RESP_CHAE from "../../server/response_chae";
// import { apis } from "../../shared/axios";
import Loader from "../common/Loader";
import HelpMsg from "../common/HelpMsg";
import Textbox from "../../elements/textboxes/Textbox";

// TODO API 결과값 받기!!
const Ingredients = (props) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [showMsg, setShowMsg] = useState(false);

  const get_data = useCallback(async () => {
    const resp = RESP_CHAE.STATISTICS.GET_STATE_SUCCESS;
    // const resp = RESP_CHAE.STATISTICS.GET_STATE_FAIL;
    // const resp = await apis.get_state();

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
  //   console.log(`[Ingredients] states: loading, showMsg, data`);
  //   console.log(loading);
  //   console.log(showMsg);
  //   console.log(data);
  // }

  const LABELS = ["만료", "임박", "정상"];
  const CHART_COLORS = ["#FF5C01", "#FFDD7C", "#74BDB2"];
  const COMMENTS = ["아주 바람직한 상태네요!", "노력이 필요해요..."];
  const options = {
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
    labels: LABELS,
    colors: CHART_COLORS,
    responsive: [{ breakpoint: "400px" }],
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
  };

  const percentage = data?.count;

  return (
    <>
      {loading ? <Loader /> : null}
      {!loading && showMsg ? (
        <HelpMsg
          msg='아직 입력하신 식재료가 없네요. 홈으로 가서 새로운 식재료를 추가해보세요!'
          goto='홈으로 가기'
          path={`/home`}
        />
      ) : null}

      {!loading && !showMsg ? (
        <>
          <Chart type='donut' series={percentage} options={options} />
          <Textbox content={COMMENTS[0]} />
        </>
      ) : null}
    </>
  );
};

export default Ingredients;
