'use client'

import { useState, useEffect } from "react";
import "./page.css";

export default function Page() {
  const [position, setPosition] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (position >= 90) {
        setDirection(-1);
      } else if (position <= -90) {
        setDirection(1);
      }
      setPosition(position + direction);
    }, 10);
    return () => clearInterval(intervalId);
  }, [position, direction]);

  return (
    <div className="emdr">
      <div
        className="light"
        style={{ transform: `translateX(${position}vw)` }}
      />
    </div>
  );
}
