import dayjs from 'dayjs'

export function DeliveryDate({ cartItem }) {
  return (
    <div className="delivery-date">
      {`Delivery date: ${dayjs(cartItem.DeliveryDate).format('dddd, MMMM D')}`}
    </div>
  );

}