import React from "react";
import CashCard from "./cashCard";

type WidgetProp = {
  income: number;
  expense: number;
  total: number;
};

function Widget({ income, expense, total }: WidgetProp) {
  return (
    <div className="flex gap-3 justify-between xlsm:flex-wrap">
      <CashCard
        cardTitle="Income"
        cardIcon="/src/assets/Savings-pana.svg"
        cardAmount={income}
      />
      <CashCard
        cardTitle="Expenses"
        cardIcon="/src/assets/Manage money-bro.svg"
        cardAmount={expense}
      />
      <CashCard
        cardTitle="Total"
        cardIcon="/src/assets/Calculator-bro.svg"
        cardAmount={total}
      />
    </div>
  );
}

export default Widget;
