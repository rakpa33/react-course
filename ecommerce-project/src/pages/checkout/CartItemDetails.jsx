import axios from 'axios';
import { formatMoney } from '../../utils/money'
import { useState } from 'react';

export function CartItemDetails({ cartItem, loadCart }) {
  const [showQuantityInput, setShowQuantityInput] = useState(false);
  const [quantity, setQuantity] = useState(cartItem.quantity);

  const toggleShowQuantityInput = async (quantity) => {
    if (showQuantityInput) {
      await axios.put(`api/cart-items/${cartItem.productId}`, { quantity: Number(quantity) });
      await loadCart();
      setShowQuantityInput(false);
    } else {
      setShowQuantityInput(true);
    }
  };

  const updateQuantityInput = (event) => {
    setQuantity(event.target.value);
    console.log(quantity);
  };

  const deleteCartItem = async () => {
    await axios.delete(`/api/cart-items/${cartItem.productId}`);
    await loadCart();
  };

  return (
    <>
      <img className="product-image"
        src={cartItem.product.image} />

      <div className="cart-item-details">
        <div className="product-name">
          {cartItem.product.name}
        </div>
        <div className="product-price">
          {formatMoney(cartItem.product.priceCents)}
        </div>
        <div className="product-quantity">
          <span>
            Quantity: {showQuantityInput ? <input className="update-quantity-input" type="text" defaultValue={quantity} onChange={updateQuantityInput} /> : <span className="quantity-label" value={quantity}>{cartItem.quantity}</span>
            }
          </span>
          <span className="update-quantity-link link-primary" onClick={() => { toggleShowQuantityInput(quantity) }}>
            Update
          </span>
          <span className="delete-quantity-link link-primary" onClick={deleteCartItem}>
            Delete
          </span>
        </div>
      </div >
    </>
  );
}