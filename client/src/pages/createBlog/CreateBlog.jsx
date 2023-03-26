import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNewBlog } from "../../store/actions/blogAction";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const [inputs, setInputs] = useState({ title: "", body: "" });
  const { title, body } = inputs;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onHandleChange = (e) => {
    setInputs({ ...inputs, [e.target.id]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createNewBlog({ title, body }));
    navigate("/");
  };
  return (
    <div className="mt-4 p-4">
      <form className="max-w-[800px] mx-auto" onSubmit={onSubmit}>
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Title"
            value={title}
            onChange={onHandleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="body"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Body
          </label>
          <textarea
            id="body"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your blog here..."
            value={body}
            onChange={onHandleChange}
          ></textarea>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
