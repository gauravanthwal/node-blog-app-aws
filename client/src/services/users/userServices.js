import { BaseUrl } from "../config";
import axios from "axios";
import { getStorage } from "../../utils/storage";

export const LoginUser = async (user) => {
  try {
    const res = await axios.post(BaseUrl + "user/signin", user);
    return res;
  } catch (err) {
    console.log("error : ", err?.response?.data);
    return err?.response?.data;
  }
};

export const RegisterUser = async (user) => {
  try {
    const res = await axios.post(BaseUrl + "user/signup", user);
    return res;
  } catch (err) {
    console.log("error : ", err?.response?.data);
    return err?.response?.data;
  }
};

export const GetUserDetails = async () => {
  try {
    const res = await axios.get(BaseUrl + "user/getUserDetails", {
      headers: {
        Authorization: `Bearer ${getStorage("token")}`,
      },
    });
    return res;
  } catch (err) {
    console.log(err.message);
    return err?.response?.data;
  }
};
export const UpdateUserProfile = async (user) => {
  try {
    const res = await axios.put(BaseUrl + "user/updateUserProfile", user, {
      headers: {
        Authorization: `Bearer ${getStorage("token")}`,
      },
    });
    return res;
  } catch (err) {
    console.log(err.message);
    return err?.response?.data;
  }
};
