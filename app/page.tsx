'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap, Sine } from 'gsap'
import { Howl } from 'howler'
import { Button } from '../components/Button'

import './page.css'

export default function Page() {
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [leftSound, setLeftSound] = useState<Howl | null>(null);
  const [rightSound, setRightSound] = useState<Howl | null>(null);
  const [speed, setSpeed] = useState<number>(1);
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
        .to(light, speed, { left: '100%', ease: Sine.easeInOut })
        .call(function() { rightSound?.play() }, [], "-=0.145924")
        .to(light, speed, { left: '0%', ease: Sine.easeInOut })
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
  }, [isAnimating, leftSound, rightSound, speed]);


  return (
    <>
      <div className='flex flex-col flex-nowrap h-full'>
        <div className='container p-2'>
          <div className='flex flex-row content-center gap-8'>
            <Button onClick={toggleAnimation}>
              {isAnimating ? "Stop Animation" : "Start Animation"}
            </Button>
            <div className='inline-flex items-center gap-2'>
              <input
                type="range"
                min="0.45"
                max="2"
                step="0.05"
                value={speed}
                disabled={isAnimating}
                onChange={(event) => setSpeed(parseFloat(event.target.value))}
              />
            </div>
          </div>
        </div>
        <div className="relative flex-grow overflow-hidden">
          <div className="light" ref={lightRef} />
        </div>
      </div>
    </>
  )

}
