import React from 'react'
import { Navbar } from '../../components/Navbar'
import  Slider  from '../../components/Slider'
import { Body }  from './Body'
import  { Footer }  from '../../components/Footer'

type Props = {}

export const Home = (props: Props) => {
  return (
    <>
    <Navbar/>
    <Slider/>
    <Body/>
    <Footer/>

    
    </>
    
  )
}

