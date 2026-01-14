import React from 'react'
import SplitText from "../components/ui/SplitText";
const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};
const SplitTextUse = () => {
  return (
    <div>
    <SplitText
  text="Achieving measurable impact with global client partners..."
  className="text-lg font-semibold text-start"
  delay={100}
  duration={0.6}
  ease="power3.out"
  splitType="chars"
  from={{ opacity: 0, y: 40 }}
  to={{ opacity: 1, y: 0 }}
  threshold={0.1}
  rootMargin="-100px"
  textAlign="start"
  onLetterAnimationComplete={handleAnimationComplete}
/>
    </div>
  )
}

export default SplitTextUse