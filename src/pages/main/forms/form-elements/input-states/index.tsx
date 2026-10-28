import { ComponentCard } from "@/components/shared/component-card";
import DisabledInput from "./disabled-input";
import ErrorInput from "./error-input";
import SuccessInput from "./success-input";

export default function InputStates() {
  return (
    <ComponentCard
      title="Input States"
      description="Validation styles for error, success and disabled states on form controls."
    >
      <div className="space-y-6">
        <ErrorInput />
        <SuccessInput />
        <DisabledInput />
      </div>
    </ComponentCard>
  );
}
