import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";

const CreatePost = () => {
    const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");

  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];

    if (selectedImage) {
      setImage(selectedImage);
    }
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("description", description);

    setImage(null);
    setDescription("");
    navigate("/singlePost");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="h-screen w-screen flex flex-col mt-2 items-center relative"
    >
      <div className="flex flex-col justify-center items-center  w-1/6 min-h-[8rem] mb-5">
        <label htmlFor="image" className="text-white text-center text-2xl mb-5">
          Upload Image
        </label>
        <div className="flex flex-col justify-start h-full items-start">
          <input
            type="file"
            id="image"
            className="w-full h-full  mx-auto z-10 rounded-3xl bg-richblack-700 text-white text-xl"
            accept="image/*"
            onChange={handleImageChange}
          ></input>
          <div className="h-full w-full  -z-10 rounded-3xl  border-solid border-2"></div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center relative mt-2 w-1/3 min-h-[6rem]">
        <label
          htmlFor="description"
          className="text-white z-30 absolute top-0 text-center text-2xl mb-2 "
        >
          Image Description
        </label>

        <div className="flex flex-col justify-start items-start">
          <input
            type="text"
            placeholder="Enter captions here..."
            id="description"
            className="w-full h-full absolute mx-auto px-5 top-16 left-0 z-10 rounded-3xl bg-richblack-700 text-white text-2xl"
            onChange={handleDescriptionChange}
          ></input>
          <div className="h-full w-full absolute top-16 left-0 -z-10 rounded-3xl  border-solid border-2"></div>
        </div>
      </div>

      <button type="submit" className="text-white mt-20 px-10 py-5 rounded-xl border-2  z-20 bg-slate-400">Upload</button>
    </form>
  );
};

export default CreatePost;

// const CreatePost = () => {
//   return (
//       <form className=" bg-richblack-900 h-screen -mt-10 flex justify-center items-center">
//         <div>
//             <label >
//                 <input id="postImage">
//                 </input>
//             </label>
//         </div>

//       </form>
//   );
// };

// export default CreatePost;
