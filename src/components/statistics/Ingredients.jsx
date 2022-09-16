import { useState, useCallback, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import styled from "styled-components";

// import RESP_CHAE from "../../server/response_chae";
import { apis } from "../../shared/axios";
import "./Chart.css";
import Loader from "../common/Loader";
import HelpMsg from "../common/HelpMsg";

const Ingredients = (props) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [showMsg, setShowMsg] = useState(false);

  const get_data = useCallback(async () => {
    // const resp = RESP_CHAE.STATISTICS.GET_STATE_SUCCESS;
    // const resp = RESP_CHAE.STATISTICS.GET_STATE_FAIL;
    const resp = await apis.get_state();

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

  const LABELS = ["임박", "만료", "정상"];
  const CHART_COLORS = ["#FFDD7C", "#FF5C01", "#74BDB2"];

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
        <StWrapper>
          <ReactApexChart
            type='donut'
            series={percentage || [1, 1, 1]}
            height='80%'
            options={{
              chart: {
                fontFamily: "Noto Sans KR",
                fontSize: "12px",
                fontWeight: "500",
                toolbar: {
                  show: false,
                },
              },
              // title: {
              //   text: "유통기한 현황",
              //   align: "center",
              // },
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
                    labels: {
                      show: true,
                      name: {
                        offsetY: 5,
                      },
                      total: {
                        showAlways: true,
                        show: true,
                        label: "기한별",
                        fontSize: "14px",
                      },
                      value: {
                        show: false,
                      },
                    },
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

export default Ingredients;

const StWrapper = styled.div`
  height: 300px;
`;
