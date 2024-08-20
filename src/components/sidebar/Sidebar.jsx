import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";

import { createContext, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toggleSidebar } from "../../rtk/slices/utilsSlice";
import { IoMdLogOut } from "react-icons/io";
import { logout } from "../../rtk/slices/authSlice.js";
import { CgProfile } from "react-icons/cg";
const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const dispatch = useDispatch();
  const [expanded, setExpanded] = useState(true);
  const { role, loader, user, successMessage, errorMessage } = useSelector(
    (state) => state.auth
  );
  return (
    <>
      <aside className="h-screen overflow-y-scroll dark:bg-slate-950 border-r">
        <nav className="h-full flex  flex-col bg-slate-300 dark:bg-slate-950 dark:text-white border-r shadow-sm">
          <div
            className={`lg:p-4 px-0  pb-2 flex ${
              !expanded ? " justify-center " : " justify-between px-2 "
            } items-center`}
          >
            {expanded && (
              <Link to={"profile"}>
                <CgProfile
                  size={34}
                  className="text-white cursor-pointer hover:text-slate-600  transition-all"
                />
              </Link>
            )}
            <h1
              className={`overflow-hidden text-3xl my-4 ml-4  transition-all ${
                expanded ? "w-32" : "w-0"
              }`}
            >
              Admin
            </h1>

            <button
              onClick={() => {
                setExpanded((curr) => !curr);
                dispatch(toggleSidebar());
              }}
              className="lg:p-1.5 p:0 rounded-lg bg-gray-50 dark:bg-slate-950 hover:bg-gray-100"
            >
              {expanded ? <ChevronFirst /> : <ChevronLast />}
            </button>
          </div>

          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1 lg:px-3 px-1 ">{children}</ul>
          </SidebarContext.Provider>

          <div className="border-t flex p-3">
            {/* <img src={profile} className="w-10 h-10 rounded-md" /> */}
            <div
              className={`flex justify-between items-center overflow-hidden transition-all ${
                expanded ? "w-64 ml-3" : "w-0"
              } `}
            >
              <div className="leading-4">
                <h4 className="font-semibold">
                  {user?.first_name + " " + user?.last_name}
                </h4>
                <span className="text-xs text-gray-600">
                  {user?.official_email}
                </span>
              </div>
              <IoMdLogOut
                size={30}
                className="cursor-pointer"
                onClick={() => {
                  dispatch(logout());
                }}
              />
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}

export function SidebarItem({ icon, text, active, setActive, idx, alert, to }) {
  const { expanded } = useContext(SidebarContext);
  // console.log("expanded", expanded);
  return (
    <Link
      to={to}
      onClick={() => setActive(idx)}
      className={`relative flex items-center py-4 lg:px-3 px-2 justify-center  font-medium rounded-md cursor-pointer transition-colors group ${
        active
          ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 dark:text-slate-950 text-indigo-800"
          : "hover:bg-indigo-50 text-gray-600"
      }`}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        ></div>
      )}

      {!expanded && (
        <div
          className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
        >
          {text}
        </div>
      )}
    </Link>
  );
}
