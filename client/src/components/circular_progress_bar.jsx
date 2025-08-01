import React from "react";

const CircularProgressBar = ({ progress, size , stroke , color, number = "text-primary" }) => {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / number) * circumference;

  return (
    <div className="flex items-center justify-center">
      <svg width={size} height={size}>
        <circle
          className="text-gray-400"
          stroke="currentColor"
          strokeWidth={stroke}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className='bg-primary'
          stroke="red"
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className=" font-semibold text-4xl fill-current text-primary"
        >
          {`${progress/number*100}%`}
        </text>
      </svg>
    </div>
  );
};

export default CircularProgressBar;
