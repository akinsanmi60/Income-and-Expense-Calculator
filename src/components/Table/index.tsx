import React, { Fragment, useState } from "react";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import {
  FaRegArrowAltCircleUp,
  FaRegArrowAltCircleDown,
  FaTrash,
  FaEdit,
} from "react-icons/fa";
import { TransactionProp } from "../../pages/Calculator";
import ClientEditModal from "../../common/modalAlert";
import NumberFormat from "react-number-format";

type BoxProp = {
  setTransactionsList: React.Dispatch<TransactionProp[]>;
  transactionsList: TransactionProp[];
  income: number;
  expense: number;
  total: number;
};

function TableBoxComponent({ transactionsList, setTransactionsList }: BoxProp) {
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [dataID, setDataID] = useState("");

  const handleModal = (valueType: string, id: string) => {
    if (valueType === "edit") {
      setOpenModal(true);
      setModalType("edit");
      setDataID(id);
    } else if (valueType === "delete") {
      setOpenModal(true);
      setModalType("delete");
      setDataID(id);
    }
  };

  return (
    <Fragment>
      <div className="mt-[40px] bg-white p-5 rounded-lg ">
        {/***header */}
        <div className="w-full flex p-4 font-[600]">
          <div className="flex-1 text-left text-default-color font-title -mr-28 md:hidden">
            <p>Nos</p>
          </div>
          <div className="flex-1 text-left text-default-color font-title">
            <p>Description</p>
          </div>
          <div className="flex-1 text-left text-default-color font-title xlsm:hidden">
            <p>Incomes</p>
          </div>
          <div className="flex-1 text-left text-default-color font-title xlsm:hidden">
            <p>Expenses</p>
          </div>
          <div className="flex-1 text-left text-default-color font-title hidden xlsm:flex">
            <p>Amount</p>
          </div>
          <div className="flex-1 text-left text-default-color font-title xlsm:hidden">
            <p>Type</p>
          </div>
          <div className="text-left text-default-color font-title sm:w-11">
            <p>Action</p>
          </div>
        </div>
        <hr />

        {/**Body */}

        <div className="xlsm:hidden">
          {transactionsList?.length === 0 ? (
            <div>
              <p className="text-center my-[50px]">No Data</p>
            </div>
          ) : (
            transactionsList &&
            transactionsList.map((item: TransactionProp, i) => {
              return (
                <div key={item?.id}>
                  {item?.transactionType === "income" ? (
                    <div className="w-full flex mt-2 p-4 bg-emerald-100 cursor-pointer items-center">
                      <div className="md:hidden flex-1 text-left text-default-color font-title -mr-28 text-[green] font-[600]">
                        <p>{i + 1}</p>
                      </div>
                      <div className="flex-1 text-left text-default-color font-title text-[green] font-[600]">
                        <p>{item?.desc}</p>
                      </div>

                      <div className="flex-1 text-left text-default-color font-title">
                        <NumberFormat
                          value={item?.amount}
                          displayType={"text"}
                          thousandSeparator={true}
                          renderText={(value: string) => (
                            <p className="ml-[-5px] text-[green] font-[600]">{`₦ ${value}`}</p>
                          )}
                        />
                      </div>
                      <div className="flex-1 text-left text-default-color font-title">
                        <p className="ml-[-5px]"></p>
                      </div>
                      <div className="flex-1 text-left text-default-color font-title">
                        <p className="ml-[-5px]">
                          <FaRegArrowAltCircleUp color="green" />
                        </p>
                      </div>
                      <div className="text-left text-default-color font-title">
                        <Menu
                          menuButton={
                            <MenuButton>
                              <div className="px-2 bg-gray-50 rounded-xl">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-6 h-6 text-blue-400"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                                  />
                                </svg>
                              </div>
                            </MenuButton>
                          }
                          transition
                        >
                          <MenuItem
                            onClick={() => handleModal("edit", item?.id)}
                          >
                            <FaEdit className="text-[blue] mr-1 text-[13px]" />
                            <span className="text-[blue] font-[600]">Edit</span>
                          </MenuItem>
                          <MenuItem
                            onClick={() => handleModal("delete", item?.id)}
                          >
                            <FaTrash className="text-[red] mr-1 text-[13px]" />
                            <span className="text-[red] font-[600]">
                              Delete
                            </span>
                          </MenuItem>
                        </Menu>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full flex mt-2 bg-gray-300 p-4 cursor-pointer items-center">
                      <div className=" md:hidden flex-1 text-left text-default-color font-title -mr-28 text-[red] font-[600]">
                        <p>{i + 1}</p>
                      </div>
                      <div className="flex-1 text-left text-default-color font-title text-[red] font-[600]">
                        <p>{item?.desc}</p>
                      </div>
                      <div className="flex-1 text-left text-default-color font-title">
                        <p className="ml-[-5px]"></p>
                      </div>
                      <div className="flex-1 text-left text-default-color font-title">
                        <NumberFormat
                          value={item?.amount}
                          displayType={"text"}
                          thousandSeparator={true}
                          renderText={(value: string) => (
                            <p className="ml-[-5px] text-[red] font-[600]">{`₦ ${value}`}</p>
                          )}
                        />
                      </div>

                      <div className="flex-1 text-left text-default-color font-title">
                        <p className="ml-[-5px]">
                          <FaRegArrowAltCircleDown className=" text-[red]" />
                        </p>
                      </div>
                      <div className="text-left text-default-color font-title sm:w-11">
                        <Menu
                          menuButton={
                            <MenuButton>
                              <div className="px-2 bg-gray-50 rounded-xl">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-6 h-6 text-blue-400"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                  strokeWidth={2}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                                  />
                                </svg>
                              </div>
                            </MenuButton>
                          }
                          transition
                        >
                          <MenuItem
                            onClick={() => handleModal("edit", item?.id)}
                          >
                            <FaEdit className="text-[blue] mr-1 text-[13px]" />
                            <span className="text-[blue] font-[600]">Edit</span>
                          </MenuItem>
                          <MenuItem
                            onClick={() => handleModal("delete", item?.id)}
                          >
                            <FaTrash className="text-[red] mr-1 text-[13px]" />
                            <span className="text-[red] font-[600]">
                              Delete
                            </span>
                          </MenuItem>
                        </Menu>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        <div className="hidden xlsm:block">
          {transactionsList?.length === 0 ? (
            <div>
              <p className="text-center my-[50px]">No Data</p>
            </div>
          ) : (
            transactionsList &&
            transactionsList.map((item: TransactionProp, i) => {
              return (
                <div key={item?.id}>
                  <div
                    className="w-full flex mt-2 bg-gray-300 p-4 cursor-pointer items-center"
                    style={{
                      backgroundColor:
                        item?.transactionType === "income"
                          ? "#DEF7EC"
                          : "#b0bec5",
                      color:
                        item?.transactionType === "income"
                          ? "green"
                          : "#f44336",
                    }}
                  >
                    <div className=" md:hidden flex-1 text-left font-title -mr-28 font-[600]">
                      <p>{i + 1}</p>
                    </div>
                    <div className="flex-1 text-left  font-title font-[600]">
                      <p>{item?.desc}</p>
                    </div>
                    <div className="flex-1 text-left  font-title">
                      <NumberFormat
                        value={item?.amount}
                        displayType={"text"}
                        thousandSeparator={true}
                        renderText={(value: string) => (
                          <p className="ml-[-5px] font-[600]">{`₦ ${value}`}</p>
                        )}
                      />
                    </div>

                    <div className="flex-1 text-left text-default-color font-title hidden">
                      <p className="ml-[-5px]">
                        <FaRegArrowAltCircleDown className="" />
                      </p>
                    </div>
                    <div className="text-left text-default-color font-title sm:w-11">
                      <Menu
                        menuButton={
                          <MenuButton>
                            <div className="px-2 bg-gray-50 rounded-xl">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6 text-blue-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                                />
                              </svg>
                            </div>
                          </MenuButton>
                        }
                        transition
                      >
                        <MenuItem onClick={() => handleModal("edit", item?.id)}>
                          <FaEdit className="text-[blue] mr-1 text-[13px]" />
                          <span className="text-[blue] font-[600]">Edit</span>
                        </MenuItem>
                        <MenuItem
                          onClick={() => handleModal("delete", item?.id)}
                        >
                          <FaTrash className="text-[red] mr-1 text-[13px]" />
                          <span className="text-[red] font-[600]">Delete</span>
                        </MenuItem>
                      </Menu>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      <ClientEditModal
        editedID={dataID}
        isOpen={openModal}
        isOpenUpdater={setOpenModal}
        setTransactionsList={setTransactionsList}
        transactionsList={transactionsList}
        typeModal={modalType}
      />
    </Fragment>
  );
}

export default TableBoxComponent;
