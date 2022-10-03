import ReactApexChart from "react-apexcharts";

import "./Chart.css";

const DonutChart = ({ series, title, labels, colors, ...props }) => {
  return (
    <div style={{ ...props }}>
      <ReactApexChart
        type='donut'
        series={series}
        height='100%'
        options={{
          chart: {
            fontFamily: "Noto Sans KR",
            foreColor: "#939393",
            toolbar: {
              show: false,
            },
          },
          title: {
            text: title,
            align: "center",
            style: {
              fontWeight: "500",
              fontSize: "12px",
              lineHeight: "17px",
            },
          },
          dataLabels: {
            enabled: false,
          },
          legend: {
            position: "bottom",
          },
          labels: labels,
          colors: colors,
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
    </div>
  );
};

export default DonutChart;
