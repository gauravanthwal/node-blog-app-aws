import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBlogById } from "../../store/actions/blogAction";

const Blog = () => {
  const { blogId } = useParams();
  const dispatch = useDispatch();

  const { blog, blogLoading } = useSelector((state) => state.blog);

  useEffect(() => {
    dispatch(getBlogById(blogId));
  }, []);

  return (
    <div className="p-5 max-w-[800px] mx-auto">
      {blogLoading && <Skeleton />}
      <h1 className="text-2xl text-gray-700 font-bold text-center my-3">
        {blog?.title}
      </h1>
      <p>{blog.body}</p>
    </div>
  );
};

export default Blog;

const Skeleton = () => {
  return (
    <div role="status" className="max-w-[800px] animate-pulse">
      <div className="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-6"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[660px] mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[520px] mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[630px] mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[500px] mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[560px]"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};
