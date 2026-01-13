import React from 'react'
import Header from '../components/Header'
import TextAnimation from '../components/TextAnimation'
import BlurText from '../components/ui/BlurText'
import ArrowButton from '../components/ArrowButton'
import BlueBorderButton from '../components/BlueBorderButton'
import AnimatedContentUse from '../components/AnimatedContentUse'
import './Home.css'

const Home = () => {
  return (  
<>

    <div className='home-container'>
        <Header/>
        <TextAnimation/>
        <h1 className="home-title"></h1>
        <BlurText/>
        <BlurText
          text="Metatrybe delivers premium   design and highend web development services for brands that want more than just a website — they want authority, conversions and growth."
          className="home-description"
          animateBy="letters"
          direction='bottom'
          delay={7}
        />
        <div className='home-buttons'>
        <ArrowButton
        text="Start Your Project"
    className="start-project-btn arrow-btn"
        />
        <BlueBorderButton 
        className="blue-border-btn"
        text="Explore Our Work"/>
        
        </div>
       <AnimatedContentUse/>
    </div>


    </>
  )
}

export default Home