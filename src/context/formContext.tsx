import { createContext, useContext, useRef, useState } from "react";

type FormValue = {
  desc: string;
  amount: string;
  typeOfTran: string;
};

type ContextType = {
  setFormValues: React.Dispatch<React.SetStateAction<FormValue>>;
  inputFormValues: FormValue;
  handleChange: (evt: {
    target: {
      name: string;
      value: string;
    };
  }) => void;
  resetForm: () => void;
  formRef: React.MutableRefObject<HTMLFormElement | null>;
};

export const FormContext = createContext({} as ContextType);

type ProviderProp = {
  children: React.ReactNode;
};

export const FormDataProvider = ({ children }: ProviderProp) => {
  const [inputFormValues, setFormValues] = useState<FormValue>({
    desc: "",
    amount: "",
    typeOfTran: "",
  });

  const formRef = useRef<HTMLFormElement | null>(null);

  const resetForm = () => {
    formRef?.current?.reset();
  };

  const handleChange = (evt: { target: { name: string; value: string } }) => {
    const { name, value } = evt.target;
    setFormValues(prevState => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  return (
    <FormContext.Provider
      value={{
        inputFormValues,
        setFormValues,
        handleChange,
        resetForm,
        formRef,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const GlobalFormContext = () => {
  const { handleChange, inputFormValues, setFormValues, resetForm, formRef } =
    useContext(FormContext);
  return {
    handleChange,
    inputFormValues,
    setFormValues,
    resetForm,
    formRef,
  };
};
