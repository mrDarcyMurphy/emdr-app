'use client'

import { gsap } from 'gsap'
import { useLayoutEffect, useRef } from 'react'

export default function Page() {
  const emdr = useRef()
  const circle = useRef()

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // gsap.
    })
  }, [])

  return (
    <div className="emdr" ref={emdr}>
      <div className="circle p-4 bg-blue max-w-xs border border-lime-600" ref={circle}>x</div>
    </div>
  )
}
