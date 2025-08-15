import { useNavigate } from "react-router-dom";
import medi1 from "../assets/medi1.jpeg";
import medi2 from "../assets/medi2.avif";
import medi3 from "../assets/medi3.jpg";
import FooterButton from "../components/FooterButton";

const MeditationPage = () => {
  const navigate = useNavigate();

  function handleClick(num) {
    navigate(`/meditation-detail/${num}`);
  }

  return (
    <div className=" flex">
      <div className="bg-white relative  w-full flex flex-col h-full">
        <button
          onClick={(e) => handleClick(1)}
          className="bg-[#CAE00D]   h-[30vh] mx-3 rounded-md shadow-md cursor-pointer mb-2"
        >
          <div
            className="bg-black bg-cover bg-center my-3 mx-3 border rounded-md h-[20vh] p-4"
            style={{ backgroundImage: `url(${medi1})` }}
          ></div>
          <p className="text-center font-bold text-white">stress buster</p>
        </button>

        <button
          onClick={(e) => handleClick(2)}
          className="bg-gradient-to-br from-orange-400 to-orange-600  h-[30vh] mx-3 rounded-md shadow-md cursor-pointer mb-2"
        >
          <div
            className="bg-black bg-cover bg-center my-3 mx-3 border rounded-md h-[20vh] p-4"
            style={{ backgroundImage: `url(${medi2})` }}
          ></div>
          <p className="text-center font-bold text-white">stress buster</p>
        </button>

        <button
          onClick={(e) => handleClick(3)}
          className="bg-[#CAE00D] h-[30vh] mx-3 rounded-md shadow-md cursor-pointer mb-2"
        >
          <div
            className="bg-black bg-cover bg-center my-3 mx-3 border rounded-md h-[20vh] p-4"
            style={{ backgroundImage: `url(${medi3})` }}
          ></div>
          <p className="text-center font-bold text-white">stress buster</p>
        </button>

        <button
          onClick={(e) => handleClick(4)}
          className="bg-gradient-to-br from-orange-400 to-orange-600  h-[30vh] mx-3 rounded-md shadow-md cursor-pointer mb-2"
        >
          <div
            className="bg-black bg-cover bg-center my-3 mx-3 border rounded-md h-[20vh] p-4"
            style={{ backgroundImage: `url(${medi1})` }}
          ></div>
          <p className="text-center font-bold text-white">stress buster</p>
        </button>

        <div className="mt-8">asdf</div>

        {/* Sticky navigation bar */}
        <FooterButton />
      </div>
    </div>
  );
};

export default MeditationPage;
