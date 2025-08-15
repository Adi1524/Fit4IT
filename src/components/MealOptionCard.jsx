import { faC, faF, faP } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Modal, Tooltip } from "antd";
import { Check, TriangleAlert } from "lucide-react";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { markMealCompleted } from "../redux/slice/userDetailsSlice";

const MealOptionCard = ({
  setMealsCompleted,
  option,
  mealName,
  img,
  macros,
  recipe,
  ingredients,
  mealsCompleted,
  details = true,
}) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [detailSection, setDetailSection] = useState({
    BREAKFAST: true,
    LUNCH: true,
    DINNER: true,
    SNACKS: true,
  });

  const handleClick = () => {
    navigate("/recipe-description", { state: { mealName, img, recipe } });
  };

  const truncateText = (text, num) => {
    if (text.length > num) return text.slice(0, num) + "...";
    return text;
  };
  console.log("mealsComple", mealsCompleted?.[option]);

  const showModal = () => {
    if (mealsCompleted?.[option] === true) return;
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <section className="meal-plan mb-8 ">
        <div className=" flex justify-between border rounded-[4px] h-[4vh]  p-1 bg-[#D1E231]  mb-4">
          {" "}
          <p className=" text-xs ">{option} </p>
          {/* {recipe != null ? (
            <FontAwesomeIcon
              onClick={handleClick}
              className=" text-white text-xs cursor-pointer"
              icon={faUtensils}
            />
          ) : (
            <FontAwesomeIcon
              icon={faCircleInfo}
              className="text-white text-xs"
            />
          )} */}
          <div
            className="flex items-center
           justify-center bg-white  rounded-full"
          >
            <Check color="#D1E231" size={15} />
          </div>
        </div>
        <div className=" flex ">
          <div className=" h-[13vh] w-[6rem] overflow-hidden  border rounded-xl  ">
            <img
              className=" w-full h-full object-cover"
              src={img}
              alt="oats-image"
            />
          </div>
          <div className="mx-2 w-full">
            <button
              className="w-full"
              type="button"
              onClick={() =>
                setDetailSection({
                  ...detailSection,
                  [option]: !detailSection[option],
                })
              }
            >
              <div className="flex items-center justify-between w-full">
                <p className="text-sm p-1 text-left  ">
                  <Tooltip title={mealName.length > 40 ? `${mealName}` : null}>
                    {truncateText(mealName, 40)}
                  </Tooltip>
                </p>
                {details && (
                  <IoIosArrowDown
                    className={`${
                      detailSection[option] === true ? "rotate-180" : ""
                    }`}
                    size={10}
                  />
                )}
              </div>
            </button>
            <hr className="border-t-2 border-[#dcdcdb] my-1  " />
            <div className="flex justify-between px-[5rem] mt-4 items-center text-xs text-[#8e908d]">
              <div className="items-center flex gap-2">
                <FontAwesomeIcon icon={faC} />
                <span className="mr-4">{Math.round(macros.carbs)}g</span>
              </div>
              <div className="items-center flex gap-2">
                <FontAwesomeIcon icon={faP} />
                <span className="mr-4">{Math.round(macros.protein)}g</span>
              </div>
              <div className="items-center flex gap-2">
                {" "}
                <FontAwesomeIcon icon={faF} />
                <span>{Math.round(macros.fats)}g</span>
              </div>
            </div>
          </div>
        </div>
        {details && detailSection[option] && (
          <div className="mt-2 p-2 bg-gray-50">
            {console.log("ingredientsssss", ingredients)}
            <p className=" font-semibold my-2"> {mealName}</p>

            <div className="flex justify-between mb-1 text-md font-semibold">
              <p className="text-sm capitalize">Item</p>
              <p className="text-sm">Quantity(in grams)</p>
            </div>
            {ingredients &&
              ingredients.map((ingredient, index) => {
                return (
                  <div key={index}>
                    <div className="flex justify-between">
                      <p className="text-sm capitalize">
                        {ingredient?.ingredient}
                      </p>
                      <p className="text-sm ">{ingredient?.quantity}g</p>
                    </div>
                  </div>
                );
              })}
          </div>
        )}

        {details && (
          <div className="flex justify-end">
            <button
              type="button"
              onClick={showModal}
              className="bg-[#D1E231] text-white px-2 rounded-md font-semibold mt-4"
            >
              Mark as completed
            </button>
          </div>
        )}
      </section>

      <Modal
        open={isModalOpen}
        footer={null}
        closable={false}
        onCancel={handleCancel}
        title={null}
        className="custom-modal"
        centered
        maskClosable={false}
      >
        <div>
          <div className="flex items-center justify-center ">
            <div className="bg-yellow-300 rounded-full p-4 my-4 flex items-center justify-center">
              <TriangleAlert color="white" size={40} />
            </div>
          </div>
          <p className=" px-4 text-center text-lg">
            bud? Be honest! You can mark it as completed once you're done—no
            rush!
          </p>
          <p className="text-center font-semibold">
            This action cannot be undone.
          </p>
          <div className="flex px-4 items-center gap-2 pb-4 justify-end mt-4">
            <button
              onClick={() => setIsModalOpen(false)}
              type=" button"
              className="bg-[#DCDCDC] text-white px-2 py-2 rounded-md font-semibold"
            >
              cancel
            </button>
            <button
              type="button"
              onClick={() => {
                dispatch(markMealCompleted(option));
                setIsModalOpen(false);
                setDetailSection({
                  ...detailSection,
                  [option]: false,
                });
              }}
              className="bg-[#D1E231] text-white px-2 py-2 rounded-md font-semibold"
            >
              completed
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MealOptionCard;
