import React, { useState } from "react";
import { Link } from "react-router-dom";
import MerchantPricingTable from "./MerchantPricingTable";
import BusinessDetailsTable from "./BusinessDetailsTable";

// import ResellerDetailsTable from "./Details/ResellerDetailsTable";
// import ResellerMapping from "./Mapping/ResellerMapping";
// import ResellerReports from "./Reports/ResellerReports";

function Tab({ text, active, setActive, idx, navigate }) {
  return (
    <>
      {!navigate ? (
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
      ) : (
        <Link
          to={"/admin/managereseller"}
          className={`rounded-t-lg  cursor-pointer text-center  h-12 ${
            active === idx
              ? "  dark:bg-slate-950 border-2  dark:border-slate-500 "
              : "border-2  dark:border-slate-500  "
          } w-64   px-4 py-2 dark:text-white select-none`}
          onClick={() => setActive(idx)}
        >
          {text}
        </Link>
      )}
    </>
  );
}
function Bar({ active, setActive }) {
  return (
    <>
      <div className="w-full dark:bg-night bg-day  backdrop-blur-lg flex items-end h-24   lg:flex-row flex-col gap-1 shadow-lg rounded-lg  px-8 ">
        {["business details", "pricing details ", "back"].map((item, idx) => (
          <Tab
            text={item}
            key={idx}
            active={active}
            idx={idx}
            setActive={setActive}
            navigate={item === "back"}
          />
        ))}
      </div>
    </>
  );
}

const ViewMerchantDetails = () => {
  const [active, setActive] = useState(0);

  return (
    <div className="bg-dashboard-day px-4 flex flex-col gap-4 py-8  dark:bg-slate-950   w-full ">
      <Bar active={active} setActive={setActive} />
      {active === 0 && <div className="my-4">{<BusinessDetailsTable />}</div>}
      {active === 1 && (
        <>
          <MerchantPricingTable />
        </>
      )}

      {active === 2 && <>{/* <ResellerReports /> */}</>}
    </div>
  );
};

export default ViewMerchantDetails;
