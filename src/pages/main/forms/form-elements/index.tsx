import { PageBreadcrumb } from "@/components/shared/page-breadcrumb";
import { PageMeta } from "@/components/shared/page-meta";
import CheckboxInputs from "./checkbox-inputs";
import DefaultInputs from "./default-inputs";
import Dropzone from "./dropzone";
import FileInput from "./file-input";
import InputGroup from "./input-group";
import InputStates from "./input-states";
import RadioButtons from "./radio-buttons";
import SelectInputs from "./select-inputs";
import TextAreaInput from "./textarea-input";
import ToggleSwitch from "./toggle-switch";

export default function FormElementsPage() {
  return (
    <div>
      <PageMeta
        title="React.js Form Elements Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Form Elements  Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Form Elements" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <DefaultInputs />
          <SelectInputs />
          <TextAreaInput />
          <InputStates />
        </div>
        <div className="space-y-6">
          <InputGroup />
          <FileInput />
          <CheckboxInputs />
          <RadioButtons />
          <ToggleSwitch />
          <Dropzone />
        </div>
      </div>
    </div>
  );
}
