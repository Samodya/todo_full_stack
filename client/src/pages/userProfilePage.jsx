import Cookies from "js-cookie";
import { TopBanner } from "../components/topBanner";
import { useEffect, useState } from "react";
import apiService from "../utilities/httpservices";
import userPlaceholder from "../assets/images/user.png";
import axios from "axios";

export const UserProfile = () => {
  const userId = Cookies.get("userId");
  const token = Cookies.get("token");

  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profpic, setProfPic] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const getUserDetails = async () => {
    try {
      const result = await apiService.getDataById("users", userId, token);
      setFullname(result.data.fullname);
      setUsername(result.data.username);
      setEmail(result.data.email);
      setProfPic(result.data.filePath);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveProfile = async () => {
    try {
      const updatedData = { fullname, username, email };
      await apiService.updateData("users", userId, updatedData, token);
      setEditMode(false);
    } catch (error) {
      console.log("Error updating profile:", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUploadPicture = async () => {
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      await axios.put(
        `http://localhost:4000/api/users/editprof/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSelectedFile(null);
      setPreviewUrl("");
      getUserDetails();
    } catch (error) {
      console.error("Error uploading picture:", error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <TopBanner title={fullname || "User Profile"} />

      <div className="flex-1 px-6 sm:px-12 md:px-24 lg:px-32 xl:px-48 py-10">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Profile Picture Left Section */}
          <div className="flex flex-col items-center justify-start w-full lg:max-w-[320px]">
            <img
              src={
                previewUrl
                  ? previewUrl
                  : profpic
                  ? `http://localhost:4000/${profpic.replace(/^\/+/, "")}`
                  : userPlaceholder
              }
              alt="Profile"
              className="w-40 h-40 sm:w-48 sm:h-48 rounded-full object-cover border-4 border-indigo-500 shadow-md"
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="upload-pic"
            />
            <label
              htmlFor="upload-pic"
              className="mt-4 cursor-pointer px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Change Picture
            </label>

            {selectedFile && (
              <button
                onClick={handleUploadPicture}
                className="mt-3 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Save Picture
              </button>
            )}
          </div>

          {/* Right Side Inputs */}
          <div className="flex-1 space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                readOnly={!editMode}
                className={`w-full px-4 py-3 border rounded-md ${
                  editMode
                    ? "bg-white border-gray-400"
                    : "bg-gray-50 border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-indigo-400`}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                readOnly={!editMode}
                className={`w-full px-4 py-3 border rounded-md ${
                  editMode
                    ? "bg-white border-gray-400"
                    : "bg-gray-50 border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-indigo-400`}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                readOnly={!editMode}
                className={`w-full px-4 py-3 border rounded-md ${
                  editMode
                    ? "bg-white border-gray-400"
                    : "bg-gray-50 border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-indigo-400`}
              />
            </div>

            <div className="flex gap-4 pt-2 flex-wrap">
              {editMode ? (
                <>
                  <button
                    onClick={handleSaveProfile}
                    className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditMode(false)}
                    className="px-5 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditMode(true)}
                  className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
