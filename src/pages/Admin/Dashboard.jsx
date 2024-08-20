import React from "react";

import { Link, NavLink } from "react-router-dom";
const Dashboard = () => {
  return (
    <div className="center-col ">
      <Link to={"/apps/csp"}>
        <div className="rounded p-5">
          <img src="" alt="" />
        </div>
      </Link>
    </div>
  );
};

export default Dashboard;
