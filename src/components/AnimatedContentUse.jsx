import React from 'react'
import AnimatedContent from './ui/AnimatedContent'
import img from '../assets/homePage/HomePageWoman.svg'
const AnimatedContentUse = () => {
  return (
    <div style={{ overflow: 'hidden' }}>
      <AnimatedContent
      distance={50}
      delay={1}
      duration={1.5}
      >
      <div><img style={{borderRadius:'10px',width:'100%'}} src={img} alt="" /></div>
      </AnimatedContent>
    </div>
  )
}

export default AnimatedContentUse