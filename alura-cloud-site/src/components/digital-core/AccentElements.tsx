"use client";
import { CENTER_X, CENTER_Y } from "./utils";

export default function AccentElements() {
  return (
    <g className="accent-elements">
      {/* Top Left Technical Data */}
      <g transform={`translate(${CENTER_X - 450}, ${CENTER_Y - 350})`}>
        <g opacity={0.6} style={{ fontFamily: "monospace", fontSize: "10px", fill: "var(--text-mute)", letterSpacing: "1px" }}>
          <text x="0" y="0" fill="#00DF81">[SYS.CORE]</text>
          <text x="0" y="15">INIT: 0x992B</text>
          <text x="0" y="30">STATUS: ONLINE</text>
          <path d="M 0, 40 L 40, 40" stroke="#17876D" strokeWidth="1" />
        </g>
      </g>

      {/* Top Right HUD block */}
      <g transform={`translate(${CENTER_X + 250}, ${CENTER_Y - 280})`}>
        <g opacity={0.7} style={{ fontFamily: "monospace", fontSize: "10px", fill: "var(--text-mute)", letterSpacing: "1px" }}>
          <rect x="0" y="0" width="4" height="4" fill="#00DF81" />
          <rect x="10" y="1.5" width="28" height="1" fill="#00DF81" opacity={0.5} />
          <rect x="42" y="0" width="4" height="4" fill="none" stroke="#00DF81" strokeWidth="1" />
          
          <rect x="0" y="12" width="4" height="4" fill="none" stroke="#2CC295" strokeWidth="1" />
          <rect x="10" y="13.5" width="40" height="1" fill="#2CC295" opacity={0.3} />
          
          <rect x="0" y="24" width="4" height="4" fill="#17876D" />
          <rect x="10" y="25.5" width="18" height="1" fill="#17876D" opacity={0.8} />
          
          {/* Detailed Coordinates Box */}
          <g transform="translate(60, 40)">
            <path d="M 0,0 L -10,0 L -10,20 L 0,20" fill="none" stroke="#17876D" strokeWidth="1" opacity={0.5} />
            <text x="5" y="6">-23.5505</text>
            <text x="5" y="18">-46.6333</text>
          </g>
        </g>
      </g>

      {/* Bottom Right Bracket UI */}
      <g transform={`translate(${CENTER_X + 350}, ${CENTER_Y + 150})`}>
        <path d="M 30,0 L 40,0 L 40,40 L 30,40" fill="none" stroke="#2CC295" strokeWidth="1" opacity={0.4} />
        <path d="M 10,0 L 0,0 L 0,40 L 10,40" fill="none" stroke="#2CC295" strokeWidth="1" opacity={0.4} />
        <text x="16" y="24" style={{ fontFamily: "monospace", fontSize: "10px", fill: "#00DF81" }}>04.</text>
      </g>

      {/* Bottom Left Sensor Node */}
      <g transform={`translate(${CENTER_X - 450}, ${CENTER_Y + 200})`}>
        <g opacity={0.5}>
          <circle cx="0" cy="0" r="2" fill="#17876D" />
          <circle cx="0" cy="0" r="10" fill="none" stroke="#17876D" strokeWidth="0.5" />
          <circle cx="0" cy="0" r="15" fill="none" stroke="#06302B" strokeWidth="0.5" strokeDasharray="2 4" />
          <line x1="15" y1="0" x2="60" y2="0" stroke="#17876D" strokeWidth="0.5" strokeDasharray="3 3" />
          <text x="65" y="3" style={{ fontFamily: "monospace", fontSize: "9px", fill: "var(--text-mute)" }}>FREQ_9.4GHz</text>
        </g>
      </g>

      {/* Crosshairs (+) scattered around to build technical grid feel */}
      <g stroke="#17876D" strokeWidth="1" opacity={0.4}>
        <path d="M 400,200 L 410,200 M 405,195 L 405,205" />
        <path d="M 800,250 L 810,250 M 805,245 L 805,255" />
        <path d="M 900,800 L 910,800 M 905,795 L 905,805" />
        <path d="M 300,750 L 310,750 M 305,745 L 305,755" />
      </g>
    </g>
  );
}
