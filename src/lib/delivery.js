import { COUNTIES, ZONES } from '../data/counties'

export function getCounty(name) {
  return COUNTIES.find((c) => c.name === name)
}

export function quoteDelivery({ county }) {
  const match = getCounty(county)
  if (!match) return null

  const zone = ZONES[match.zone]
  return {
    county: match.name,
    zone,
    fee: 0,
    free: true,
    eta: zone.eta,
  }
}
