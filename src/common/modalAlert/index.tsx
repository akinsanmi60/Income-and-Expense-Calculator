/* eslint-disable no-useless-escape */
import React, { useCallback } from "react";
import { motion } from "framer-motion";
import { TransactionProp } from "../../pages/Calculator";
import NumberFormat from "react-number-format";
import { GlobalFormContext } from "../../context/formContext";
import FormField from "../formField";
import { Input } from "@chakra-ui/react";

type ModalProp = {
  editedID: string;
  typeModal: string;
  isOpen: boolean;
  isOpenUpdater: React.Dispatch<React.SetStateAction<boolean>>;
  setTransactionsList: React.Dispatch<TransactionProp[]>;
  transactionsList: TransactionProp[];
};
// const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

function ClientEditModal({
  editedID,
  isOpen,
  isOpenUpdater,
  setTransactionsList,
  transactionsList,
  typeModal,
}: ModalProp) {
  const { inputFormValues, handleChange } = GlobalFormContext();

  const objectTransaction =
    transactionsList && transactionsList?.find(item => item.id === editedID);

  const onDelete = (ID: string) => {
    const newArray = transactionsList.filter(
      (transaction: any) => transaction.id !== ID,
    );
    setTransactionsList(newArray);
    localStorage.setItem("transactions", JSON.stringify(newArray));
    if (isOpen === true) {
      isOpenUpdater(!isOpen);
    }
  };

  const onEditHandler = (ID: string) => {
    if (inputFormValues?.desc === "" || Number(inputFormValues?.amount) === 0) {
      alert("fill the field");
      return;
    } else if (Number(inputFormValues?.amount) < 1) {
      alert("the amount value is less than 0");
      return;
    }
    const newTransaction = {
      desc: inputFormValues?.desc,
      amount: inputFormValues?.amount as unknown as number,
      transactionType: inputFormValues?.typeOfTran,
    };
    const newArray = transactionsList.map((transaction: TransactionProp) =>
      transaction.id === ID
        ? { ...transaction, ...newTransaction }
        : transaction,
    );
    setTransactionsList(newArray);
    localStorage.setItem("transactions", JSON.stringify(newArray));
    if (isOpen === true) {
      isOpenUpdater(!isOpen);
    }
  };

  const onCancelHandler = useCallback(() => {
    if (isOpen === true) {
      isOpenUpdater(!isOpen);
    }
  }, [isOpen, isOpenUpdater]);

  return isOpen && editedID !== null ? (
    <motion.div
      className="modal-container"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        type: "spring",
        damping: 18,
      }}
    >
      <div className="relative z-50">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all my-8 max-w-lg w-full">
              <div className="bg-white px-4 pt-5 pb-4 p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      {typeModal === "edit" ? (
                        <div className="p-3">
                          <p className="ml-[-5px] xlsm:text-[15px] mb-3">{`Are you sure of edit this ${objectTransaction?.transactionType} detail`}</p>

                          <div className="flex gap-[40px] md:!block md:gap-[20px] md:w-full">
                            <FormField label="Description">
                              <Input
                                onChange={handleChange}
                                type="text"
                                name="desc"
                                className="border outline-none rounded-[6px] p-2 w-full"
                                autoComplete="off"
                                defaultValue={objectTransaction?.desc}
                              />
                            </FormField>
                            <div className="md:mt-5">
                              <FormField label="Value">
                                <Input
                                  onChange={handleChange}
                                  type="number"
                                  name="amount"
                                  defaultValue={objectTransaction?.amount}
                                  className="border rounded-[6px] p-2 outline-none w-full"
                                  autoComplete="off"
                                />
                              </FormField>
                            </div>
                          </div>
                          <div className="flex justify-center gap-5 mt-[15px] md:mt-5 md:gap-5">
                            <div className="flex gap-1 items-center cursor-pointer">
                              <input
                                type="radio"
                                id="Income"
                                value="income"
                                name="typeOfTran"
                                checked={
                                  inputFormValues?.typeOfTran === "income"
                                }
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
                                checked={
                                  inputFormValues?.typeOfTran === "expense"
                                }
                                onChange={handleChange}
                                className="cursor-pointer"
                              />
                              <p className="text-[20px] tracking-normal font-medium">
                                Expense
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="">
                          <NumberFormat
                            value={objectTransaction?.amount}
                            displayType={"text"}
                            thousandSeparator={true}
                            renderText={(value: string) => (
                              <p className="ml-[-5px] xlsm:text-[15px]">{`Are you sure of deleting this ${objectTransaction?.transactionType} detail with amount of ₦${value}`}</p>
                            )}
                          />
                        </div>
                      )}
                    </h3>

                    <div className="px-4 py-3 flex items-center gap-5">
                      <button
                        type="button"
                        className=" w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-0"
                        onClick={onCancelHandler}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        style={{
                          backgroundColor:
                            typeModal === "edit" ? "green" : "red",
                        }}
                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        onClick={() =>
                          typeModal === "edit"
                            ? onEditHandler(editedID)
                            : onDelete(editedID)
                        }
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  ) : null;
}

export default ClientEditModal;
