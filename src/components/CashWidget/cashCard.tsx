import React from "react";
import NumberFormat from "react-number-format";

type Prop = {
  cardTitle: string;
  cardIcon: string;
  cardAmount: number | string;
};

function CashCard({ cardTitle, cardIcon, cardAmount }: Prop) {
  return (
    <div className="w-full border rounded-lg bg-white p-3">
      <h1 className="text-center text-[25px] font-[400]">{cardTitle}</h1>
      <div className="h-[100px] flex justify-center xlsm:hidden">
        <img src={cardIcon} alt="income" className="h-full" />
      </div>
      <NumberFormat
        value={cardAmount}
        displayType={"text"}
        thousandSeparator={true}
        renderText={(value: string) => (
          <p className="text-center text-[33px] md:text-[20px] font-[700]">{`₦ ${value}`}</p>
        )}
      />
    </div>
  );
}

export default CashCard;
