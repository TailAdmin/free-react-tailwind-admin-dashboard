import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';


import TableThree from '../components/Tables/ProgrameTable';
import DefaultLayout from '../layout/DefaultLayout';

const ProgramsTable = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Programs" />

      <div className="flex flex-col gap-10">
     
        <TableThree />
      </div>
    </DefaultLayout>
  );
};

export default ProgramsTable;
