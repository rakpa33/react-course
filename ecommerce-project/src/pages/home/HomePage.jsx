import axios from 'axios'
import { useEffect, useState } from 'react'
import { Header } from '../../components/Header'
import { ProductsGrid } from './ProductsGrid';
import './homePage.css';

export function HomePage({ cart }) {
  const [products, setProducts] = useState([]);

  // useEffect fetches data once when HomePage loads
  useEffect(() => {
    // fetches data from backend url using axios
    axios.get('/api/products').then((response) => {
      // waits for a response back from backend
      setProducts(response.data);
    })
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