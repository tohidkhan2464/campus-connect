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
    <div className="flex flex-col">
      <label
        className="font-semibold w-fit group-focus-within:text-red group-focus-within:border-b-[2px] transition-colors duration-200 ease-linear"
        htmlFor={name}
      >
        {" "}
        {label} {<sup className="text-red">*</sup>}{" "}
      </label>

      <div
        className={`${
          isDragActive ? "bg-richblack-600" : "bg-white"
        } flex min-h-[250px] cursor-pointer items-center outline-none border-slate-300 p-2 mt-2 justify-center rounded-md border-2 `}
        {...getRootProps()}
        onClick={() => inputRef.current.click()} // Ensure file explorer opens
      >
        <input
          {...getInputProps()}
          ref={inputRef}
          style={{ display: "none" }}
        />
        {previewSource ? (
          // Show preview if file is selected
          <div className="flex w-full flex-col px-6 py-4">
            {!video ? (
              <img
                src={previewSource}
                alt="Preview"
                className="h-[165px] w-full rounded-md object-cover"
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
          // Show prompt when no file is selected
          <div className="flex w-full flex-col items-center p-6 min-w-[320px]">
            <div className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800">
              <FiUploadCloud className="text-2xl text-secondary-400" />
            </div>
            <p className="mt-2 max-w-[200px] text-center text-sm text-secondary-400">
              Drag and drop an {!video ? "image" : "video"}, or click to{" "}
              <span className="font-semibold text-primary-700">Browse</span> a
              file
            </p>
            <ul className="mt-10 flex list-disc justify-between space-x-12 text-center  text-xs text-secondary-400">
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
