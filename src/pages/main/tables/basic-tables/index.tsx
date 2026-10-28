import { ComponentCard } from "@/components/shared/component-card";
import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";
import { PageMeta } from "@/components/shared/page-meta";
import TableFive from "./table-five";
import TableFour from "./table-four";
import TableOne from "./table-one";
import TableThree from "./table-three";
import TableTwo from "./table-two";

export default function BasicTablesPage() {
  return (
    <div>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Basic Tables" />
      <div className="space-y-6">
        <ComponentCard title="Basic Table 1">
          <TableOne />
        </ComponentCard>
        <ComponentCard title="Basic Table 2">
          <TableTwo />
        </ComponentCard>
        <ComponentCard title="Basic Table 3">
          <TableThree />
        </ComponentCard>
        <ComponentCard title="Basic Table 4">
          <TableFour />
        </ComponentCard>
        <ComponentCard title="Basic Table 5">
          <TableFive />
        </ComponentCard>
      </div>
    </div>
  );
}
