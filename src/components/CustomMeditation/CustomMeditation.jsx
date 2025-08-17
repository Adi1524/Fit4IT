import {
  Heart,
  Leaf,
  Moon,
  Pause,
  Play,
  RotateCcw,
  Sun,
  Volume2,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const CustomMeditation = () => {
  const [selectedSession, setSelectedSession] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [selectedDuration, setSelectedDuration] = useState(10);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef(null);

  const meditationSessions = [
    {
      id: 1,
      title: "Morning Mindfulness",
      duration: "10-20 min",
      description: "Start your day with clarity and intention",
      icon: <Sun className="w-6 h-6" />,
      color: "from-amber-400 to-orange-500",
      category: "Morning",
      audio:
        "https://fit4it-meditation-audio.s3.eu-north-1.amazonaws.com/morningEnergy.mp3",
    },
    {
      id: 2,
      title: "Stress Relief",
      duration: "5-15 min",
      description: "Release tension and find calm",
      icon: <Leaf className="w-6 h-6" />,
      color: "from-green-400 to-emerald-500",
      category: "Stress",
      audio:
        "https://fit4it-meditation-audio.s3.eu-north-1.amazonaws.com/stressRelief.mp3",
    },
    {
      id: 3,
      title: "Deep Sleep",
      duration: "15-30 min",
      description: "Prepare your mind for restful sleep",
      icon: <Moon className="w-6 h-6" />,
      color: "from-purple-400 to-indigo-500",
      category: "Sleep",
      audio:
        "https://fit4it-meditation-audio.s3.eu-north-1.amazonaws.com/deepSleep.mp3",
    },
    {
      id: 4,
      title: "Focus & Concentration",
      duration: "10-25 min",
      description: "Enhance your mental clarity",
      icon: <Heart className="w-6 h-6" />,
      color: "from-pink-400 to-rose-500",
      category: "Focus",
      audio:
        "https://fit4it-meditation-audio.s3.eu-north-1.amazonaws.com/focusConcentration.mp3",
    },
  ];

  const durations = [5, 10, 15, 20, 25, 30];

  useEffect(() => {
    let interval = null;
    if (isPlaying && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && isPlaying) {
      setIsPlaying(false);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0; // reset audio
      }
    }
    return () => clearInterval(interval);
  }, [isPlaying, timeLeft]);

  const startTimer = (duration) => {
    setTimeLeft(duration * 60);
    setIsPlaying(true);
    if (selectedSession?.audio && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
      audioRef.current?.pause();
    } else {
      setIsPlaying(true);
      audioRef.current?.play();
    }
  };

  const resetTimer = () => {
    setIsPlaying(false);
    setTimeLeft(selectedDuration * 60);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const progress =
    selectedDuration > 0
      ? ((selectedDuration * 60 - timeLeft) / (selectedDuration * 60)) * 100
      : 0;
  return (
    <div className="min-h-screen overflow-y-auto  py-5 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-primary mb-1 ">
            Meditation & Mindfulness
          </h1>
          <p className="text-md text-gray-300 max-w-2xl mx-auto">
            Find your inner peace and enhance your mental well-being with our
            guided meditation sessions
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Meditation Sessions */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-bold text-slate-600 mb-2">
              Choose Your Practice
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {meditationSessions.map((session) => (
                <div
                  key={session.id}
                  onClick={() => setSelectedSession(session)}
                  className={`relative overflow-hidden rounded-2xl p-6 cursor-pointer transition-all duration-300 transform hover:scale-102 ${
                    selectedSession?.id === session.id
                      ? "ring-4 ring-primary shadow-xl"
                      : "hover:shadow-xl"
                  }`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${session.color} opacity-90`}
                  ></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 bg-white bg-opacity-20 rounded-full">
                        {session.icon}
                      </div>
                      <span className="text-sm font-medium text-white bg-black bg-opacity-30 px-3 py-1 rounded-full">
                        {session.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {session.title}
                    </h3>
                    <p className="text-white text-opacity-90 text-sm mb-3">
                      {session.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-white text-sm font-medium">
                        {session.duration}
                      </span>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-white rounded-full opacity-60"></div>
                        <div className="w-2 h-2 bg-white rounded-full opacity-80"></div>
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timer & Controls */}
          <div className="lg:col-span-1  ">
            <div className=" bg-slate-900 mt-8 backdrop-blur-lg rounded-2xl p-8 border border-white border-opacity-20">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">
                Meditation Timer
              </h3>

              {/* Duration Selection */}
              <div className="mb-8">
                <h4 className="text-white text-sm font-medium mb-3">
                  Duration (minutes)
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {durations.map((duration) => (
                    <button
                      key={duration}
                      onClick={() => {
                        setSelectedDuration(duration);
                        setTimeLeft(duration * 60);
                        setIsPlaying(false);
                      }}
                      className={`py-2 px-3 rounded-lg font-medium transition-all ${
                        selectedDuration === duration
                          ? "bg-primary text-white shadow-lg"
                          : "bg-white bg-opacity-10 text-white hover:bg-opacity-20"
                      }`}
                    >
                      {duration}
                    </button>
                  ))}
                </div>
              </div>

              {/* Timer Display */}
              <div className="relative mb-8">
                <div className="w-48 h-48 mx-auto relative">
                  <svg
                    className="w-full h-full transform -rotate-90"
                    viewBox="0 0 100 100"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      className="text-primary text-opacity-20"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      strokeDashoffset={`${
                        2 * Math.PI * 40 * (1 - progress / 100)
                      }`}
                      className="text-primary transition-all duration-1000 ease-linear"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">
                        {formatTime(timeLeft || selectedDuration * 60)}
                      </div>
                      <div className="text-sm text-gray-300 mt-1">
                        {selectedSession
                          ? selectedSession.title
                          : "Select a session"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {selectedSession?.audio && (
                <audio ref={audioRef} src={selectedSession.audio} loop />
              )}

              {/* Controls */}
              <div className="flex justify-center items-center space-x-4 mb-6">
                <button
                  onClick={resetTimer}
                  className="p-3 bg-white bg-opacity-10 hover:bg-opacity-20 text-white rounded-full transition-all"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>

                <button
                  onClick={() => {
                    if (timeLeft === 0 || timeLeft === selectedDuration * 60) {
                      startTimer(selectedDuration);
                    } else {
                      togglePlayPause();
                    }
                  }}
                  className="p-4 bg-primary text-white rounded-full transition-all transform hover:scale-110 shadow-lg"
                >
                  {isPlaying ? (
                    <Pause className="w-6 h-6" />
                  ) : (
                    <Play className="w-6 h-6" />
                  )}
                </button>

                <button
                  onClick={toggleMute}
                  className="p-3 bg-white bg-opacity-10 hover:bg-opacity-20 text-white rounded-full transition-all"
                >
                  {isMuted ? "🔇" : <Volume2 className="w-5 h-5" />}
                </button>
              </div>

              {/* Session Info */}
              {selectedSession && (
                <div className="bg-white bg-opacity-5 rounded-xl p-4 border border-white border-opacity-10">
                  <div className="flex items-center space-x-3 mb-2">
                    <div
                      className={`p-2 bg-gradient-to-r ${selectedSession.color} rounded-lg`}
                    >
                      {selectedSession.icon}
                    </div>
                    <div>
                      <h4 className="text-primary font-medium">
                        {selectedSession.title}
                      </h4>
                      <p className="text-gray-300 text-sm">
                        {selectedSession.description}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Stats Card */}
            {/* <div className="mt-6 shadow-lg bg-slate-900  rounded-2xl p-6 border border-white border-opacity-20">
              <h4 className="text-primary font-bold mb-4">Today's Practice</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 text-sm">
                    Sessions completed
                  </span>
                  <span className="text-primary font-medium">2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 text-sm">Time practiced</span>
                  <span className="text-primary font-medium">25 min</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300 text-sm">Current streak</span>
                  <span className="text-purple-400 font-medium">7 days</span>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomMeditation;
