import React from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductList from '../../components/Product/ProductList';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('keyword') || '';
  console.log(searchQuery)

  return (
    <div>
      <ProductList searchQuery={searchQuery} />
    </div>
  );
};

export default SearchPage;
