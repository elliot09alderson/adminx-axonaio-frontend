import React, { createContext, useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar, { SidebarItem } from "../components/sidebar/Sidebar";
import {
  LayoutDashboard,
  Home,
  StickyNote,
  Layers,
  Flag,
  Calendar,
  LifeBuoy,
  Settings,
  UserRoundPlus,
  Landmark,
} from "lucide-react";
import { MdManageAccounts } from "react-icons/md";
import { GrShieldSecurity } from "react-icons/gr";
import { TfiHeadphoneAlt } from "react-icons/tfi";

import { useSelector } from "react-redux";

const menus = [
  {
    icon: <Home size={20} />,
    text: "Dashboard",
    to: "/admin/dashboard",
    alert: true,
    permission: "manage Dashboard",
  },
  {
    icon: <LayoutDashboard size={20} />,
    text: "ManageMerchant",
    to: "/admin/managemerchant",
    alert: false,
    permission: "manage Merchant",
  },
  {
    icon: <StickyNote size={20} />,
    text: "Manage Settlements",
    to: "/admin/managesettlements",
    alert: false,
    permission: "manage Settlements",
  },
  {
    icon: <Calendar size={20} />,
    text: "Manage Transactions",
    to: "/admin/managetransaction",
    alert: false,
    permission: "manage Transactions",
  },
  {
    icon: <Layers size={20} />,
    text: "Manage Apps",
    to: "/admin/manageapps",
    alert: true,
    permission: "manage Apps",
  },
  {
    icon: <Flag size={20} />,
    text: "Manage Employee",
    to: "/admin/manageemployee",
    alert: false,
    permission: "manage Employee",
  },
  {
    icon: <Landmark size={20} />,
    text: "Manage Vendors",
    to: "/admin/managevendor",
    alert: true,
    permission: "manage Vendors",
  },
  {
    icon: <UserRoundPlus size={20} />,
    text: "Manage Resellers",
    to: "/admin/managereseller",
    // alert: true,
    permission: "manage Resellers",
  },
  {
    icon: <GrShieldSecurity size={20} />,
    text: "Manage Resellers Admin",
    to: "/admin/reselleradmin",
    // alert: true,
    permission: "manage Resellers Admin",
  },
  {
    icon: <Settings size={20} />,
    text: " Settings",
    to: "/admin/settings",
    // alert: true,
    permission: "Merchant settings",
  },

  {
    icon: <TfiHeadphoneAlt size={20} />,
    text: "Manage Risk & Compliance",
    to: "/admin/risk&compliance",
    // alert: true,
    permission: "manage Risk & Compliance",
  },
  {
    icon: <MdManageAccounts size={20} />,
    text: "Accounts",
    to: "/admin/manageaccounts",
    // alert: true,
    permission: "manage Accounts",
  },
  {
    icon: <LifeBuoy size={20} />,
    text: "Support",
    to: "/admin/support",
    // alert: true,
    permission: "manage Support",
  },
];

const AdminLayout = () => {
  const { sidebarExtended } = useSelector((state) => state.utils);
  const { isAuthenticated, user, role, loader, successMessage, errorMessage } =
    useSelector((state) => state.auth);

  const [active, setActive] = useState(0);
  return (
    <div className="w-full bg-slate-100 dark:bg-slate-950  h-full flex bg-dashboard ">
      <aside
        className={` fixed h-[140vh] overflow-y-scroll  top-0 left-0 z-[999]  ${
          sidebarExtended ? "" : " lg:w-20 w-16 "
        }`}
      >
        <Sidebar>
          <div className="flex flex-col gap-2   ">
            {menus
              .filter((menu) => {
                return (
                  user.role === "super_admin" ||
                  user.permissions.includes(menu.permission)
                );
              })
              .map((menu, idx) => {
                console.log("xxxx");
                return (
                  <SidebarItem
                    key={idx + "xss"}
                    setActive={setActive}
                    idx={idx}
                    active={idx === active}
                    icon={menu.icon}
                    text={menu.text}
                    to={menu.to}
                    alert={menu.alert}
                  />
                );
              })}
          </div>
        </Sidebar>
      </aside>
      <main
        className={`h-full min-h-screen py-4 lg:pr-4 pr-0 dark:bg-slate-950  ${
          sidebarExtended
            ? " lg:w-[86vw] lg:ml-[16vw]  "
            : "lg:w-[95vw] lg:ml-[5vw]  w-[84vw] ml-[16vw] "
        }  w-full bg-slate-100`}
      >
        <Outlet /> {/* This will render the matched child route */}
      </main>
    </div>
  );
};

export default AdminLayout;
