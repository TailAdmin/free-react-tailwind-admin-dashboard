import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export default function BarChartTwo() {
  const series = [
    {
      name: "Direct",
      data: [44, 55, 41, 67, 22, 43, 55, 41],
    },
    {
      name: "Referral",
      data: [13, 23, 20, 8, 13, 27, 13, 23],
    },
    {
      name: "Organic Search",
      data: [11, 17, 15, 15, 21, 14, 18, 20],
    },
    {
      name: "Social",
      data: [21, 7, 25, 13, 22, 8, 18, 20],
    },
  ];
  const options: ApexOptions = {
    colors: ["#2a31d8", "#465fff", "#7592ff", "#c2d6ff"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      stacked: true,
      height: 315,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "39%",
        borderRadius: 10,
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "last",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Outfit",
      fontSize: "14px",
      fontWeight: 400,
      markers: {
        size: 5,
        shape: "circle",
        strokeWidth: 0,
      },
      itemMargin: {
        horizontal: 10,
        vertical: 0,
      },
    },
    yaxis: {
      title: {
        text: undefined, // Hide the title by setting text to undefined
      },
    },
    grid: {
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      x: {
        show: false,
      },
      y: {
        formatter: (val: number) => val.toString(), // Simplified formatter
      },
    },
  };

  return (
    <div className="max-w-full overflow-x-auto custom-scrollbar">
      <div id="chartSix" className="min-w-[1000px]">
        <Chart options={options} series={series} type="bar" height={315} />
      </div>
    </div>
  );
}
