import React, { useState } from "react";

import MerchantSettings from "../MerchantSettings/MerchantSettings";
import ManageAccounts from "../ManageAccounts/Whitelist";

function Tab({ text, active, setActive, idx }) {
  return (
    <div
      className={`rounded-lg  cursor-pointer text-center  h-12 ${
        active === idx
          ? "  dark:bg-slate-950 border-2  dark:border-slate-500 "
          : "border-2  bg-slate-700 dark:border-slate-500  "
      } w-64   px-4 py-2 dark:text-white select-none`}
      onClick={() => setActive(idx)}
    >
      {text}
    </div>
  );
}
function Bar({ active, setActive }) {
  return (
    <>
      <div className="w-full dark:bg-slate-950 bg-day  backdrop-blur-lg flex items-end    lg:flex-row flex-col gap-1 shadow-lg rounded-lg  px-8 ">
        {["Merchant Settings", "WhiteList ", "logs"].map((item, idx) => (
          <Tab
            text={item}
            key={idx}
            active={active}
            idx={idx}
            setActive={setActive}
          />
        ))}
      </div>
    </>
  );
}
const AdminSettings = () => {
  const [active, setActive] = useState(0);
  return (
    <div className="bg-dashboard-day px-4 flex flex-col gap-4 py-8  dark:bg-slate-950   w-full ">
      <Bar active={active} setActive={setActive} />
      {active === 0 && <div className="my-4">{<MerchantSettings />}</div>}
      {active === 1 && (
        <>
          <ManageAccounts />
        </>
      )}

      {/* {active === 2 && (
        <>
          <ViewWebhooks />
        </>
      )} */}
    </div>
  );
};

export default AdminSettings;
