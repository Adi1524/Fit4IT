const CircularProgress = ({ progress, color = "blue", grams }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg className="w-24 h-24">
      {/* Background Circle */}
      <circle
        className="text-gray-300"
        stroke="currentColor"
        strokeWidth="4"
        fill="transparent"
        r={radius}
        cx="50"
        cy="50"
      />
      {/* Progress Circle */}
      <circle
        className="text-gray-300"
        stroke={color}
        strokeWidth="4"
        fill="transparent"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        r={radius}
        cx="50"
        cy="50"
        strokeLinecap="round"
        transform="rotate(-90 50 50)"
      />
      {/* Text */}
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        className="text-sm font-bold fill-black "
      >
        {grams}
      </text>
    </svg>
  );
};

export default CircularProgress;
