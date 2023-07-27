import Breadcrumb from '../components/Breadcrumb';
import TableOne from '../components/TableOne';

const Tables = () => {
  return (
    <>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        <TableOne />
      </div>
    </>
  );
};

export default Tables;
