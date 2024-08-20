import React, { useState } from "react";

import EmployeeTable from "./Employee/EmployeeTable";
import EmployeePermissions from "./Employee/EmployeePermissions";

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
      <div className="w-full dark:bg-night bg-day  backdrop-blur-lg flex items-end h-24   lg:flex-row flex-col gap-1 shadow-lg rounded-lg  px-8 ">
        {["Employee Actions", "Employee Permissions"].map((item, idx) => (
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

const ManangeEmployee = () => {
  const [active, setActive] = useState(0);

  const merchantHeaders = [];
  const merchantData = [];
  return (
    <div className="bg-dashboard-day px-4 flex flex-col gap-4 py-8  dark:bg-slate-950   w-full ">
      <Bar active={active} setActive={setActive} />
      {active === 0 && (
        <div className="my-4">
          <EmployeeTable />
        </div>
      )}
      {active === 1 && (
        <>
          <EmployeePermissions />
        </>
      )}
      {/* 
      {active === 2 && (
        <>
          <RouteTable />
        </>
      )} */}
    </div>
  );
};

export default ManangeEmployee;
