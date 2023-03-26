import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { logoutUser } from "../../store/actions/userAction";

const Navbar = () => {
  const { isAuth } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logoutUser());
    navigate("/login");
  };
  return (
    <header className="text-gray-600 body-font border-b">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        {/* Logo */}
        <div>
          <Link to="/">
            <h1 className="text-lg font-bold text-blue-600">SuperBlog</h1>
          </Link>
        </div>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          {!isAuth ? (
            <>
              <Link className="mr-5 hover:text-gray-900" to={"/login"}>
                Login
              </Link>
              <Link className="mr-5 hover:text-gray-900" to="/signup">
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link className="mr-5 hover:text-gray-900" to="/blogs">
                Blogs
              </Link>
              <Link className="mr-5 hover:text-gray-900" to={"/profile"}>
                Profile
              </Link>
            </>
          )}
        </nav>
        {isAuth && (
          <button
            onClick={handleLogOut}
            className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
          >
            Log Out
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
