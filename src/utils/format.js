export const formatToVND = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 2
  }).format(amount)
}

export const ddmmyy = (dateTime, separator = '/') => {
  const d = new Date(dateTime);
  return `${d.getDate()}${separator}${d.getMonth() + 1}${separator}${d.getFullYear()}`;
}