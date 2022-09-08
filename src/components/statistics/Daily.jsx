import { useState, useRef, useCallback, useEffect } from "react";
import Chart from "react-apexcharts";

import RESP_CHAE from "../../server/response_chae";
// import { apis } from "../../shared/axios";

import Loader from "../common/Loader";
import HelpMsg from "../common/HelpMsg";
import UnderlineCategory from "../../elements/categories/UnderlineCategory";

const Daily = (props) => {
  const CRITERIAS = ["열량", "성분"];
  const CALORIE = "칼로리";
  const NUTRIENTS = ["탄수화물", "단백질", "지방"];
  const LABELS = ["어제", "오늘"];
  const BASES = ["kcal", "g"];

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [showMsg, setShowMsg] = useState(false);
  const [criteria, setCriteria] = useState(CRITERIAS[0]);

  const base = useRef(BASES[0]);

  const get_data = useCallback(async () => {
    const resp = RESP_CHAE.STATISTICS.GET_DAILY_SUCCESS;
    // const resp = RESP_CHAE.STATISTICS.GET_DAILY_FAIL;
    // const resp = await apis.get_daily();

    const { result, content } = resp.data;

    if (!result) {
      setLoading(false);
      setShowMsg(true);
      return;
    }

    setLoading(false);
    setData({ ...content.statistics });
  }, []);

  useEffect(() => {
    get_data();
  }, [get_data]);

  // if (process.env.REACT_APP_DEBUG_ON) {
  //   console.log(`[Daily] states: loading, showMsg, data, criteria`);
  //   console.log(loading);
  //   console.log(showMsg);
  //   console.log(data);
  //   console.log(criteria);
  //   console.log(`[Daily] refs: criteria.current`);
  //   console.log(criteria.current);
  // }

  const caloriesSeries = [
    {
      name: CALORIE,
      data: [data.yesterday?.calories || 0, data.today?.calories || 0],
    },
  ];

  const nutrientsSeries = data.yesterday?.nutrients.map((nutrient, i) => {
    return {
      name: NUTRIENTS[i],
      data: [data.yesterday?.nutrients[i] || 0, data.today?.nutrients[i] || 0],
    };
  });

  const clickHandler = (e) => {
    if (criteria === CRITERIAS[0]) {
      setCriteria(CRITERIAS[1]);
      base.current = BASES[1];
      return;
    }
    setCriteria(CRITERIAS[0]);
    base.current = BASES[0];
  };

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
        <>
          <UnderlineCategory
            contents={CRITERIAS}
            onClick={clickHandler}
            disabledCategory={criteria}
          />
          <Chart
            type='bar'
            series={
              criteria === CRITERIAS[0] ? caloriesSeries : nutrientsSeries
            }
            width='100%'
            options={{
              chart: {
                toolbar: {
                  show: false,
                },
                stacked: true,
              },
              dataLabels: {
                enabled: false,
              },
              labels: LABELS,
              grid: {
                show: false,
                yaxis: {
                  lines: { show: false },
                },
              },
              tooltip: {
                y: {
                  formatter: (value) => `${value}${base.current}`,
                },
              },
              plotOptions: {
                bar: {
                  horizontal: true,
                },
              },
            }}
          />
        </>
      ) : null}
    </>
  );
};

export default Daily;
