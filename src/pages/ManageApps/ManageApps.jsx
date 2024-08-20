import React, { useState } from "react";
import AppsTable from "./AppsTable";
import AddApps from "./AddApps";

export function Button({ text, onClick }) {
  return (
    <div
      className="rounded-lg cursor-pointer text-center bg-day shadow-sm w-64  dark:bg-dashboard-night px-4 py-3 dark:text-white"
      onClick={onClick}
    >
      {text}
    </div>
  );
}
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
function Bar({ active, setActive }) {
  return (
    <>
      <div className="w-full dark:bg-slate-800 bg-day  backdrop-blur-lg flex items-end h-24   lg:flex-row flex-col gap-1 shadow-lg rounded-lg  px-8 ">
        {["Apps Permissions", "App Activation"].map((item, idx) => (
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

const ManangeApps = () => {
  const [active, setActive] = useState(0);

  const merchantHeaders = [];
  const merchantData = [];

  return (
    <div className="bg-dashboard-day  px-4 flex flex-col gap-4 py-8 dark:bg-dashboard-night   w-full ">
      <Bar active={active} setActive={setActive} />
      {active === 0 && (
        <>
          <AppsTable />
        </>
      )}

      {active === 1 && <div className="my-4">{<AddApps />}</div>}
    </div>
  );
};

export default ManangeApps;
