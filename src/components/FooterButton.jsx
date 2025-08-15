import { CgGym, CgProfile } from "react-icons/cg";
import { GiMeal } from "react-icons/gi";
import { MdHome } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const FooterButton = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed bottom-0 left-0 sm:left-auto sm:w-[25vw] w-full border rounded-t-2xl h-[8vh] flex justify-around px-4 py-3 bg-white z-10">
      <button type="button" onClick={() => navigate("/")}>
        <MdHome className="text-2xl" />
      </button>
      <button>
        <CgGym className="text-2xl" />
      </button>
      <button
        type="button"
        onClick={() => {
          navigate("/meal-plan");
        }}
      >
        <GiMeal className="text-2xl" />
      </button>
      <button>
        <CgProfile className="text-2xl" />
      </button>
    </div>
  );
};

export default FooterButton;
