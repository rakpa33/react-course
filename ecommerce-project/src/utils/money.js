export function functionMoney({amountCents}){
  return `$${(amountCents / 100).toFixed(2)}`
}