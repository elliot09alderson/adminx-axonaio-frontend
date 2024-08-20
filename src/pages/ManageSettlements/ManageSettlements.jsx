import React, { useState } from "react";

import SettlementTable from "./settlement/SettlementTable";

function Tab({ text, active, setActive, idx }) {
  return (
    <div
      className={`rounded-t-lg  cursor-pointer text-center  h-12 ${
        active === idx
          ? "  dark:bg-slate-950 border-2  dark:border-slate-500 "
          : "border-2  dark:border-slate-500  "
      } w-64   px-4 py-2 dark:text-white select-none`}
      onClick={() => setActive(idx)}
    >
      {text}
    </div>
  );
}

const ManageSettlements = () => {
  const [active, setActive] = useState(0);

  const merchantHeaders = [];
  const merchantData = [];
  return (
    <div className="bg-dashboard-day px-4 flex flex-col gap-4 py-8  dark:bg-slate-950   w-full ">
      {/* <Bar active={active} setActive={setActive} /> */}
      {active === 0 && (
        <div className="my-4">
          <SettlementTable />
        </div>
      )}
    </div>
  );
};

export default ManageSettlements;
