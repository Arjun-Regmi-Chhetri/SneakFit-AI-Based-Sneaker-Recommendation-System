import React from 'react'
import ProductList from '../../components/Product/ProductList'
import { useParams } from 'react-router-dom';

const CategoryPage = () => {

    const { category } = useParams();
  return (
    <>
       
       <ProductList category={category} />
    
    </>
  )
}

export default CategoryPage
