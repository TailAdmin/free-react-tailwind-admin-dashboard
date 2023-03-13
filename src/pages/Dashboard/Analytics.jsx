import React from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import CardOne from '../../components/CardOne';
import CardTwo from '../../components/CardTwo';
import CardThree from '../../components/CardThree'
import CardFour from '../../components/CardFour';
import ChatCard from '../../components/ChatCard';
import TableOne from '../../components/TableOne'
import ChartOne from '../../components/ChartOne';
import ChartTwo from '../../components/ChartTwo';
import ChartThree from '../../components/ChartThree';
import MapOne from '../../components/MapOne'

const Analytics = () => {
  return (
    <DefaultLayout>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5'>
        <CardOne />
        <CardTwo />
        <CardThree />
        <CardFour />
      </div>

      <div className='mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5'>
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <MapOne />
        <div className='col-span-12 xl:col-span-8'>
          <TableOne />
        </div>
        <ChatCard />
      </div>
    </DefaultLayout>
  )
}

export default Analytics;
