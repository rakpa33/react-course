import axios from 'axios'
import { useEffect, useState } from 'react'
import { Header } from '../../components/Header'
import { ProductsGrid } from './ProductsGrid';
import './homePage.css';

export function HomePage({ cart }) {
  const [products, setProducts] = useState([]);

  // useEffect fetches data once when HomePage loads using async await
  useEffect(() => {
    const getHomeData = async () => {
      // fetches data from backend url using axios
      const response = await axios.get('/api/products');
      setProducts(response.data);
    };

    getHomeData();
  }, []);

  return (
    <>
      <title>Ecommerse Project</title>
      <link rel="icon" type="image/svg+xml" href="home-favicon.png" />

      <Header cart={cart} />

      <div className="home-page">
        <ProductsGrid products={products} />
      </div>
    </>
  );
}