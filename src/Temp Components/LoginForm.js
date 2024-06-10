import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  // const { register, handleSubmit } = useForm();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // const [data, setData] = useState([]);

  const [showPassword, setShowPassword] = useState(false);

  function changehandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }
  useEffect(() => {
    // fetch(`/api/data/user/login`, {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       setFormData(data);
    //     });
    //   // setFormData(savedUserResponse);
    //   console.log("FORM RESPONSE......", savedUserResponse);
      // console.log("FORM form Data......", formData);
      // console.log("data,", data);
      navigate("/dashboard")
  }, [])

//   const createEmployee = async (data) => {
//     const savedUserResponse = await fetch(`/data/user/login`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setFormData(data);
//       });
//     // setFormData(savedUserResponse);
//     console.log("FORM RESPONSE......", savedUserResponse);
//     // console.log("FORM form Data......", formData);
//     console.log("data,", data);
//   };

//   useEffect(() => {
//     function submitHandler(event) {
//       event.preventDefault();
//       console.log("data,", data);
//       console.log("form data", formData);
//       createEmployee(formData);

//       // setIsLoggedIn(true);
//       // toast.success("Logged In");
//       // console.log("Printing the formData ");
//       // console.log(formData)
//       // navigate("/dashboard");
//     }
//   }, []);

  return (
    <form
    //   onSubmit={submitHandler}
      className="flex flex-col h-full w-full gap-y-4 mt-6"
    >
      <label className="w-full">
        <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
          Email Address <sup className=" text-pink-200">*</sup>
        </p>
        <input
          type="email"
          required
          // {...register("email")}
          value={formData.email}
          onChange={changehandler}
          placeholder="Enter Email ID"
          name="email"
          className=" bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] "
          // style="box-shadow: rgba(255, 255, 255, 0.18) 0px -1px 0px inset;"
        />
      </label>

      <label className="w-full relative">
        <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">
          Password <sup className=" text-pink-200">*</sup>
        </p>
        <input
          type={showPassword ? "text" : "password"}
          required
          // {...register("password")}
          value={formData.password}
          onChange={changehandler}
          placeholder="Enter Password"
          name="password"
          className=" bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px] "
        />
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className=" absolute right-3 top-[38px] cursor-pointer "
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={24} fill="#afb2bf" />
          ) : (
            <AiOutlineEye fontSize={24} fill="#afb2bf" />
          )}
        </span>

        <Link to="#">
          <p className=" text-xs text-blue-100 mt-1 ml-auto mr-0 w-full max-w-max">
            Forgot Password ?
          </p>
        </Link>
      </label>

      <button
        type="submit"
        className="bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6"
      >
        Sign In
      </button>
    </form>
  );
};

export default LoginForm;
