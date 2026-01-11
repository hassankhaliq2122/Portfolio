import React from 'react'
import Header from '../components/Header'
import TextAnimation from '../components/TextAnimation'
import BlurText from '../components/ui/BlurText'
import './Home.css'
const Home = () => {
  return (  
    <div className='home-container'>
        <Header/>
        <TextAnimation/>
        <h1 className="home-title"></h1>
        <BlurText/>
        <p className="home-description">Metatrybe delivers premium web design and high-end web development services for brands that want more than just a website — they want authority, conversions, and growth.</p>
        
    </div>
  )
}

export default Home