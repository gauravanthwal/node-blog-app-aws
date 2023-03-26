import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import MyBlogs from "../../components/profile/MyBlogs";
import MyProfile from "../../components/profile/MyProfile";
import { getMyBlogs } from "../../store/actions/blogAction";
import { getUserDetails } from "../../store/actions/userAction";

const ProfilePage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserDetails());
    dispatch(getMyBlogs());
  }, []);
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <MyProfile />
        <MyBlogs />
      </div>
    </div>
  );
};

export default ProfilePage;
