import {
  faBackward,
  faCaretLeft,
  faForward,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "./ProgressBar";

const MeditateCard = ({ tracks, id }) => {
  // const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  const audioRef = useRef(new Audio(`/meditate-${id}.mp3`));

  // useEffect(() => {
  //   audioRef.current.src = tracks[currentTrackIndex];
  //   if (isPlaying) audioRef.current.play();
  // }, [currentTrackIndex]);

  useEffect(() => {
    const updateProgress = () => {
      const duration = audioRef.current.duration;
      const currentTime = audioRef.current.currentTime;
      setProgress((currentTime / duration) * 100);
    };

    audioRef.current.addEventListener("timeupdate", updateProgress);
    return () => {
      // Cleanup: Stop and reset the audio when the component unmounts
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        audioRef.current.removeEventListener("timeupdate", updateProgress);
      }
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying((prev) => !prev);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((error) => console.error("Audio play failed:", error)); // 🔍 Debug error
    }
  };

  const seekForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime += 5;
    }
  };

  const seekBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(
        0,
        audioRef.current.currentTime - 5
      );
    }
  };

  return (
    <div className="flex flex-col items-center bg-cover bg-center bg-no-repeat justify-end  p-4 rounded-xl backdrop-blur-sm shadow-lg w-80 text-white">
      <div className=" absolute top-0 left-0 flex justify-start p-4">
        <FontAwesomeIcon
          icon={faCaretLeft}
          className=" text-white text-2xl cursor-pointer"
          onClick={() => {
            setIsPlaying(false);
            navigate("/meditation");
          }}
        />
      </div>
      <h2 className="text-lg font-bold mb-2">Now Playing</h2>
      <p className="text-sm mb-4">Track </p>
      <ProgressBar value={progress} />
      <div className="flex gap-4 mt-2">
        <button onClick={seekBackward} className="p-2 bg-gray-700 rounded-full">
          <FontAwesomeIcon icon={faBackward} />
        </button>
        <button
          onClick={togglePlayPause}
          className="p-2 bg-blue-500 rounded-full"
        >
          {isPlaying ? <Pause /> : <Play />}
        </button>
        <button onClick={seekForward} className="p-2 bg-gray-700 rounded-full">
          <FontAwesomeIcon icon={faForward} />
        </button>
      </div>
    </div>
  );
};

export default MeditateCard;
