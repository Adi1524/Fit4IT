import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import medi1 from "../assets/medi1.jpeg";
import medi2 from "../assets/medi2.avif";
import medi3 from "../assets/medi3.jpg";
import MeditateCard from "./MeditateCard";

const MeditationTrack = () => {
  const [backgroundImage, setBackgroundImage] = useState(medi1);
  const params = useParams();
  const imgMap = {
    1: medi1,
    2: medi2,
    3: medi3,
  };

  const { id } = params;
  const value = parseInt(id);

  useEffect(() => {
    const numericId = parseInt(id);
    if (!numericId || isNaN(numericId)) return;

    setBackgroundImage(imgMap[numericId] || medi1);
  }, []);

  return (
    <div className="main-container bg-slate-400 flex justify-center h-screen">
      <div
        style={{ backgroundImage: `url(${backgroundImage})` }}
        className="bg-black bg-cover bg-center bg-no-repeat  relative sm:w-[25vw] w-full flex flex-col h-full"
      >
        <div className="mt-8"></div>
        <div className=" w-full h-full flex justify-center p-1 mb-3 ">
          <MeditateCard
            tracks={["/noel.mp3", "/music/song2.mp3", "/music/song3.mp3"]}
            id={value ? value : 1}
            className="ml-9"
          />
        </div>
      </div>
    </div>
  );
};

export default MeditationTrack;
