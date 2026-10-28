import { ComponentCard } from "@/components/shared/component-card";
import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";
import { PageMeta } from "@/components/shared/page-meta";
import AvatarGroupPreview from "./components/avatar-group";
import BusyIndicator from "./components/busy-indicator";
import DefaultAvatar from "./components/default-avatar";
import OfflineIndicator from "./components/offline-indicator";
import OnlineIndicator from "./components/online-indicator";

export default function Avatars() {
  return (
    <>
      <PageMeta
        title="React.js Avatars Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Avatars Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Avatars" />

      <div className="space-y-5 sm:space-y-6">
        <ComponentCard title="Default Avatar">
          <DefaultAvatar />
        </ComponentCard>

        <ComponentCard title="Avatar Group">
          <AvatarGroupPreview />
        </ComponentCard>

        <ComponentCard title="Avatar with Online Indicator">
          <OnlineIndicator />
        </ComponentCard>

        <ComponentCard title="Avatar with Offline Indicator">
          <OfflineIndicator />
        </ComponentCard>

        <ComponentCard title="Avatar with Busy Indicator">
          <BusyIndicator />
        </ComponentCard>
      </div>
    </>
  );
}
