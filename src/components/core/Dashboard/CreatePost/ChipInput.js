/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"; // Importing React hook for managing component state
import { MdClose } from "react-icons/md";

export default function ChipInput({
  label,
  name,
  placeholder,
  register,
  errors,
  setValue,
  getValues,
}) {
  const [chips, setChips] = useState([]);

  useEffect(() => {
    register(name, { validate: (value) => value.length > 0 });
  }, []);

  useEffect(() => {
    setValue(name, chips);
  }, [chips]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      const chipValue = event.target.value.trim();
      if (chipValue && !chips.includes(chipValue)) {
        const newChips = [...chips, chipValue];
        setChips(newChips);
        event.target.value = "";
      }
    }
  };

  const handleDeleteChip = (chipIndex) => {
    const newChips = chips.filter((_, index) => index !== chipIndex);
    setChips(newChips);
  };

  return (
    <div className="flex flex-col space-y-2">
      <label
        className="font-semibold w-fit group-focus-within:text-red group-focus-within:border-b-[2px] my-1 transition-colors duration-200 ease-linear"
        htmlFor={name}
      >
        {label} <sup className="text-pink-200">*</sup>
      </label>

      <div className="flex w-full max-w-[320px] flex-wrap gap-y-2">
        {chips.map((chip, index) => (
          <div
            key={index}
            className="m-1 flex items-center rounded-full bg-primary-200 px-2 py-1 text-sm text-richblack-5"
          >
            {chip}
            <button
              type="button"
              className="ml-2 focus:outline-none"
              onClick={() => handleDeleteChip(index)}
            >
              <MdClose className="text-sm" />
            </button>
          </div>
        ))}

        <input
          id={name}
          name={name}
          type="text"
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          className="outline-none border-[2px] border-slate-300 py-1 px-2 rounded-md w-[100%] outline-b"
        />
      </div>
    </div>
  );
}