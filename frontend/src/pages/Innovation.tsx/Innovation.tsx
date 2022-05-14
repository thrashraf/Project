import React, { useState } from 'react'
import Categories from '../../components/Categories'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import { Table } from '../../components/Table'
import useModal from '../../hooks/useModal'
import AddInnovation from './AddInnovation'


export const Innovation = (props:any) => {
  
  const { isShowing, toggle } = useModal();
  
  return (
      <>
      <Navbar/>

    
    <div>
    <Table isShowing={isShowing} toggle={toggle}/>
    </div>
    
    <AddInnovation isShowing={isShowing} toggle={toggle}/>
    
    <Footer/>
    </>
  )
}
