/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Upload from "./Upload";
import ChipInput from "./ChipInput";
import { useNavigate } from "react-router-dom";
import { sendPost } from "../../../../services/operations/postDetailsAPI";

const CreatePost = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("caption", data.postCaption);
    formData.append("tags", JSON.stringify(data.postTags));
    formData.append("postImageUrl", data.postImage);
    setLoading(true);
    const result = await sendPost(formData, token);
    if (result) {
      navigate("/user-posts");
    }
    setLoading(false);
  };

  return (
    <div className="mt-16 mobileS:mt-3 mobileM:mt-3 w-full h-full flex items-center justify-center">
      <div className="w-full h-full flex items-center justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-md border-secondary-500 flex mobileS:w-full flex-col items-center max-w-[800px] mobileM:max-w-[350px] mobileS:max-w-[300px]
           justify-center border-[3px] bg-secondary-100 my-10 p-8 mobileS:p-4 mobileM:p-4 mobileM:text-sm space-y-4 mobileS:text-sm"
        >
          <div className="flex mobileS:flex-col mobileM:flex-col mobileM:w-full mobileS:w-full gap-x-10">
            {/* Post  Image */}
            <Upload
              name="postImage"
              label="Post Image"
              register={register}
              setValue={setValue}
              errors={errors}
              required={true}
            />

            <div>
              {/* Course Short Description */}
              <div>
                <label
                  className="font-semibold w-fit mobileM:w-full mobileS:w-full group-focus-within:text-red group-focus-within:border-b-[2px] transition-colors duration-200 ease-linear"
                  htmlFor="postCaption"
                >
                  Post Caption
                </label>
                <textarea
                  id="postCaption"
                  placeholder="Enter Post Caption"
                  {...register("postCaption", { required: true })}
                  className="outline-none mt-2 border-[2px] min-h-[120px] mobileS:min-h-[90px] mobileM:min-h-[100px] border-slate-300 py-1 px-2 rounded-md  w-[100%] outline-b"
                />
              </div>

              {/* Post Tags */}
              <ChipInput
                label="Tags"
                name="postTags"
                placeholder="Enter Tags and press Enter"
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
              />
            </div>
          </div>

          {/* Send Post Button */}
          <div className="flex flex-row w-full gap-x-4">
            <button
              type="submit"
              className="bg-gradient-to-r w-full from-blue font-semibold to-red text-secondary-100 my-4 mobileS:my-2 py-2 transition-all duration-200 ease-linear 
            hover:text-secondary-900 rounded-lg text-lg mobileS:text-sm mobileM:my-2 mobileM:text-sm"
            >
              SEND
            </button>
            <button
              type="button"
              onClick={() => navigate("/home")}
              className="bg-gradient-to-r to-blue font-semibold from-red text-secondary-100 w-full my-4 mobileS:my-2 py-2 transition-all duration-200 ease-linear 
            hover:text-secondary-900 rounded-lg text-lg mobileS:text-sm mobileM:my-2 mobileM:text-sm"
            >
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
