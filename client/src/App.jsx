import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/ui/Navbar";
import HomePage from "./pages/homePage/HomePage";
import SignupPage from "./pages/signupPage/SignupPage";
import LoginPage from "./pages/loginPage/LoginPage";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser, updateUserFromStorage } from "./store/actions/userAction";
import Alert from "./components/ui/Alert";
import { getStorage } from "./utils/storage";
import BlogsPage from "./pages/blogs/BlogsPage";
import ProfilePage from "./pages/profile/ProfilePage";
import Blog from "./pages/blogs/Blog";
import CreateBlog from "./pages/createBlog/CreateBlog";

const App = () => {
  const { isAuth } = useSelector((state) => state.user);
  const { alerts } = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (!isAuth) {
  //     dispatch(logoutUser());
  //   }
  // }, [isAuth]);
  useEffect(() => {
    if (getStorage("auth") && getStorage("token")) {
      dispatch(updateUserFromStorage());
    }
  }, []);
  return (
    <>
      <Navbar />
      {alerts.length > 0 &&
        alerts.map((alert) => <Alert key={alert.id} alert={alert} />)}
      <Routes>
        <Route element={<BlogsPage />} path="/" />
        <Route element={<BlogsPage />} path="/blogs" />
        <Route element={<Blog />} path="/blog/:blogId" />
        <Route element={<CreateBlog />} path="/create-blog" />
        <Route element={<ProfilePage />} path="/profile" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<SignupPage />} path="/signup" />
      </Routes>
    </>
  );
};

export default App;
