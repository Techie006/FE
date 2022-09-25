import ReactApexChart from "react-apexcharts";

import "./Chart.css";
import { ChartColors } from "../../styles/Colors";

const BarChart = ({ criteria, base, series, chartInfo, ...props }) => {
  const { calorieSeries, nutrientsSeries } = series;

  const COLORS = new Array(2).fill("#939393");

  return (
    <div style={{ ...props }}>
      <ReactApexChart
        type='bar'
        height='100%'
        series={criteria === "열량" ? calorieSeries : nutrientsSeries}
        options={{
          chart: {
            fontFamily: "Noto Sans KR",
            foreColor: ChartColors.font,
            toolbar: {
              show: false,
            },
            stacked: true,
          },
          plotOptions: {
            bar: {
              horizontal: true,
            },
          },
          // TODO overlapping issue 해결하기!
          xaxis: {
            type: "category",
            labels: {
              show: true,
              hideOverlappingLabels: true,
              formatter: (value) => {
                let num = Number(value);
                if (num % 1 === 0) {
                  return `${value}${base}`;
                }
                return `${Number(value).toFixed(1)}${base}`;
              },
              style: {
                colors: COLORS,
                fontWeight: 500,
                fontSize: "12px",
              },
            },
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
          },
          yaxis: {
            labels: {
              style: {
                colors: COLORS,
                fontWeight: 500,
                fontSize: "12px",
                lineHeight: "17px",
              },
            },
          },
          dataLabels: {
            enabled: false,
          },
          labels: chartInfo.AXIS,
          colors:
            criteria === "열량"
              ? chartInfo.COLORS.calorie
              : chartInfo.COLORS.nutrients,
          tooltip: {
            x: {
              show: false,
            },
            y: {
              formatter: (value) => `${value}${base}`,
            },
            theme: "light",
            fillSeriesColor: false,
          },
          legend: {
            showForSingleSeries: true,
            markers: {
              radius: 50,
            },
          },
          grid: {
            show: false,
          },
        }}
      />
    </div>
  );
};

export default BarChart;
