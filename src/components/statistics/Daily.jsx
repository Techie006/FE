import { useState, useCallback, useEffect } from "react";
import ReactApexChart from "react-apexcharts";

import RESP_CHAE from "../../server/response_chae";
import { apis } from "../../shared/axios";
import SectionLayout from "../common/SectionLayout";
import Loader from "../common/Loader";
import HelpMsg from "../common/HelpMsg";

const Daily = (props) => {
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
    }

    setLoading(false);
    setData({ ...content });
  }, []);

  useEffect(() => {
    get_data();
  }, [get_data]);

  // if (process.env.REACT_APP_DEBUG_ON) {
  //   console.log(`[Daily] states: loading, showMsg, data`);
  //   console.log(loading);
  //   console.log(showMsg);
  //   console.log(data);
  // }

  const labels = Object.keys(data);
  const nums = Object.values(data);
  const diagram = labels?.map((label, i) => (
    <div>
      <div>
        {label}: {nums[i]}
      </div>
    </div>
  ));

  return (
    <SectionLayout>
      <div>Daily</div>
      {loading ? <Loader /> : null}
      {!loading && showMsg ? (
        <HelpMsg
          msg='아직 입력하신 식재료가 없네요. 홈으로 가서 새로운 식재료를 추가해보세요!'
          goto='홈으로 '
          path={`/home`}
        />
      ) : null}
      {!loading && !showMsg ? diagram : null}
    </SectionLayout>
  );
};

export default Daily;
