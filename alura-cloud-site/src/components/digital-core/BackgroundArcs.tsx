"use client";
import { CENTER_X, CENTER_Y } from "./utils";

export default function BackgroundArcs() {
  return (
    <g className="background-arcs" fill="none">
      {/* Huge subtle orbital rings simulating deep infrastructure space */}
      <circle cx={CENTER_X - 100} cy={CENTER_Y + 100} r="500" stroke="#06302B" strokeWidth="1" opacity="0.4" />
      <circle cx={CENTER_X - 100} cy={CENTER_Y + 100} r="750" stroke="#06302B" strokeWidth="0.5" opacity="0.3" strokeDasharray="10 30" />
      <circle cx={CENTER_X - 100} cy={CENTER_Y + 100} r="1000" stroke="#17876D" strokeWidth="0.5" opacity="0.1" />
      
      {/* Off-axis Elliptical orbits to simulate 3D planetary rings */}
      <ellipse cx={CENTER_X} cy={CENTER_Y} rx="900" ry="450" stroke="#17876D" strokeWidth="0.5" opacity="0.2" strokeDasharray="4 12" transform={`rotate(-15 ${CENTER_X} ${CENTER_Y})`} />
      <ellipse cx={CENTER_X} cy={CENTER_Y - 200} rx="700" ry="250" stroke="#00DF81" strokeWidth="0.5" opacity="0.15" strokeDasharray="1 8" transform={`rotate(35 ${CENTER_X} ${CENTER_Y - 200})`} />
      
      {/* Radial depth lines pointing towards the center to increase perspective */}
      <g stroke="#06302B" strokeWidth="1" opacity="0.5">
        <line x1={CENTER_X - 600} y1={CENTER_Y - 500} x2={CENTER_X - 200} y2={CENTER_Y - 200} />
        <line x1={CENTER_X + 600} y1={CENTER_Y - 500} x2={CENTER_X + 200} y2={CENTER_Y - 200} strokeDasharray="5 5" />
        <line x1={CENTER_X - 500} y1={CENTER_Y + 400} x2={CENTER_X - 150} y2={CENTER_Y + 150} strokeOpacity="0.2" />
        <line x1={CENTER_X + 500} y1={CENTER_Y + 400} x2={CENTER_X + 150} y2={CENTER_Y + 150} />
      </g>
      
      {/* Background data particles / stars */}
      <g fill="#17876D" opacity="0.5">
        <circle cx={CENTER_X - 400} cy={CENTER_Y - 300} r="1.5" />
        <circle cx={CENTER_X - 350} cy={CENTER_Y - 280} r="2" />
        <circle cx={CENTER_X + 450} cy={CENTER_Y - 400} r="1.5" />
        <circle cx={CENTER_X + 350} cy={CENTER_Y + 250} r="2.5" fill="#00DF81" opacity="0.3" />
        <circle cx={CENTER_X - 450} cy={CENTER_Y + 200} r="1" />
      </g>
    </g>
  );
}
