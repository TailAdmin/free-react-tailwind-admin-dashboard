import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
// import TableOne from '../components/Tables/KeyMetrics';
import SimpleRequest from '../components/Tables/Simple_Request_Table';
import Projects from '../components/Tables/Projects_Table';
import Tabs from '../components/Tabs/Audit_Table_Tabs';

const Tables = () => {
  return (
    <>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        {/* <TableOne /> */}
        <Tabs />
        <Projects />
        <SimpleRequest />
      </div>
    </>
  );
};

export default Tables;
