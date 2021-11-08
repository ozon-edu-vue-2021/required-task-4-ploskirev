export function debounce(f, t) {
  let timer
  return function (args) {
    clearTimeout(timer)
    timer = setTimeout(() => f(args), t)
  }
}

export function checkDate(d) {
  const preparedDate = d.split('.').reverse().join('-')
  if (Date.parse(preparedDate) > Date.now()) return false
  const date = new Date(preparedDate)
  const result = d === date.toLocaleDateString()
  return result
}
