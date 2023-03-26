import { getStorage } from "../../utils/storage";
import { Types } from "../types";

const initialState = {
  blogs: [],
  myBlogs: [],
  blog: {},
  blogLoading: false,
};

export const blogReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case Types.blog.GET_ALL_BLOGS_SUCCESS:
      return { ...state, blogs: payload };
    case Types.blog.GET_MY_BLOGS_SUCCESS:
      return { ...state, myBlogs: payload };
    case Types.blog.GET_BLOG_SUCCESS:
      return { ...state, blog: payload };
    case Types.blog.GET_BLOG_CLEAR:
      return { ...state, blog: {} };
    case Types.blog.GET_BLOG_LOADING:
      return { ...state, blogLoading: payload };
    default:
      return state;
  }
};
