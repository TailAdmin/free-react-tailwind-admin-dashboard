import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";
import { PageMeta } from "@/components/shared/page-meta";
import BlankPageContent from "./index";

export default function BlankPage() {
  return (
    <div>
      <PageMeta
        title="React.js Blank Page | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Blank Page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Blank Page" />
      <BlankPageContent />
    </div>
  );
}
