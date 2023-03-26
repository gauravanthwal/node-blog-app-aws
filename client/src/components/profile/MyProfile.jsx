import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cameraIcons, cancelIcon } from "../../assets/icons/icons";
import { updateUserProfile } from "../../store/actions/userAction";

const defaultImg =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";

const MyProfile = () => {
  const { userDetails } = useSelector((state) => state.user);

  const { fullName, email, profileImageURL, role } = userDetails;

  const dispatch = useDispatch();

  const [isUpdating, setIsUpdating] = useState(false);
  const [postImage, setPostImage] = useState({ myFile: "" });

  const [inputs, setInputs] = useState({
    fullName: fullName || "",
    email: email || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    userDetails.email = inputs.email;
    userDetails.fullName = inputs.fullName;
    userDetails.profileImageURL.url = postImage;
    dispatch(updateUserProfile(userDetails));

    setIsUpdating(false);
  };

  const handleOnChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    // console.log(base64);
    setPostImage(base64);
  };

  useEffect(() => {
    setInputs({ fullName, email });
  }, [isUpdating]);
  return (
    <div className="border p-2 rounded-lg ">
      <div className="image rounded-full flex items-center flex-col">
        <img
          src={`${profileImageURL?.url}`}
          alt=""
          className="w-40 h-40 rounded-full border-4 border-gray-200"
        />
        <div className="image-update-icon flex flex-col items-center gap-2 mt-2">
          <button onClick={() => setIsUpdating(!isUpdating)}>
            {isUpdating ? cancelIcon() : cameraIcons()}
          </button>
        </div>
      </div>
      {/* form  */}
      <div className="details flex mt-4 items-center flex-col">
        {isUpdating && (
          <div className="text-gray-600">
            <input
              className="block p-1 w-full mb-3 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              id="small_size"
              type="file"
              onChange={(e) => handleFileUpload(e)}
            />
          </div>
        )}

        <div className="text-gray-600">
          {isUpdating ? (
            <>
              <label> Name: </label>
              <input
                type="text"
                name="fullName"
                value={inputs.fullName}
                onChange={handleOnChange}
                className="border rounded-lg p-1 px-3 my-1"
              />
            </>
          ) : (
            <>
              <span className="my-3 inline-block">
                {" "}
                Name: <span> {fullName}</span>
              </span>
            </>
          )}
        </div>
        <div className="text-gray-600">
          {isUpdating ? (
            <>
              <label>Email: </label>
              <input
                type="text"
                value={inputs.email}
                name="email"
                onChange={handleOnChange}
                className="border p-1 px-3 rounded-lg my-1"
              />
            </>
          ) : (
            <>
              <span>
                {" "}
                Email: <span> {email}</span>
              </span>
            </>
          )}
        </div>
        {isUpdating && (
          <button
            onClick={handleSubmit}
            className="bg-blue-600 px-4 py-1 rounded-lg text-white hover:bg-blue-700"
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;

const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};
