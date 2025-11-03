import React from 'react'
import HeroSlider from '../component/HeroSlider'
import LatestProduct from '../component/LatestProduct'
import CategorySection from '../component/Category'

const Home = () => {
  return (
    <div>
      <HeroSlider /> 
      <CategorySection />
      <LatestProduct />
    </div>
  )
}

export default Home
