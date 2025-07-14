import dayjs from 'dayjs'

export function DeliveryDate({ cartItem }) {
  console.log(cartItem.DeliveryDate);
  console.log(dayjs(cartItem.DeliveryDate).format('dddd, MMMM D'));
  return (
    <div className="delivery-date">
      {`Delivery date: ${dayjs(cartItem.DeliveryDate).format('dddd, MMMM D')}`}
    </div>
  );

}