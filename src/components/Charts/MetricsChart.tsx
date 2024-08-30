import React from 'react';
import ReactApexChart from 'react-apexcharts';

const options: ApexCharts.ApexOptions = {
    chart: {
        type: 'bar' as const,
        height: 350,
        stacked: false,
        fontFamily: 'Satoshi, sans-serif', // Matching your dashboard's font
        toolbar: {
            show: false, // Keeping it clean as per the existing dashboard
        },
        zoom: {
            enabled: false,
        },
        animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 800,
        },
    },
    colors: ['#3C50E0', '#80CAEE', '#FFBA00'], // Matching the color palette
    plotOptions: {
        bar: {
            horizontal: false,
            borderRadius: 5, // Subtle border radius to match dashboard design
            columnWidth: '45%',
        },
    },
    dataLabels: {
        enabled: false, // Disabling for a cleaner look
    },
    xaxis: {
        categories: ['User Engagement', 'Performance', 'Issues Found'],
        labels: {
            style: {
                colors: '#6B7280', // Tailwind gray-400
                fontSize: '12px',
                fontFamily: 'Satoshi, sans-serif', // Matching font
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
                colors: '#6B7280',
                fontSize: '12px',
                fontFamily: 'Satoshi, sans-serif',
            },
        },
        title: {
            text: 'Metrics',
            style: {
                color: '#6B7280',
                fontSize: '14px',
                fontFamily: 'Satoshi, sans-serif',
            },
        },
    },
    legend: {
        position: 'bottom',
        horizontalAlign: 'center',
        fontFamily: 'Satoshi, sans-serif',
        fontWeight: 500,
        fontSize: '12px',
        labels: {
            colors: '#374151', // Tailwind gray-700
        },
        markers: {
            radius: 12, // Rounded markers
        },
    },
    grid: {
        strokeDashArray: 5, // Subtle grid lines to match overall style
        borderColor: '#E5E7EB', // Tailwind gray-200
    },
    fill: {
        opacity: 1,
    },
};

const series = [
    {
        name: 'Mobile App',
        data: [75, 85, 30],
    },
    {
        name: 'Web App',
        data: [65, 70, 25],
    },
    {
        name: 'Network Infrastructure',
        data: [50, 60, 40],
    },
];

const MetricsChart = () => {
    return (
        <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
                Comparison of Metrics Across Platforms
            </h4>
            <div id="chart" className="-ml-5">
                <ReactApexChart options={options} series={series} type="bar" height={350} />
            </div>
        </div>
    );
};

export default MetricsChart;
