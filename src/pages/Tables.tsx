import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableOne from '../components/Tables/KeyMetrics';
import  OrganizationAuditTable from '../components/Tables/OrganizationAuditTable';

const Tables = () => {
  return (
    <>
      <Breadcrumb pageName="Tables" />

      <div className="flex flex-col gap-10">
        <TableOne />
        <OrganizationAuditTable/>
      </div>
    </>
  );
};

export default Tables;
