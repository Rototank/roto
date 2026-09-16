export const ZONES = {
  nairobi: {
    id: 'nairobi',
    name: 'Nairobi',
    eta: 'Same day or next day',
  },
  metro: {
    id: 'metro',
    name: 'Nairobi metro',
    eta: '1–2 days',
  },
  central: {
    id: 'central',
    name: 'Central Kenya',
    eta: '2–3 days',
  },
  rift: {
    id: 'rift',
    name: 'Rift Valley',
    eta: '3–4 days',
  },
  western: {
    id: 'western',
    name: 'Western & Nyanza',
    eta: '3–5 days',
  },
  coast: {
    id: 'coast',
    name: 'Coast',
    eta: '4–6 days',
  },
  eastern: {
    id: 'eastern',
    name: 'Eastern Kenya',
    eta: '3–5 days',
  },
  north: {
    id: 'north',
    name: 'Northern Kenya',
    eta: '5–7 days',
  },
}

const zoneMap = {
  Nairobi: 'nairobi',
  Kiambu: 'metro',
  Machakos: 'metro',
  Kajiado: 'metro',
  "Murang'a": 'central',
  Nyeri: 'central',
  Kirinyaga: 'central',
  Nyandarua: 'central',
  Embu: 'central',
  'Tharaka-Nithi': 'central',
  Meru: 'central',
  Nakuru: 'rift',
  Baringo: 'rift',
  Laikipia: 'rift',
  Narok: 'rift',
  Kericho: 'rift',
  Bomet: 'rift',
  Nandi: 'rift',
  'Uasin Gishu': 'rift',
  'Elgeyo-Marakwet': 'rift',
  'Trans Nzoia': 'rift',
  Kakamega: 'western',
  Bungoma: 'western',
  Busia: 'western',
  Vihiga: 'western',
  Kisumu: 'western',
  Siaya: 'western',
  'Homa Bay': 'western',
  Migori: 'western',
  Kisii: 'western',
  Nyamira: 'western',
  Mombasa: 'coast',
  Kwale: 'coast',
  Kilifi: 'coast',
  'Taita-Taveta': 'coast',
  'Tana River': 'coast',
  Lamu: 'coast',
  Makueni: 'eastern',
  Kitui: 'eastern',
  Garissa: 'north',
  Wajir: 'north',
  Mandera: 'north',
  Marsabit: 'north',
  Isiolo: 'north',
  Samburu: 'north',
  Turkana: 'north',
  'West Pokot': 'north',
}

export const COUNTIES = Object.keys(zoneMap)
  .map((name) => ({ name, zone: zoneMap[name] }))
  .sort((a, b) => a.name.localeCompare(b.name))

export const WHATSAPP_NUMBER = '254105419421'
export const SHOP_PHONE = '+254 105 419 421'
