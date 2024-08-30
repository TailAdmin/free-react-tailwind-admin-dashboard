import React from 'react';
import CardDataStats from '../../components/CardDataStats';
import ChartOne from '../../components/Charts/ChartOne';
import ChartThree from '../../components/Charts/ChartThree';
import ChartTwo from '../../components/Charts/ChartTwo';
import ChatCard from '../../components/Chat/ChatCard';
import MapOne from '../../components/PerformanceOverview/PerformanceOverview';
import RecentActivity from '../../components/Tables/RecentActivity';
import KeyMetrics from '../../components/Tables/KeyMetrics';
import MetricsChart from '../../components/Charts/MetricsChart';
import DashboardStats from '../../components/Charts/DashboardStats';

const AuditDashBoard: React.FC = () => {
  return (
    <>
       <DashboardStats/>


      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <MapOne />
        <div className="col-span-12 xl:col-span-8">
          <KeyMetrics />
          <RecentActivity/>
          <MetricsChart />
        </div>
        <ChatCard />
      </div>
    </>
  );
};

export default AuditDashBoard;
