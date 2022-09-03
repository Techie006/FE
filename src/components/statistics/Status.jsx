import { useState, useCallback, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

import RESP_CHAE from "../../server/response_chae";
import { apis } from "../../shared/axios";
import SectionLayout from "../common/SectionLayout";
import Loader from "../common/Loader";
import HelpMsg from "../common/HelpMsg";

const Status = (props) => {
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
    }

    setLoading(false);
    setData({ ...content });
  }, []);

  useEffect(() => {
    get_data();
  }, [get_data]);

  if (process.env.REACT_APP_DEBUG_ON) {
    console.log(`[Status] states: loading, showMsg, data`);
    console.log(loading);
    console.log(showMsg);
    console.log(data);
  }

  const labels = ["만료", "임박", "정상"];
  const percentage = data?.count;

  return (
    <SectionLayout>
      <div>Status</div>
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
          series={percentage}
          width={window.innerWidth > 500 ? "50%" : "100%"}
          options={{
            dataLabels: {
              enabled: false,
            },
            legend: {
              show: true,
              position: "bottom",
            },
            labels: labels,
            tooltip: {
              y: {
                formatter: (value) => `${value}개`,
              },
            },
          }}
        />
      ) : null}
    </SectionLayout>
  );
};

export default Status;
