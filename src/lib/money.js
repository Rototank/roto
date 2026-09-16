export function kes(value) {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    maximumFractionDigits: 0,
  }).format(value)
}

export function litresLabel(n) {
  return `${n.toLocaleString('en-KE')}L`
}
