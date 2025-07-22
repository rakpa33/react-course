import { Header } from '../components/Header'
import './NotFoundPage.css'

export function NotFoundPage({ cart }) {
  return (
    <>
      <Header cart={cart} />
      <div className="not-found-content">
        <h1>Page not found</h1>
      </div>

    </>
  );
}