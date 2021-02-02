export const formatToVND = (amount) => {
  const str = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 2
  }).format(amount)
  const currency = str.slice(-2);
  return str.slice(0, -5) + currency;
}

export const ddmmyy = (dateTime, separator = '/') => {
  const d = new Date(dateTime);
  return `${d.getDate()}${separator}${d.getMonth() + 1}${separator}${d.getFullYear()}`;
}