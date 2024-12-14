import { motion } from "motion/react"

interface EllipsePropsType {
  className: string
  initialX: number
}

function Ellipse({ className, initialX }: EllipsePropsType) {
  return (
    <motion.div
      className={`${className} absolute -z-[999] rounded-full bg-primary-500 blur-[150px]`}
      initial={{ opacity: 0, scale: 0, x: initialX }}
      animate={{ opacity: 0.5, scale: 1, x: 0, transition: { duration: 2, delay: 0.5 } }}
    />
  )
}

export default function StartBackground() {
  return (
    <>
      <Ellipse className="-right-32 -top-10 h-96 w-96" initialX={200} />
      <Ellipse className="bottom-10 left-0 h-72 w-72" initialX={-300} />
    </>
  )
}
