/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useState } from "react";
import Widget from "../../components/CashWidget";
import FormBoxComponent from "../../components/FormBox";
import TableBoxComponent from "../../components/Table";
import AccountSummary from "../../common/accountSummary";

export type TransactionProp = {
  id: string;
  desc: string;
  amount: number;
  transactionType: string;
};

function CaluclatorPage() {
  const [scrollModal, setScrollModal] = useState(false);

  const checkHeight = () => {
    window.scrollY >= 450 ? setScrollModal(true) : setScrollModal(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", checkHeight);
    return () => {
      window.removeEventListener("scroll", checkHeight);
    };
  }, []);

  const dataInLocal = localStorage.getItem("transactions");
  const data = JSON.parse(dataInLocal!);
  const [transactionsList, setTransactionsList] = useState<TransactionProp[]>(
    data ? data : [],
  );
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const amountExpense = transactionsList
      .filter(item => item.transactionType === "expense")
      .map((transaction: TransactionProp) => Number(transaction.amount));

    const amountIncome = transactionsList
      .filter(item => item.transactionType === "income")
      .map((transaction: TransactionProp) => Number(transaction.amount));

    const totalExpense = amountExpense
      .reduce((acc: number, cur: number) => acc + cur, 0)
      .toFixed(2);

    const totalIncome = amountIncome
      .reduce((acc: number, cur: number) => acc + cur, 0)
      .toFixed(2);

    const sumTotal = Math.abs(
      Number(totalIncome) - Number(totalExpense),
    ).toFixed(2) as unknown as number;

    const reTotal = `${
      Number(totalIncome) < Number(totalExpense) ? "-" : ""
    } ${sumTotal}` as unknown as number;

    setIncome(Number(totalIncome));
    setExpense(Number(totalExpense));
    setTotal(reTotal);
  }, [transactionsList]);

  const handleAdd = (transaction: TransactionProp) => {
    const newArrayTransaction = [...transactionsList, transaction];

    setTransactionsList(newArrayTransaction);

    localStorage.setItem("transactions", JSON.stringify(newArrayTransaction));
    return;
  };

  return (
    <div className="max-content">
      <div className="appContainer">
        <Widget income={income} expense={expense} total={total} />
        <FormBoxComponent handleAdd={handleAdd} />
        <div className="relative w-full">
          <div className="absolute top-0 w-full ">
            <div className="w-full h-[70px] fixed top-0 z-50">
              <AccountSummary
                passHandleAdd={handleAdd}
                open={scrollModal}
                income={income}
                expense={expense}
                total={total}
              />
            </div>
          </div>
        </div>
        <TableBoxComponent
          transactionsList={transactionsList}
          setTransactionsList={setTransactionsList}
          income={income}
          expense={expense}
          total={total}
        />
      </div>
    </div>
  );
}

export default CaluclatorPage;
