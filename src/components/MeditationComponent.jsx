import { useState } from "react";
import { useNavigate } from "react-router-dom";
import medi1 from "../assets/medi1.jpeg";
import medi2 from "../assets/medi2.avif";
import medi3 from "../assets/medi3.jpg";
import MeditateCard from "./MeditateCard";

const meditationTracks = [
  {
    id: 1,
    name: "Deep Breathing",
    src: "/audio/deep-breathing.mp3",
    img: medi1,
  },
  {
    id: 2,
    name: "Work Stress Reset",
    src: "/audio/work-stress.mp3",
    img: medi2,
  },
  {
    id: 3,
    name: "Sleep Preparation",
    src: "/audio/sleep-prep.mp3",
    img: medi3,
  },
];

export default function Meditation() {
  const [currentTrack, setCurrentTrack] = useState(null);
  const navigate = useNavigate();
  // const [isPlaying, setIsPlaying] = useState(false);
  // const audio = new Audio(currentTrack?.src);

  // const togglePlay = (track) => {
  //   if (currentTrack?.id === track.id && isPlaying) {
  //     audio.pause();
  //     setIsPlaying(false);
  //   } else {
  //     setCurrentTrack(track);
  //     setIsPlaying(true);
  //     audio.play();
  //   }
  // };

  const handleClick = () => {};

  return (
    <>
      <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
        <h2 className="text-xl font-bold">Meditation Tracks</h2>
        <div className="space-y-1">
          <MeditateCard />
          {meditationTracks.map((track) => (
            <div
              key={track.id}
              onClick={handleClick}
              className="flex items-center w-[20vw] justify-between p-3 border rounded-lg cursor-pointer hover:bg-gray-100"
            >
              <img className="relative " src={track.img}></img>
              <span className="absolute font-bold  ml-1 w-[10vw] rounded-md text-white  ">
                {track.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
