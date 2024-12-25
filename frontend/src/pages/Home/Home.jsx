// import React from 'react'
import Banner from './Banner'
import News from './News'
import Recommened from './Recommened'
import TopSellers from './TopSellers'

const Home = () => {
  return (
    <>
        {/* Banner */}
        <Banner />

        {/* Top seller */}
        <TopSellers />

        {/* recommened */}
        <Recommened />

        {/* News */}
        <News />
    </>
  )
}

export default Home