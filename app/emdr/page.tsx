'use client'

import { gsap, Sine } from 'gsap'
import { useEffect, useRef, useState } from 'react'
import { Howl } from 'howler';
import { Button } from '../../components/Button'

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
    if (isAnimating) {
      tl = gsap.timeline({repeat: -1});
      tl
        .to(light, 1, { left: '100%', ease: Sine.easeInOut })
        .call(function() { rightSound?.play() }, [], "-=0.145924")
        .to(light, 1, { left: '0%', ease: Sine.easeInOut })
        .call(function() { leftSound?.play() }, [], "-=0.145924")
    }

    if (!isAnimating) {
      gsap.to(light, 0, { left: 0 });
    }

    return () => {
      if (tl) {
        tl.kill();
      }
    };
  }, [isAnimating, leftSound, rightSound]);


  return (
    <>
    <div className='container p-2'>
      <Button onClick={toggleAnimation}>
        {isAnimating ? "Stop Animation" : "Start Animation"}
      </Button>
    </div>
      <div className="light-box">
        <div className="light" ref={lightRef} />
      </div>
    </>
  )

}
