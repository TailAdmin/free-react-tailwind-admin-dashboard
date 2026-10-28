import { ComponentCard } from "@/components/shared/component-card";
import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";
import { PageMeta } from "@/components/shared/page-meta";
import GhostVariant from "@/pages/others/ui-elements/badges/components/ghost-variant";
import GhostVariantWithLeadingIcon from "@/pages/others/ui-elements/badges/components/ghost-variant-with-leading-icon";
import GhostVariantWithTrailingIcon from "@/pages/others/ui-elements/badges/components/ghost-variant-with-trailing-icon";
import LightVariant from "@/pages/others/ui-elements/badges/components/light-variant";
import LightVariantWithLeadingIcon from "@/pages/others/ui-elements/badges/components/light-variant-with-leading-icon";
import LightVariantWithTrailingIcon from "@/pages/others/ui-elements/badges/components/light-variant-with-trailing-icon";
import SolidBadgeVariant from "@/pages/others/ui-elements/badges/components/solid-variant";
import SolidVariantWithLeadingIcon from "@/pages/others/ui-elements/badges/components/solid-variant-with-leading-icon";
import SolidVariantWithTrailingIcon from "@/pages/others/ui-elements/badges/components/solid-variant-with-trailing-icon";

export default function Badges() {
  return (
    <div>
      <PageMeta
        title="React.js Badges Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Badges Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Badges" />

      <div className="space-y-5 sm:space-y-6">
        <ComponentCard title="With Solid Background">
          <SolidBadgeVariant />
        </ComponentCard>

        <ComponentCard title="With Light Background">
          <LightVariant />
        </ComponentCard>

        <ComponentCard title="Ghost Variant">
          <GhostVariant />
        </ComponentCard>

        <ComponentCard title="Solid Background with Leading Icon">
          <SolidVariantWithLeadingIcon />
        </ComponentCard>

        <ComponentCard title="Light Background with Leading Icon">
          <LightVariantWithLeadingIcon />
        </ComponentCard>

        <ComponentCard title="Ghost Variant with Leading Icon">
          <GhostVariantWithLeadingIcon />
        </ComponentCard>

        <ComponentCard title="Solid Background with Trailing Icon">
          <SolidVariantWithTrailingIcon />
        </ComponentCard>

        <ComponentCard title="Light Background with Trailing Icon">
          <LightVariantWithTrailingIcon />
        </ComponentCard>

        <ComponentCard title="Ghost Variant with Trailing Icon">
          <GhostVariantWithTrailingIcon />
        </ComponentCard>
      </div>
    </div>
  );
}
