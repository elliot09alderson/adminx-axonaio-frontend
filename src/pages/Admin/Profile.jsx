import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user, role } = useSelector((state) => state.auth);
  return (
    <div className=" w-full h-screen flex flex-col items-center justify-center ">
      <div className="w-full  flex p-8 lg:px-24 items-center justify-evenly gap-8 lg:gap-12">
        <div className="rounded-xl  w-[60%] h-[50vh] bg-slate-800 flex flex-col items-center justify-center">
          <div className="w-64 h-64 bg-slate-800 absolute rounded-full top-32 border-[8px] border-slate-950"></div>
          {/* <h1 className="text-slate-200 text-4xl my-4 ">Admin Details</h1> */}
          <div className="flex justify-between gap-20 items-center">
            <div className="flex flex-col gap-5  justify-between lg:text-lg text-base text-slate-400 ">
              <div className="flex items-center font-medium    flex ">
                <label htmlFor="" className="text-slate-200">
                  Name :{" "}
                </label>
                <h1 className="py-1 px-2">
                  {user?.first_name + " " + user?.last_name}
                </h1>
              </div>
              <div className="flex items-center font-medium    flex ">
                <label htmlFor="" className="text-slate-200">
                  Role :{" "}
                </label>
                <h1 className="py-1 px-2">{user?.role}</h1>
              </div>
              <div className="flex items-center font-medium    flex ">
                <label htmlFor="" className="text-slate-200">
                  Department :{" "}
                </label>
                <h1 className="py-1 px-2">{user?.department}</h1>
              </div>
              <div className="flex items-center font-medium    flex ">
                <label htmlFor="" className="text-slate-200">
                  Designition :{" "}
                </label>
                <h1 className="py-1 px-2">{user?.designation}</h1>
              </div>
              <div className="flex items-center font-medium    flex ">
                <label htmlFor="" className="text-slate-200">
                  Official Email :{" "}
                </label>
                <h1 className="py-1 px-2">{user?.official_email}</h1>
              </div>
              <div className="flex items-center font-medium    flex ">
                <label htmlFor="" className="text-slate-200">
                  Phone Number :{" "}
                </label>
                <h1 className="py-1 px-2">{user?.mobile_no}</h1>
              </div>
            </div>
            <div className="flex flex-col gap-5  justify-between items-start  lg:text-lg text-base text-slate-400 ">
              <div className="flex items-center font-medium    flex ">
                <label htmlFor="" className="text-slate-200">
                  Username :{" "}
                </label>
                <h1 className="py-1 px-2">{user?.username}</h1>
              </div>
              {role !== "super_admin" && (
                <div className="flex items-center font-medium    flex ">
                  <label htmlFor="" className="text-slate-200">
                    Employee Id :{" "}
                  </label>
                  <h1 className="py-1 px-2">{user?.emp_id}</h1>
                </div>
              )}
              <div className="flex items-center font-medium    flex ">
                <label htmlFor="" className="text-slate-200">
                  Personal mail :{" "}
                </label>
                <h1 className="py-1 px-2">{user?.personal_email}</h1>
              </div>
              <div className="flex items-center font-medium    flex ">
                <label htmlFor="" className="text-slate-200">
                  Last Active :{" "}
                </label>
                <h1 className="py-1 px-2">{user?.last_active}</h1>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[26%] vertical lg:text-xl text-lg rounded-xl py-8 bg-slate-800 flex gap-5 flex-col items-center justify-center">
          {role !== "super_admin" ? (
            <div className=" text-slate-400 font-medium  px-2 py-8 bg-slate-800 flex gap-8 flex-col  justify-center">
              {user?.permissions.map((item, idx) => (
                <h1 className="py-1 px-2" key={item + idx}>
                  {item}
                </h1>
              ))}
            </div>
          ) : (
            <>
              <div className="lg:text-xl text-lg text-slate-400 font-medium  px-2 py-8 bg-slate-800 flex gap-8 flex-col  justify-center">
                <h1 className="text-4xl text-center text-slate-200 mb-4">
                  Permissions
                </h1>

                <li className="py-1 px-2 ">Manage Merchant </li>
                <li className=" py-1 px-2 ">Manage Settlements</li>
                <li className=" py-1 px-2 ">Manage Routes</li>
                <li className=" py-1 px-2 ">Manage Apps</li>
                <li className=" py-1 px-2 ">Manage Transactions</li>
                <li className=" py-1 px-2 ">Manage Resellers</li>
                <li className=" py-1 px-2 ">Admin Dashboard</li>
                <li className=" py-1 px-2 ">Manage Reseller Admin</li>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
