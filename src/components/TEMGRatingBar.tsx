import { ApexOptions } from 'apexcharts';
import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

interface BondData {
    [bondname: string]: {
        price: number;
        rating: string;
    };
}

interface BondSeries {
    name: string;
    data: number[];
}

const ratings = ['AAA', 'AA+', 'AA', 'AA-', 'A+', 'A', 'A-', 
'BBB+', 'BBB', 'BBB-', 'BB+', 'BB', 'B+', 'B', 'B-', 
'CCC+', 'CCC', 'CCC-', 'CC', 'C', 'D'];

// Import the data from a JSON file and assign it to the series state
const TEMGBar: React.FC = () => {
    const [ chartData, setChartData ] = useState<BondSeries[]> ([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('./data.json');
            const data: BondData = await response.json();
            
            // Count the number of bonds for each rating
            const ratingCounts = ratings.reduce((acc, rating) => {
                acc[rating] = Object.values(data).filter((bond) => bond.rating === rating).length;
                return acc;
            }, {} as Record<string, number>);

            // Create the Bond Series
            const bondSeries: BondSeries[] = [{
                name: 'No. of Bonds',
                data: ratings.map((rating) => ratingCounts[rating]),
            }];
            setChartData(bondSeries);
        };
        fetchData();
    }, []);

    // Styling Option for Chart
    const options: ApexOptions = {
        legend: {
            show: true,
            position: 'bottom',
            horizontalAlign: 'left',
          },

        chart: {
            type: 'bar',
            height: 300,
            toolbar: {
                show: true,
                offsetY: -25,
                export: {
                    csv: {
                        filename: "Bond Ratings",
                    },
                },
            },
        },

        plotOptions : {
            bar: {
                distributed: false,
            },
        },

        xaxis: {
            type: 'category',
            text: 'Ratings',
            categories: ratings,
            title : {
            text: 'Ratings',
            style: {
                    fontSize: '14px',
                }
            },
        },
        
        yaxis: {
            opposite: false,
            text: 'Count',
            title : {
                text: 'No. of Bonds',
                style: {
                    fontSize: '14px',
                }
            },
        },

        dataLabels: {
            enabled: true,
            },

        event: { //TODO: create Modal to display list of bonds in each rating

        },

        colors: [
            // Function to  change colour of bar depending on first-letter of rating:
            ({ value, seriesIndex, dataPointIndex, w } : 
            { value: number, seriesIndex: number, dataPointIndex: number, w: any }) : string => {
                const rating = w.config.xaxis.categories[dataPointIndex];
                const colorMap: Record<string, string> = {
                    A: '#02DFDE',
                    B: '#FFA500',
                    C: '#FF0000',
                    D: '#800080',
                };
                const firstLetter = rating.charAt(0).toUpperCase();
                return colorMap[firstLetter];
            }
        ],
    };
    
    return (
        <div className="col-span-16 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
            <h2 className='mb-3'>
                <span className="text-heading text-lg font-semibold">Bond Ratings</span>
            </h2>
        <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
            <div className="flex w-full flex-wrap gap-3 sm:gap-5">
            <div className="flex min-w-47.5">
                {/*
                <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
                </span> */}
            </div>
            <div className="flex min-w-47.5">
                {/*
                <span className="mt-1 mr-2 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
            </span> */}
            </div>
            </div>
        </div>
        <div>
            <div id="TEMG_BarChart" className="-ml-5">
            <ReactApexChart
                options={options}
                series={chartData}
                type="bar"
                height={325}
            />
            </div>
        </div>
        </div>
    );
};

export default TEMGBar;
