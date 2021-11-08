/**
 * Функция высшего порядка для debounce эффекта.
 * @param {Object} f - оборачиваемая функция
 * @param {Number} t - задержка в мс
 * @returns
 */
export function debounce(f, t) {
  let timer
  return function (args) {
    clearTimeout(timer)
    timer = setTimeout(() => f(args), t)
  }
}

/**
 * Метод для валидации даты. Проверяет дату на корректность. Дата не может быть позднее текущей
 * @param {String} d
 * @returns {Boolean}
 */
export function checkDate(d) {
  const preparedDate = d.split('.').reverse().join('-')
  if (Date.parse(preparedDate) > Date.now()) return false
  const date = new Date(preparedDate)
  const result = d === date.toLocaleDateString()
  return result
}
