import { DeliveryOptions } from './DeliveryOptions';
import { CartItemDetails } from './CartItemDetails';
import { DeliveryDate } from './DeliveryDate';

export function OrderSummary({ deliveryOptions, cart }) {
  console.log(cart.quantity);
  console.log(cart);
  return (
    <div className="order-summary">
      {cart.map((cartItem) => {

        return (
          <div key={cartItem.productId} className="cart-item-container">
            <DeliveryDate cartItem={cartItem} />

            <div className="cart-item-details-grid">
              <CartItemDetails cartItem={cartItem} />

              <DeliveryOptions deliveryOptions={deliveryOptions} cartItem={cartItem} />
            </div>
          </div>
        );
      })}
    </div>
  );
}