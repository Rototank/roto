export function normalizeKePhone(input) {
  const digits = String(input || '').replace(/\D/g, '')
  if (digits.startsWith('254') && digits.length === 12) return digits
  if (digits.startsWith('0') && digits.length === 10) return `254${digits.slice(1)}`
  if (digits.length === 9 && (digits.startsWith('7') || digits.startsWith('1'))) {
    return `254${digits}`
  }
  return null
}

export function prettyPhone(msisdn) {
  if (!msisdn) return ''
  return `0${msisdn.slice(3, 6)} ${msisdn.slice(6, 9)} ${msisdn.slice(9)}`
}
