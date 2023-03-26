import { BaseUrl } from "../config";
import axios from "axios";
import { getStorage } from "../../utils/storage";

export const GetAllBlogs = async (user) => {
  try {
    const res = await axios.get(BaseUrl + "blog/getAll");
    return res;
  } catch (err) {
    console.log("error : ", err?.response?.data);
    return err?.response?.data;
  }
};

export const GetMyBlogs = async () => {
  try {
    const res = await axios.get(BaseUrl + "blog/myBlogs", {
      headers: {
        Authorization: `Bearer ${getStorage("token")}`,
      },
    });
    return res;
  } catch (err) {
    console.log("error : ", err?.response?.data);
    return err?.response?.data;
  }
};

export const GetBlogById = async (id) => {
  try {
    const res = await axios.get(BaseUrl + "blog/" + id);
    return res;
  } catch (err) {
    console.log("error : ", err?.response?.data);
    return err?.response?.data;
  }
};

export const CreateNewBlog = async (blog) => {
  try {
    const res = await axios.post(BaseUrl + "blog/add-new", blog, {
      headers: {
        Authorization: `Bearer ${getStorage("token")}`,
      },
    });
    return res;
  } catch (err) {
    console.log("error : ", err?.response?.data);
    return err?.response?.data;
  }
};
