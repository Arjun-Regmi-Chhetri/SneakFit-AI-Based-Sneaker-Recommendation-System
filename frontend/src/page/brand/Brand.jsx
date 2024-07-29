import React from 'react'
import ProductList from '../../components/Product/ProductList'
import { useParams } from 'react-router-dom'

const Brand = () => {
    const {brand} = useParams()
  return (
    <div>
      <ProductList brand={brand}/>
    </div>
  )
}

export default Brand
