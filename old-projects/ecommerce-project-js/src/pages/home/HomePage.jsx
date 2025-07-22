import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router';
import { Header } from '../../components/Header'
import { ProductsGrid } from './ProductsGrid';
import './homePage.css';

export function HomePage({ cart, loadCart }) {
  window.axios = axios; //allows me to reset the backend

  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const search = searchParams.get('search');

  // useEffect fetches data once when HomePage loads using async await
  useEffect(() => {
    const getHomeData = async () => {
      const urlPath = search ? `/api/products?search=${search}` : '/api/products'
      const response = await axios.get(urlPath);
      setProducts(response.data);
    };

    getHomeData();
  }, [search]);

  return (
    <>
      <title>Ecommerse Project</title>
      <link rel="icon" type="image/svg+xml" href="home-favicon.png" />

      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid products={products} loadCart={loadCart} />
      </div>
    </>
  );
}