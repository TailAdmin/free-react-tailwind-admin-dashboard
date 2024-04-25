import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';


import TableThree from '../components/Tables/EventTable';
import DefaultLayout from '../layout/DefaultLayout';

const EventTables = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Users" />

      <div className="flex flex-col gap-10">
     
        <TableThree />
      </div>
    </DefaultLayout>
  );
};

export default EventTables;
