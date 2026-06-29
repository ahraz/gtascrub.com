import { useRef, useEffect } from 'react'
import { useInView, animate } from 'framer-motion'

interface AnimatedCounterProps {
  value: number
  suffix?: string
  prefix?: string
  decimals?: number
}

export default function AnimatedCounter({ value, suffix = '', prefix = '', decimals = 0 }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const animated = useRef(false)

  useEffect(() => {
    if (inView && !animated.current) {
      animated.current = true
      animate(0, value, {
        duration: 1.5,
        ease: 'easeOut',
        onUpdate(val: number) {
          if (ref.current) {
            ref.current.textContent = prefix + val.toFixed(decimals) + suffix
          }
        },
      })
    }
  }, [inView, value, prefix, suffix, decimals])

  return <span ref={ref}>{prefix}0{suffix}</span>
}
