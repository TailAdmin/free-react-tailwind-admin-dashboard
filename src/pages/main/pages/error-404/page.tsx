import { PageMeta } from "@/components/shared/page-meta";
import Error404 from "./index";

export default function Error404Page() {
  return (
    <div>
      <PageMeta
        title="React.js 404 Page | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js 404  page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <Error404 />
    </div>
  );
}
