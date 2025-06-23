import React from 'react'
import HeroHome from '../componants/HeroHome'
import FeaturedSection from '../componants/FeaturedSection'
import ExclusiveOffers from '../componants/ExclusiveOffers'
import TestImonials from '../componants/Testimonials'
import NewSletter from '../componants/NewSletter'

const Home = () => {
  return (
    <div>
      <HeroHome />
      <FeaturedSection />
      <ExclusiveOffers />
      <TestImonials />
      <NewSletter />
      
    </div>
  )
}

export default Home
