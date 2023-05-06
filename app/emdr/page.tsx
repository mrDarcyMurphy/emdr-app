'use client'

import { gsap, Sine } from 'gsap'
import { useLayoutEffect, useEffect, useRef, useState } from 'react'
import { Howl } from 'howler';

import './page.css'


export default function Page() {
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [leftSound, setLeftSound] = useState<Howl | null>(null);
  const [rightSound, setRightSound] = useState<Howl | null>(null);
  const lightRef = useRef<HTMLDivElement>(null);

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
    // if (isAnimating) {
    //   tl = gsap.timeline({
    //     repeat: -1,
    //     yoyo: true,
    //     onUpdate: () => {
    //       const lightPos = gsap.getProperty(light, "x");
    //       console.debug(`🔊 lightPos:`, typeof lightPos, lightPos)
    //       if (lightPos === 95) {
    //         rightSound?.play();
    //       } else if (lightPos === "0vw") {
    //         leftSound?.play();
    //       }
    //     },
    //   });
    //   tl.to(light, { x: "95vw", duration: 1, ease: "power2.inOut" });
    // }
    // if (isAnimating) {
    //   tl = gsap.timeline({
    //     repeat: -1,
    //     yoyo: true,
    //     onUpdate: () => {
    //       const lightPos = gsap.getProperty(light, "left");
    //       if (lightPos === 100) {
    //         rightSound?.play();
    //       } else if (lightPos === 0) {
    //         leftSound?.play();
    //       }
    //     },
    //   });
    //   tl.to(light, { left: "100%", duration: 1, ease: "power1.inOut" });
    // }
    if (isAnimating) {

      tl = gsap.timeline({repeat: -1});
      tl
        .to(light, 1, { left: '100%', ease: Sine.easeInOut })
        .call(function() { rightSound?.play() }, [], "-=0.145924")
        .to(light, 1, { left: '0%', ease: Sine.easeInOut })
        .call(function() { leftSound?.play() }, [], "-=0.145924")

    }

    return () => {
      if (tl) {
        tl.kill();
      }
    };
  }, [isAnimating, leftSound, rightSound]);


  return (
    <>
      <button onClick={toggleAnimation}>
        {isAnimating ? "Stop Animation" : "Start Animation"}
      </button>
      <div className="light-box">
        <div className="light" ref={lightRef} />
      </div>
    </>
  )

}
