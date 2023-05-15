import React from "react";
import CashCard from "./cashCard";
import incomeImg from "../../assets/Savings-pana.svg";
import expenseImg from "../../assets/Manage money-bro.svg";
import calculatorImg from "../../assets/Calculator-bro.svg";

type WidgetProp = {
  income: number;
  expense: number;
  total: number;
};

function Widget({ income, expense, total }: WidgetProp) {
  return (
    <div className="flex gap-3 justify-between xlsm:flex-wrap">
      <CashCard cardTitle="Income" cardIcon={incomeImg} cardAmount={income} />
      <CashCard
        cardTitle="Expenses"
        cardIcon={expenseImg}
        cardAmount={expense}
      />
      <CashCard cardTitle="Total" cardIcon={calculatorImg} cardAmount={total} />
    </div>
  );
}

export default Widget;
