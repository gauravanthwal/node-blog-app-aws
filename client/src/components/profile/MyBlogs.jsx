import React from "react";
import { useNavigate } from "react-router-dom";

const MyBlogs = () => {
  const navigate = useNavigate();

  return (
    <div className="border p-2 rounded-lg">
      <div className="no-blogs text-center my-4">
        <h2 className="text-gray-800 text-lg">You Don't have any blogs</h2>
        <p className="text-gray-600 text-sm">Start Writing your first blog</p>
      </div>
      <div className="create-new-blog flex justify-center ">
        <button
          onClick={() => navigate("/create-blog")}
          type="button"
          className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Post New Blog
        </button>
      </div>
    </div>
  );
};

export default MyBlogs;
