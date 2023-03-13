import React from 'react';
import DefaultLayout from '../layout/DefaultLayout';
import Breadcrumb from '../components/Breadcrumb';
import ChartFour from '../components/ChartFour';
import ChartOne from '../components/ChartOne';
import ChartTwo from '../components/ChartTwo';
import ChartThree from '../components/ChartThree';

const Chart = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName='Chart' />

      <div className='grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5'>
        <div className='col-span-12'>
          <ChartFour />
        </div>
        <ChartOne />
        <ChartTwo />
        <ChartThree />
      </div>
    </DefaultLayout>
  )
}

export default Chart;
