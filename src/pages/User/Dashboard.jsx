import React from "react";
import { Link } from "react-router-dom";
import csp from "/images/csp.jpg";
import library from "/images/library.jpg";
import accountManagement from "/images/account-management.png";
import factory from "/images/factory.png";
const Dashboard = () => {
  const apps = [
    { name: "csp", image: csp, path: "/apps/csp" },
    { name: "library", image: library, path: "/apps/library" },
    {
      name: "account-management",
      image: accountManagement,
      path: "/apps/account-management",
    },
    {
      name: "factory",
      image: factory,
      path: "/apps/factory",
    },
  ];
  return (
    <div>
      <div className="center-row ">
        {apps.map((app, idx) => (
          <div key={idx + app.path}>
            <Link to={app.path}>
              <div className="rounded-full w-32 h-32 flex items-center p-5 bg-gray-300 ">
                <img src={app.image} alt="" className="" />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
