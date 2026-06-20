import { useRef, useEffect } from 'react'
import { useInView, animate } from 'motion/react'

export default function AnimatedCounter({ value, suffix = '', prefix = '', decimals = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const animated = useRef(false)

  useEffect(() => {
    if (inView && !animated.current) {
      animated.current = true
      animate(0, value, {
        duration: 1.5,
        ease: 'easeOut',
        onUpdate(val) {
          if (ref.current) {
            ref.current.textContent = prefix + val.toFixed(decimals) + suffix
          }
        },
      })
    }
  }, [inView, value, prefix, suffix, decimals])

  return <span ref={ref}>{prefix}0{suffix}</span>
}
