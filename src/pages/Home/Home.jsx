import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../../rtk/slices/authSlice";
import { Link } from "react-router-dom";

const Home = () => {
  const { isLoggedIn, role } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  return (
    <div className="bg-black/10 h-screen  w-[100vw]">
      <nav className="h-20 bg-stone-500 gap-5 center-row w-full">
        {isLoggedIn ? (
          <button
            onClick={() => {
              dispatch(logout());
            }}
            className="px-4 py-2  bg-stone-600 text-white rounded-lg"
          >
            logout
          </button>
        ) : (
          <button
            onClick={() => {
              dispatch(login());
            }}
            className="px-4 py-2  bg-stone-600 text-white rounded-lg"
          >
            login
          </button>
        )}

        {isLoggedIn ? (
          <span className="text-green-400"> user logged in </span>
        ) : (
          <span className="text-red-800"> user not logged in </span>
        )}

        <Link to={"/admin"} className="text-blue-500 underline font-seminbold">
          go to admin
        </Link>
      </nav>
    </div>
  );
};

export default Home;
