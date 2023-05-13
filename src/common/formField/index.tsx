import React from "react";
import { FormControl, FormLabel } from "@chakra-ui/react";

type FormFieldProp = {
  label?: string;
  children: React.ReactNode;
};

function FormField({ label, children }: FormFieldProp) {
  return (
    <FormControl>
      <FormLabel className="text-[18px] tracking-normal font-medium">
        {label}
      </FormLabel>
      {children}
    </FormControl>
  );
}

export default FormField;
