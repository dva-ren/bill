export const amountFormat = (amount: number) => {
  const absAmount = Math.abs(amount)
  const amountStr = absAmount.toFixed(2)
  const [int, decimal] = amountStr.split('.')
  const intArr = int.split('').reverse()
  const intArrFormatted = intArr.map((item, index) => {
    if (index % 3 === 0 && index !== 0)
      return `${item},`

    return item
  }).reverse().join('')
  return `${amount < 0 ? '-' : ''}${intArrFormatted}.${decimal}`
}
export const amountToArray = (amount: number) => {
  const absAmount = Math.abs(amount)
  const amountStr = absAmount.toFixed(2)
  return amountStr.split('.')
}
