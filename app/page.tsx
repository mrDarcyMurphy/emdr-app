"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, Sine } from "gsap";
import { Howl } from "howler";
import { Button } from "../components/Button";

import "./page.css";

export default function Page() {
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [leftSound, setLeftSound] = useState<Howl | null>(null);
  const [rightSound, setRightSound] = useState<Howl | null>(null);
  const [cyclesPerMinute, setCyclesPerMinute] = useState<number>(30);
  const lightRef = useRef<HTMLDivElement>(null);

  // Convert cycles per minute to speed (duration in seconds for one-way travel)
  const speed = 60 / (cyclesPerMinute * 2);

  const toggleAnimation = (): void => {
    setIsAnimating(!isAnimating);
    if (!isAnimating) {
      leftSound?.pause();
      rightSound?.pause();
    }
  };

  useEffect(() => {
    setLeftSound(new Howl({ src: ["om-left.wav"] }));
    setRightSound(new Howl({ src: ["om-right.wav"] }));
  }, []);

  useEffect(() => {
    const light = lightRef.current;

    let tl: gsap.core.Timeline | undefined;
    if (isAnimating) {
      tl = gsap.timeline({ repeat: -1 });
      tl
        .to(light, speed, { left: "100%", ease: Sine.easeInOut })
        .call(
          function () {
            rightSound?.play();
          },
          [],
          "-=0.145924",
        )
        .to(light, speed, { left: "0%", ease: Sine.easeInOut })
        .call(
          function () {
            leftSound?.play();
          },
          [],
          "-=0.145924",
        );
    }

    if (!isAnimating) {
      gsap.to(light, 0, { left: 0 });
    }

    return () => {
      if (tl) {
        tl.kill();
      }
    };
  }, [isAnimating, leftSound, rightSound, speed]);

  return (
    <>
      <div className="flex flex-col flex-nowrap h-full">
        <div className="container p-2">
          <div className="flex flex-row content-center gap-8">
            <Button onClick={toggleAnimation}>
              {isAnimating ? "Stop Animation" : "Start Animation"}
            </Button>
            <div className="inline-flex items-center gap-2">
              <input
                type="range"
                min="15"
                max="67"
                step="1"
                value={cyclesPerMinute}
                disabled={isAnimating}
                onChange={(event) =>
                  setCyclesPerMinute(parseInt(event.target.value))}
              />
              <input
                type="number"
                min="15"
                max="67"
                value={cyclesPerMinute}
                disabled={isAnimating}
                onChange={(event) => {
                  const value = parseInt(event.target.value);
                  if (!isNaN(value) && value >= 15 && value <= 67) {
                    setCyclesPerMinute(value);
                  }
                }}
                className="w-16 px-2 py-1 border border-gray-300 rounded text-center dark:border-gray-600 dark:bg-gray-700"
              />
              <span className="text-sm text-gray-600">cycles/min</span>
            </div>
          </div>
        </div>
        <div className="relative flex-grow overflow-hidden">
          <div className="light" ref={lightRef} />
        </div>
      </div>
    </>
  );
}
