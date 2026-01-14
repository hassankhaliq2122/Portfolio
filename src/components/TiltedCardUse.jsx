import React from 'react'
import TiltedCard from './ui/TiltedCard'
import '../components/HomePageProjects.css'

const TiltedCardUse = ({ imageSrc }) => {
  return (
    <TiltedCard
      imageSrc={imageSrc || "https://placehold.co/500x350/1a1a1a/white?text=Project+Image"}
      altText="Project Preview"
      captionText="View Project"
      containerHeight="350px"
      containerWidth="500px"
      imageHeight="350px"
      imageWidth="500px"
      rotateAmplitude={12}
      scaleOnHover={1.05}
      showMobileWarning={false}
      showTooltip={false}
      displayOverlayContent={false}
    />
  )
}

export default TiltedCardUse