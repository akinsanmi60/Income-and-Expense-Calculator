/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import FormField from "../formField";
import { Input } from "@chakra-ui/react";
import { FaRegWindowClose } from "react-icons/fa";
import { GlobalFormContext } from "../../context/formContext";
import NumberFormat from "react-number-format";

type FormProp = {
  passHandleAdd: (transaction: any) => void;
  open: boolean;
  income: number;
  expense: number;
  total: number;
};

function AccountSummary({
  passHandleAdd,
  open,
  income,
  expense,
  total,
}: FormProp) {
  const { handleChange, inputFormValues, resetForm, formRef, setFormValues } =
    GlobalFormContext();

  const [viewForm, setViewForm] = useState(false);
  const handleViewForm = () => {
    setViewForm(true);
  };

  const handleCloseForm = () => {
    if (viewForm === true) {
      setViewForm(false);
    }
  };

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

    passHandleAdd(transaction);
    resetForm();
    setFormValues({
      desc: "",
      amount: "",
      typeOfTran: "",
    });
    handleCloseForm();
  };

  return (
    <div className="mt-[15px] px-6 xlsm:hidden w-full flex">
      <div className="w-full">
        {open && (
          <div className="flex">
            {viewForm === true ? (
              <form onSubmit={handleSave} ref={formRef}>
                <div className="flex">
                  <div
                    className="p-6 rounded-xl bg-lime-200
            "
                  >
                    <div className="flex justify-end">
                      <FaRegWindowClose
                        onClick={handleCloseForm}
                        className="cursor-pointer"
                      />
                    </div>
                    <FormField label="Description">
                      <Input
                        onChange={handleChange}
                        type="text"
                        name="desc"
                        className="border outline-none rounded-[6px] p-2 w-full"
                        autoComplete="off"
                      />
                    </FormField>

                    <FormField label="Value">
                      <Input
                        onChange={handleChange}
                        type="number"
                        name="amount"
                        className="border rounded-[6px] p-2 outline-none w-full"
                        autoComplete="off"
                      />
                    </FormField>
                    <div className="flex gap-5 mt-[15px]">
                      <div className="flex gap-1 items-center cursor-pointer">
                        <input
                          type="radio"
                          defaultChecked
                          id="Income"
                          value="income"
                          name="typeOfTran"
                          checked={inputFormValues?.typeOfTran === "income"}
                          onChange={handleChange}
                          className="cursor-pointer"
                        />

                        <p className="text-[20px] tracking-normal font-medium">
                          Income
                        </p>
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
                        <p className="text-[20px] tracking-normal font-medium">
                          Expense
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-center mt-[25px]">
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
            ) : null}
          </div>
        )}
      </div>
      <div className="w-full flex justify-center ml-60 ">
        {open && (
          <div className="flex flex-col px-6">
            <div>
              <NumberFormat
                value={income}
                displayType={"text"}
                thousandSeparator={true}
                renderText={(value: string) => (
                  <p className="ml-[-5px] text-[green] font-[600]">
                    Total-Income: {`₦${value}`}
                  </p>
                )}
              />
            </div>
            <div>
              <NumberFormat
                value={expense}
                displayType={"text"}
                thousandSeparator={true}
                renderText={(value: string) => (
                  <p className="ml-[-5px] text-[red] font-[600]">
                    Total-Income: {`₦${value}`}
                  </p>
                )}
              />
            </div>
            <div>
              <NumberFormat
                value={total}
                displayType={"text"}
                thousandSeparator={true}
                renderText={(value: string) => (
                  <p className="ml-[-5px] font-[600]">
                    Grand-Total: {`₦${value}`}
                  </p>
                )}
              />
            </div>
            <div style={{ display: viewForm === true ? "none" : "block" }}>
              <p
                className="mt-3 text-blue-500 cursor-pointer"
                onClick={viewForm === true ? handleCloseForm : handleViewForm}
              >
                Click to Add Transaction
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AccountSummary;
