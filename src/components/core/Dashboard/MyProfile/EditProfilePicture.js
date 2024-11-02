import { useEffect, useRef, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { updateDisplayPicture } from "../../../../services/operations/settingsAPI";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const EditProfilePicture = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);

  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      previewFile(file);
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleFileUpload = () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("profilePicture", imageFile);
      dispatch(updateDisplayPicture(token, formData)).then(() => {
        setLoading(false);
      });
    } catch (error) {
      toast.error("Failed to upload image");
    }
  };

  useEffect(() => {
    if (imageFile) {
      previewFile(imageFile);
    }
  }, [imageFile]);

  return (
    <div>
      <div className="w-9/12 mx-auto">
        <div className="relative flex flex-col justify-between mt-4  bg-white p-6 rounded-lg border-[3px] border-secondary-600 z-0">
          <RxCross2
            onClick={() => navigate("/my-profile")}
            className="absolute right-7 text-secondary-500 text-2xl cursor-pointer hover:text-secondary-900"
          />
          <div className="flex flex-row gap-x-6 w-full items-center ">
            <div className="p-1 border-[2px] border-secondary-500 rounded-full">
              <img
                src={
                  previewSource || user?.profileImage || `${user?.profileImage}`
                }
                alt={`profile-${user?.firstName}`}
                className="aspect-square w-[80px] rounded-full object-cover"
              />
            </div>

            <div className="flex flex-col items-start space-y-2">
              <p className="text-xl font-semibold">Change Profile Picture</p>
              <div className="flex flex-row gap-x-3">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept={[".jpeg", ".jpg", ".png"]}
                />

                <button
                  onClick={handleClick}
                  disabled={loading}
                  className="bg-primary-100 text-secondary-500 border-[2px] border-secondary-500  w-full transition-all duration-200 ease-linear font-semibold
                  hover:text-secondary-900 text-lg cursor-pointer flex flex-row gap-x-2 items-center rounded-md py-2 px-6 hover:border-secondary-900"
                >
                  Select
                </button>

                <button onClick={handleFileUpload}>
                  {!loading ? (
                    <p
                      className="bg-gradient-to-r to-blue from-red text-secondary-100 w-full transition-all duration-200 ease-linear font-semibold
                  hover:text-secondary-900 text-lg cursor-pointer flex flex-row gap-x-2 items-center rounded-md py-2 px-6"
                    >
                      <FiUpload className="text-lg text-richblack-900" />
                      Upload
                    </p>
                  ) : (
                    <p
                      className="bg-gradient-to-r to-blue from-red text-secondary-100 w-full transition-all duration-200 ease-linear font-semibold
                    hover:text-secondary-900 text-lg cursor-pointer flex flex-row gap-x-2 items-center rounded-md py-2 px-6"
                    >
                      <FiUpload className="text-lg text-richblack-900" />
                      Uploading...
                    </p>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePicture;
