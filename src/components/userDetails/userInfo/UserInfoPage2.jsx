import { Select } from "antd";
import { IoChevronBack } from "react-icons/io5";
import { useDispatch } from "react-redux";
import nonveg from "../../../assets/nonveg.jpg";
import vegetable from "../../../assets/vegetable.webp";
import { setUserDetails } from "../../../redux/slice/userDetailsSlice";

const UserInfoPage2 = ({
  handleChange,
  userDetails,
  setPageNo,
  validateFirstPage,
}) => {
  const dispatch = useDispatch();
  return (
    <div>
      {" "}
      <div className="rounded-3xl shadow-md  p-4  w-[40rem] h-[28rem]">
        <p className="text-lg font-thin text-black flex items-center gap-2">
          <button
            type="button"
            className="cursor-pointer"
            onClick={() => setPageNo(1)}
          >
            <IoChevronBack />
          </button>
          Meal Preferences
        </p>
        <div className="flex flex-col px-1 mt-4">
          <label className="font-thin text-sm ">Meal Preference</label>
          <div className="flex gap-2 mt-2">
            <button
              type="button"
              onClick={() =>
                dispatch(
                  setUserDetails({ ...userDetails, mealPreference: "veg" })
                )
              }
              style={{
                backgroundImage: `url(${vegetable})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className={`border w-1/2 font-bold text-lg text-white rounded-xl h-[8rem] flex items-center justify-center  ${
                userDetails.mealPreference === "veg"
                  ? "border-[#dfe068] border-8 "
                  : ""
              }`}
            >
              veg
            </button>
            <button
              type="button"
              onClick={() =>
                dispatch(
                  setUserDetails({
                    ...userDetails,
                    mealPreference: "nonveg",
                  })
                )
              }
              style={{
                backgroundImage: `url(${nonveg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className={`border w-1/2 font-bold text-lg text-white rounded-xl h-[8rem] flex items-center justify-center  ${
                userDetails.mealPreference === "nonveg"
                  ? "border-[#dfe068] border-8 "
                  : ""
              }`}
            >
              non-veg
            </button>
          </div>
        </div>

        <div className="flex flex-col px-1 mt-4">
          <label className="font-thin text-sm "> Activity Level </label>
          <div className="w-full ">
            <Select
              defaultValue="sedentary"
              style={{ width: "100%" }}
              value={userDetails.activityLevel}
              className="custom-select mt-2"
              onChange={(value) => handleChange("activityLevel", value)}
              options={[
                { value: "sedentary", label: "Sedentary" },
                { value: "lightly_active", label: "Lightly Active" },
                { value: "moderately_active", label: "Moderately Active" },
                { value: "very_active", label: "Very Active" },
                { value: "extra_active", label: "Extra Active" },
              ]}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={() => setPageNo(3)}
          className=" mt-8 w-full bg-[#dfe068]  text-white font-bold rounded-full py-2 "
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserInfoPage2;
