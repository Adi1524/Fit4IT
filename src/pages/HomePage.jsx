import { FaPeace } from "react-icons/fa";
import { GiGymBag } from "react-icons/gi";
import { MdOutlineFastfood } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import FooterButton from "../components/FooterButton";
import StatsGraph from "../components/StatsGraph";

export default function HomePage() {
  const navigate = useNavigate();

  const handleMeditate = () => {
    navigate("/meditation");
  };

  const handleFood = () => {
    navigate("/meal-plan");
  };
  return (
    <>
      <div className="main-container bg-slate-400 flex justify-center h-[100%]   ">
        <div className=" bg-[#f5f5f5]  sm:w-[25vw] w-full  ">
          <div className=" mb-5 p-4">
            <p className="text-sm text-gray-500 font-">
              EVERYDAY WE'RE MUSCLE'N
            </p>
            <h3 className="text-3xl font-bold">Hello, Aditya Kumar</h3>
          </div>

          <div className="mt-3 p-4">
            <h3 className="font-bold mb-2">My Plan</h3>

            {/* First Grid */}
            <div className="grid grid-cols-3 grid-rows-2 gap-3 mb-4">
              <button className="col-span-2 row-span-2 h-[6.5rem] bg-gradient-to-br from-blue-400 to-blue-600 hover:bg-[#CEA2FD] border rounded-lg shadow-xl p-5 text-left transition duration-300 ease-in-out">
                <GiGymBag className="border bg-white rounded-full text-4xl p-2 " />
                Workout
              </button>
              <button
                type="button"
                onClick={handleMeditate}
                className="row-span-2 col-span-1 bg-gradient-to-br from-orange-400 to-orange-600    border rounded-lg shadow-xl  p-5 text-left transition duration-300 ease-in-out"
              >
                <FaPeace className="border bg-white rounded-full text-4xl p-2  " />
                Meditate
              </button>
            </div>

            {/* Second Grid */}
            <div className="grid grid-cols-4 gap-x-2">
              <button
                type="button"
                onClick={handleFood}
                className="col-span-2 relative bg-gradient-to-br from-orange-400 to-orange-600  border rounded-lg shadow-xl  p-5 text-left transition duration-300 ease-in-out"
              >
                Food
                <MdOutlineFastfood className="border absolute top-4 right-5 bg-white rounded-full text-4xl p-2  " />
              </button>
              <button className="col-end-5 col-span-2 text-white bg-black  border rounded-lg border-black  p-5 text-center transition duration-300 ease-in-out">
                Let's Go
                <div class="w-[70%] h-1  ml-5 bg-[#80c904] "></div>
              </button>
            </div>
          </div>
          <section className="p-4 h-[42vh] ">
            <h3 className="p-2 font-semibold text-xl">Weekly Stats</h3>
            <StatsGraph />
          </section>

          <FooterButton />
        </div>
      </div>
    </>
  );
}
