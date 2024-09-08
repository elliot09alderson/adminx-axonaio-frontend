import React, { useEffect, useState } from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
  useLocation,
} from "react-router-dom";
import AdminLogin from "./pages/Admin/AdminLogin";
import UserLogin from "./pages/User/UserLogin";
import NotFoud from "./pages/404/NotFoud";

import "./App.css";
import Home from "./pages/Home/Home";
import UserSignup from "./pages/User/UserSignup";
import Dashboard from "./pages/User/Dashboard";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import AdminLayout from "./layouts/AdminLayout";
import ManageSettlements from "./pages/ManageSettlements/ManageSettlements";
import ManageVendor from "./pages/ManageVendor/ManageVendor";
import ManageTransactions from "./pages/ManageTransactions/ManageTransactions";
import ManangeMerchant from "./pages/ManageMerchant/ManangeMerchant";
import AdminSettings from "./pages/AdminSettings/AdminSettings";
import AdminProtector from "./components/ProtectedRoute/AdminProtector";
import { useSelector } from "react-redux";
import ManageApps from "./pages/ManageApps/ManageApps";
import ManageEmployee from "./pages/ManageEmployee/ManageEmployee";
import { ToastContainer } from "react-toastify";
import NotAuthorized from "./pages/NotAuthorized/NotAuthorized";
import Profile from "./pages/Admin/Profile";
import RiskAndCompliance from "./pages/Risk&Compliance/RiskAndCompliance";
import VerifyMerchant from "./pages/Risk&Compliance/components/VerifyMerchant";
import ManageReseller from "./pages/ManageReseller/ManageReseller";
import ViewMerchantDetails from "./pages/ManageReseller/ViewMerchantDetails/ViewMerchantDetails";
import ManageResellerAdmin from "./pages/ManageResellerAdmin/ManageResellerAdmin";
import MerchantSettings from "./pages/MerchantSettings/MerchantSettings";
const App = () => {
  const { isAuthenticated, user, role, loader, successMessage, errorMessage } =
    useSelector((state) => state.auth);

  const PermissionProtector = ({
    permissions,
    requiredPermission,
    children,
    isSuperAdmin,
  }) => {
    const location = useLocation();
    if (!isSuperAdmin) {
      if (!permissions.includes(requiredPermission)) {
        return <Navigate to="/not-authorized" state={{ from: location }} />;
      }
    }

    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/user/signup",
      element: <UserSignup />,
    },
    {
      path: "/user/login",
      element: <UserLogin />,
    },
    {
      path: "/admin/login",
      element: <AdminLogin />,
    },

    {
      path: "/not-authorized",
      element: <NotAuthorized />,
    },
    {
      path: "/admin",
      element: (
        <AdminProtector isAuthenticated={isAuthenticated} role={"admin"}>
          <AdminLayout />
        </AdminProtector>
      ),
      children: [
        {
          path: "managemerchant",
          element: (
            <PermissionProtector
              permissions={user?.permissions}
              requiredPermission="manage Merchant"
              isSuperAdmin={user?.role == "super_admin"}
            >
              <ManangeMerchant />,
            </PermissionProtector>
          ),
        },

        {
          path: "managereseller",
          element: (
            <PermissionProtector
              permissions={user?.permissions}
              requiredPermission="manage Reseller"
              isSuperAdmin={user?.role == "super_admin"}
            >
              <ManageReseller />,
            </PermissionProtector>
          ),
        },
        {
          path: "managereseller/viewdetails/:id",
          element: <ViewMerchantDetails />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "merchantsettings",
          element: <MerchantSettings />,
        },

        {
          path: "managetransaction",
          element: (
            <PermissionProtector
              permissions={user?.permissions}
              requiredPermission="manage Transactions"
              isSuperAdmin={user?.role == "super_admin"}
            >
              <ManageTransactions />,
            </PermissionProtector>
          ),
        },
        {
          path: "manageapps",

          element: (
            <PermissionProtector
              permissions={user?.permissions}
              requiredPermission="manage Apps"
              isSuperAdmin={user?.role == "super_admin"}
            >
              <ManageApps />,
            </PermissionProtector>
          ),
        },
        {
          path: "manageemployee",
          element: (
            <PermissionProtector
              permissions={user?.permissions} // this is the permissions array
              requiredPermission="manage Employee"
              isSuperAdmin={user?.role == "super_admin"}
            >
              <ManageEmployee />,
            </PermissionProtector>
          ),
        },
        {
          path: "managesettlements",
          element: (
            <PermissionProtector
              permissions={user?.permissions}
              requiredPermission="manage Settlements"
              isSuperAdmin={user?.role == "super_admin"}
            >
              <ManageSettlements />
            </PermissionProtector>
          ),
        },
        {
          path: "reselleradmin",
          element: (
            <PermissionProtector
              permissions={user?.permissions}
              requiredPermission="manage ResellerAdmin"
              isSuperAdmin={user?.role == "super_admin"}
            >
              <ManageResellerAdmin />
            </PermissionProtector>
          ),
        },
        {
          path: "managevendor",
          element: (
            <PermissionProtector
              permissions={user?.permissions}
              requiredPermission="manage Vendors"
              isSuperAdmin={user?.role == "super_admin"}
            >
              <ManageVendor />
            </PermissionProtector>
          ),
        },
        {
          path: "risk&compliance",
          element: (
            <PermissionProtector
              permissions={user?.permissions}
              requiredPermission="manage RiskAndCompliance"
              isSuperAdmin={user?.role == "super_admin"}
            >
              <RiskAndCompliance />
            </PermissionProtector>
          ),
          children: [
            {
              path: "editmerchant/:merchantId",
              element: (
                <PermissionProtector
                  permissions={user?.permissions}
                  requiredPermission="edit Merchant"
                  isSuperAdmin={user?.role == "super_admin"}
                >
                  <VerifyMerchant />
                </PermissionProtector>
              ),
            },
          ],
        },

        {
          path: "dashboard",
          element: <AdminDashboard />, // Default component for /admin/dashboard
        },
      ],
    },
    {
      path: "/user/dashboard",
      element: <Dashboard />,
    },
    {
      path: "*",
      element: <NotFoud />,
    },
  ]);
  const [darkMode, setDarkMode] = useState(false);
  function toggleDarkMode() {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  return (
    <div className={` ${darkMode && " dark "} main `}>
      {/* <ToastContainer /> */}
      <button
        className="fixed  w-16 h-16 bottom-16  right-16 bg-neutral-900 dark:bg-white rounded-full text-white dark:text-black font-semibold z-[99]"
        onClick={toggleDarkMode}
      >
        {darkMode ? "LHT" : "DRK"}
      </button>

      <RouterProvider router={router} />
    </div>
  );
};

export default App;
