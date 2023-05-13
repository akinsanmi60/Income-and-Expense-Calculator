import React from "react";
import FormField from "../../common/formField";
import { Input } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { GlobalFormContext } from "../../context/formContext";

type FormProp = {
  handleAdd: (transaction: any) => void;
};

function FormBoxComponent({ handleAdd }: FormProp) {
  const { handleChange, inputFormValues, resetForm, formRef, setFormValues } =
    GlobalFormContext();

  const handleSave = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (inputFormValues?.desc === "" || Number(inputFormValues?.amount) === 0) {
      alert("fill the field");
      return;
    } else if (Number(inputFormValues?.amount) < 1) {
      alert("the amount value is less than 0");
      return;
    }

    const transaction = {
      id: uuidv4(),
      desc: inputFormValues?.desc,
      amount: inputFormValues?.amount,
      transactionType: inputFormValues?.typeOfTran,
    };

    handleAdd(transaction);
    resetForm();
    setFormValues({
      desc: "",
      amount: "",
      typeOfTran: "",
    });
    return;
  };

  return (
    <form onSubmit={handleSave} ref={formRef}>
      <div className="mt-[40px] w-[80%] md:w-full mx-auto xlsm:w-full xlsm:mx-0">
        <div className=" flex md:flex-col gap-[60px] bg-white p-5 rounded-lg items-center md:gap-0">
          <div className="flex gap-[40px] md:!block md:gap-[20px] md:w-full">
            <FormField label="Description">
              <Input
                onChange={handleChange}
                type="text"
                name="desc"
                className="border outline-none rounded-[6px] p-2 w-full"
                autoComplete="off"
              />
            </FormField>
            <div className="md:mt-5">
              <FormField label="Value">
                <Input
                  onChange={handleChange}
                  type="number"
                  name="amount"
                  className="border rounded-[6px] p-2 outline-none w-full"
                  autoComplete="off"
                />
              </FormField>
            </div>
          </div>
          <div className="flex gap-5 mt-[15px] md:mt-5 md:gap-5">
            <div className="flex gap-1 items-center cursor-pointer">
              <input
                type="radio"
                id="Income"
                value="income"
                name="typeOfTran"
                checked={inputFormValues?.typeOfTran === "income"}
                onChange={handleChange}
                className="cursor-pointer"
              />

              <p className="text-[20px] tracking-normal font-medium">Income</p>
            </div>
            <div className="flex gap-1 items-center cursor-pointer">
              <input
                type="radio"
                id="Expenses"
                value="expense"
                name="typeOfTran"
                checked={inputFormValues?.typeOfTran === "expense"}
                onChange={handleChange}
                className="cursor-pointer"
              />
              <p className="text-[20px] tracking-normal font-medium">Expense</p>
            </div>
          </div>
          <div className="flex items-center mt-[15px]">
            <button
              onClick={handleSave}
              className="tracking-normal py-[0.688rem] hover:bg-green-700 duration-150 px-4 outline-none text-base cursor-pointer font-medium bg-[#00AF43] text-white focus:outline-none rounded-md xlsm:text-[1rem]"
            >
              Add Transaction
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default FormBoxComponent;
