import ReactApexChart from "react-apexcharts";

import "./Chart.css";

const LineChart = ({ view, chartInfo, ...props }) => {
  const { series, labels, base, colors } = chartInfo;

  const COLORS = {
    LABEL: new Array(7).fill("#939393"),
  };

  return (
    <div style={{ ...props }}>
      <ReactApexChart
        type='line'
        series={series}
        height='100%'
        options={{
          chart: {
            fontFamily: "Noto Sans KR",
            fontSize: "12px",
            fontWeight: "700",
            toolbar: {
              show: false,
            },
            tools: {
              download: false,
              zoom: false,
              zoomin: false,
              zoomout: false,
            },
          },
          xaxis: {
            type: "datetime",
            tooltip: {
              enabled: false,
            },
            labels: {
              format: view !== "월별" ? `MM월 dd일` : `yy년 MM월`,
              style: {
                colors: COLORS.LABEL,
                fontSize: "12px",
                fontWeight: 500,
              },
            },
            axisTicks: {
              show: false,
            },
            axisBorder: {
              show: false,
            },
          },
          yaxis: {
            labels: {
              formatter: (value) => {
                let num = Number(value);
                if (num % 1 === 0) {
                  return `${value}${base}`;
                }
                return `${Number(value).toFixed(1)}${base}`;
              },
              style: {
                colors: COLORS.LABEL,
                fontSize: "12px",
                fontWeight: 500,
              },
            },
          },
          dataLabels: {
            enabled: false,
          },
          legend: {
            show: true,
            position: "bottom",
            showForSingleSeries: true,
            markers: {
              radius: 50,
            },
          },
          labels: labels,
          colors: colors,
          storke: {
            curve: "smooth",
            width: 4,
          },
          tooltip: {
            x: {
              show: false,
            },
            y: {
              formatter: (value) => `${value}${base}`,
            },
          },
          grid: {
            show: false,
            // TODO for apex-chart x-axis trimming error
            // https://github.com/apexcharts/apexcharts.js/issues/305
            padding: {
              left: 50,
              right: 40,
            },
          },
        }}
      />
    </div>
  );
};

export default LineChart;
