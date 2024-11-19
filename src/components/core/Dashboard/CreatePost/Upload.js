/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";

import "video-react/dist/video-react.css";
import { Player } from "video-react";

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState("");

  const inputRef = useRef(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      previewFile(file);
      setSelectedFile(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: !video
      ? { "image/*": [".jpeg", ".jpg", ".png"] }
      : { "video/*": [".mp4"] },
    onDrop,
  });

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  useEffect(() => {
    register(name, { required: true });
  }, [register]);

  useEffect(() => {
    setValue(name, selectedFile);
  }, [selectedFile, setValue]);

  return (
    <div className="flex flex-col mobileS:h-[200px] mobileL:max-h-[240px] laptop:max-h-[300px] mobileM:max-h-[220px]">
      <label
        className="font-semibold mobileS:text-sm mobileM:text-sm w-fit group-focus-within:text-red group-focus-within:border-b-[2px] transition-colors duration-200 ease-linear"
        htmlFor={name}
      >
        {" "}
        {label} {<sup className="text-red">*</sup>}{" "}
      </label>

      <div
        className={`${
          isDragActive ? "bg-richblack-600" : "bg-white"
        } flex mobileS:flex-col mobileM:flex-col mobileL:flex-col mobileL:min-h-[190px] laptop:min-h-[220px] laptop:p-0 mobileL:p-0 mobileM:min-h-[170px] mobileM:p-0 min-h-[250px] mobileS:min-h-[150px] cursor-pointer items-center 
         outline-none border-slate-300 p-2 mobileS:p-0 mt-2 justify-center rounded-md border-2 `}
        {...getRootProps()}
        onClick={() => inputRef.current.click()} // Ensure file explorer opens
      >
        <input
          {...getInputProps()}
          ref={inputRef}
          hidden
          className="h-0"
          // style={{ display: "none" }}
        />
        {previewSource ? (
          // Show preview if file is selected
          <div className="flex w-full flex-col px-6 laptop:px-3 mobileL:p-1 mobileS:p-1 mobileM:p-1 py-4">
            {!video ? (
              <img
                src={previewSource}
                alt="Preview"
                className="h-[165px] mobileS:h-[100px] laptop:min-h-[170px] mobileL:h-[140px] mobileM:h-[120px] w-full rounded-md object-contain"
              />
            ) : (
              <Player aspectRatio="3:4" playsInline src={previewSource} />
            )}
            {!viewData && (
              <button
                type="button"
                className="mt-2 text-richblack-400 underline"
                onClick={(e) => {
                  e.stopPropagation();
                  setPreviewSource("");
                  setSelectedFile(null);
                  setValue(name, null);
                }}
              >
                Cancel
              </button>
            )}
          </div>
        ) : (
          <div className="flex w-full flex-col items-center p-6 mobileL:p-0 mobileL:min-w-[350px] mobileS:p-0 mobileM:p-0 mobileM:min-w-[270px] min-w-[320px] mobileS:min-w-[250px]">
            <div className="grid aspect-square w-14 mobileS:w-7 mobileM:w-7 place-items-center rounded-full bg-pure-greys-800">
              <FiUploadCloud className="text-2xl mobileS:text-xl mobileM:text-xl text-secondary-400" />
            </div>
            <p className="mt-2 mobileS:mt-1 mobileM:mt-1 mobileM:text-sm max-w-[200px] mobileS:text-sm text-center text-sm text-secondary-400">
              Drag and drop an {!video ? "image" : "video"}, or click to{" "}
              <span className="font-semibold text-primary-700">Browse</span> a
              file
            </p>
            <ul className="mt-10 mobileS:mt-1 mobileM:mt-1 mobileL:mt-1 laptop:mt-1 flex list-disc justify-between space-x-12 text-center  text-xs text-secondary-400">
              <li>Recommended Aspect ratio 3:4</li>
            </ul>
          </div>
        )}
      </div>

      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {" "}
          {label} is required{" "}
        </span>
      )}
    </div>
  );
}
