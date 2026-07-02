export interface WorldwideTimeZone {
  name: string;
  country: string;
  value: string;
  aliases?: string[];
}

export const worldwideTimezones: WorldwideTimeZone[] = [
  // Middle East & Gulf
  { name: 'Riyadh', country: 'Saudi Arabia', value: 'Asia/Riyadh', aliases: ['saudia', 'saudi arabia', 'saudi', 'riyad'] },
  { name: 'Jeddah', country: 'Saudi Arabia', value: 'Asia/Riyadh', aliases: ['saudia', 'saudi arabia', 'saudi', 'jedah'] },
  { name: 'Dubai', country: 'United Arab Emirates', value: 'Asia/Dubai', aliases: ['uae', 'emirates', 'abu dhabi', 'dubay'] },
  { name: 'Doha', country: 'Qatar', value: 'Asia/Qatar', aliases: ['qatar'] },
  { name: 'Kuwait City', country: 'Kuwait', value: 'Asia/Kuwait', aliases: ['kuwait'] },
  { name: 'Muscat', country: 'Oman', value: 'Asia/Muscat', aliases: ['oman'] },
  { name: 'Manama', country: 'Bahrain', value: 'Asia/Bahrain', aliases: ['bahrain'] },
  { name: 'Jerusalem', country: 'Israel', value: 'Asia/Jerusalem', aliases: ['israel', 'tel aviv'] },
  { name: 'Amman', country: 'Jordan', value: 'Asia/Amman', aliases: ['jordan'] },
  { name: 'Beirut', country: 'Lebanon', value: 'Asia/Beirut', aliases: ['lebanon'] },
  { name: 'Damascus', country: 'Syria', value: 'Asia/Damascus', aliases: ['syria'] },
  { name: 'Baghdad', country: 'Iraq', value: 'Asia/Baghdad', aliases: ['iraq'] },
  { name: 'Tehran', country: 'Iran', value: 'Asia/Tehran', aliases: ['iran'] },

  // South Asia
  { name: 'Mumbai / New Delhi', country: 'India', value: 'Asia/Kolkata', aliases: ['india', 'bombay', 'calcutta', 'delhi', 'bangalore', 'kolkata'] },
  { name: 'Kolkata', country: 'India', value: 'Asia/Kolkata', aliases: ['india', 'calcutta'] },
  { name: 'Karachi', country: 'Pakistan', value: 'Asia/Karachi', aliases: ['pakistan', 'lahore', 'islamabad'] },
  { name: 'Dhaka', country: 'Bangladesh', value: 'Asia/Dhaka', aliases: ['bangladesh'] },
  { name: 'Colombo', country: 'Sri Lanka', value: 'Asia/Colombo', aliases: ['sri lanka', 'colombo'] },
  { name: 'Kathmandu', country: 'Nepal', value: 'Asia/Kathmandu', aliases: ['nepal'] },
  { name: 'Kabul', country: 'Afghanistan', value: 'Asia/Kabul', aliases: ['afghanistan'] },

  // East Asia
  { name: 'Tokyo', country: 'Japan', value: 'Asia/Tokyo', aliases: ['japan', 'kyoto', 'osaka'] },
  { name: 'Seoul', country: 'South Korea', value: 'Asia/Seoul', aliases: ['korea', 'south korea'] },
  { name: 'Shanghai', country: 'China', value: 'Asia/Shanghai', aliases: ['china', 'beijing', 'peking'] },
  { name: 'Hong Kong', country: 'Hong Kong (China)', value: 'Asia/Hong_Kong', aliases: ['hong kong', 'hk'] },
  { name: 'Taipei', country: 'Taiwan', value: 'Asia/Taipei', aliases: ['taiwan'] },
  { name: 'Ulaanbaatar', country: 'Mongolia', value: 'Asia/Ulaanbaatar', aliases: ['mongolia'] },

  // Southeast Asia
  { name: 'Singapore', country: 'Singapore', value: 'Asia/Singapore', aliases: ['singapore'] },
  { name: 'Kuala Lumpur', country: 'Malaysia', value: 'Asia/Kuala_Lumpur', aliases: ['malaysia', 'kl'] },
  { name: 'Bangkok', country: 'Thailand', value: 'Asia/Bangkok', aliases: ['thailand', 'phuket'] },
  { name: 'Jakarta', country: 'Indonesia', value: 'Asia/Jakarta', aliases: ['indonesia', 'bali', 'surabaya'] },
  { name: 'Ho Chi Minh City', country: 'Vietnam', value: 'Asia/Bangkok', aliases: ['vietnam', 'saigon', 'hanoi'] },
  { name: 'Manila', country: 'Philippines', value: 'Asia/Manila', aliases: ['philippines', 'manila'] },

  // Central Asia
  { name: 'Tashkent', country: 'Uzbekistan', value: 'Asia/Tashkent', aliases: ['uzbekistan'] },
  { name: 'Almaty', country: 'Kazakhstan', value: 'Asia/Almaty', aliases: ['kazakhstan'] },

  // Europe
  { name: 'London', country: 'United Kingdom', value: 'Europe/London', aliases: ['uk', 'gb', 'united kingdom', 'england', 'scotland', 'ireland'] },
  { name: 'Paris', country: 'France', value: 'Europe/Paris', aliases: ['france', 'french'] },
  { name: 'Berlin', country: 'Germany', value: 'Europe/Berlin', aliases: ['germany', 'deutschland', 'munich', 'frankfurt'] },
  { name: 'Rome', country: 'Italy', value: 'Europe/Rome', aliases: ['italy', 'rome', 'milan'] },
  { name: 'Madrid', country: 'Spain', value: 'Europe/Madrid', aliases: ['spain', 'barcelona'] },
  { name: 'Lisbon', country: 'Portugal', value: 'Europe/Lisbon', aliases: ['portugal'] },
  { name: 'Brussels', country: 'Belgium', value: 'Europe/Brussels', aliases: ['belgium'] },
  { name: 'Amsterdam', country: 'Netherlands', value: 'Europe/Amsterdam', aliases: ['holland', 'netherlands'] },
  { name: 'Zurich', country: 'Switzerland', value: 'Europe/Zurich', aliases: ['switzerland', 'geneva'] },
  { name: 'Vienna', country: 'Austria', value: 'Europe/Vienna', aliases: ['austria'] },
  { name: 'Athens', country: 'Greece', value: 'Europe/Athens', aliases: ['greece'] },
  { name: 'Moscow', country: 'Russia', value: 'Europe/Moscow', aliases: ['russia', 'moscow', 'st petersburg'] },
  { name: 'Kyiv', country: 'Ukraine', value: 'Europe/Kyiv', aliases: ['ukraine', 'kiev'] },
  { name: 'Warsaw', country: 'Poland', value: 'Europe/Warsaw', aliases: ['poland'] },
  { name: 'Prague', country: 'Czech Republic', value: 'Europe/Prague', aliases: ['czech'] },
  { name: 'Budapest', country: 'Hungary', value: 'Europe/Budapest', aliases: ['hungary'] },
  { name: 'Bucharest', country: 'Romania', value: 'Europe/Bucharest', aliases: ['romania'] },
  { name: 'Stockholm', country: 'Sweden', value: 'Europe/Stockholm', aliases: ['sweden'] },
  { name: 'Oslo', country: 'Norway', value: 'Europe/Oslo', aliases: ['norway'] },
  { name: 'Copenhagen', country: 'Denmark', value: 'Europe/Copenhagen', aliases: ['denmark'] },
  { name: 'Helsinki', country: 'Finland', value: 'Europe/Helsinki', aliases: ['finland'] },
  { name: 'Dublin', country: 'Ireland', value: 'Europe/Dublin', aliases: ['ireland'] },
  { name: 'Reykjavik', country: 'Iceland', value: 'Atlantic/Reykjavik', aliases: ['iceland'] },
  { name: 'Istanbul', country: 'Turkey', value: 'Europe/Istanbul', aliases: ['turkey', 'istanbul', 'ankara'] },

  // Americas (North)
  { name: 'New York', country: 'United States', value: 'America/New_York', aliases: ['us', 'usa', 'united states', 'east coast', 'ny'] },
  { name: 'Chicago', country: 'United States', value: 'America/Chicago', aliases: ['us', 'usa', 'united states', 'central', 'midwest'] },
  { name: 'Denver', country: 'United States', value: 'America/Denver', aliases: ['us', 'usa', 'united states', 'mountain'] },
  { name: 'Los Angeles', country: 'United States', value: 'America/Los_Angeles', aliases: ['us', 'usa', 'united states', 'west coast', 'california', 'la', 'pacific'] },
  { name: 'Phoenix', country: 'United States', value: 'America/Phoenix', aliases: ['us', 'usa', 'united states', 'arizona'] },
  { name: 'Anchorage', country: 'United States', value: 'America/Anchorage', aliases: ['us', 'usa', 'alaska'] },
  { name: 'Honolulu', country: 'United States', value: 'Pacific/Honolulu', aliases: ['us', 'usa', 'hawaii'] },
  { name: 'Toronto', country: 'Canada', value: 'America/Toronto', aliases: ['canada', 'ontario'] },
  { name: 'Vancouver', country: 'Canada', value: 'America/Vancouver', aliases: ['canada', 'bc', 'british columbia'] },
  { name: 'Montreal', country: 'Canada', value: 'America/Montreal', aliases: ['canada', 'quebec'] },
  { name: 'Calgary', country: 'Canada', value: 'America/Calgary', aliases: ['canada', 'alberta'] },
  { name: 'Winnipeg', country: 'Canada', value: 'America/Winnipeg', aliases: ['canada', 'manitoba'] },
  { name: 'Halifax', country: 'Canada', value: 'America/Halifax', aliases: ['canada', 'nova scotia'] },

  // Americas (Central & South)
  { name: 'Mexico City', country: 'Mexico', value: 'America/Mexico_City', aliases: ['mexico', 'cancun'] },
  { name: 'Bogota', country: 'Colombia', value: 'America/Bogota', aliases: ['colombia'] },
  { name: 'Lima', country: 'Peru', value: 'America/Lima', aliases: ['peru'] },
  { name: 'Santiago', country: 'Chile', value: 'America/Santiago', aliases: ['chile'] },
  { name: 'Sao Paulo', country: 'Brazil', value: 'America/Sao_Paulo', aliases: ['brazil', 'brasil', 'rio de janeiro'] },
  { name: 'Manaus', country: 'Brazil', value: 'America/Manaus', aliases: ['brazil', 'brasil', 'amazon'] },
  { name: 'Buenos Aires', country: 'Argentina', value: 'America/Buenos_Aires', aliases: ['argentina'] },
  { name: 'Caracas', country: 'Venezuela', value: 'America/Caracas', aliases: ['venezuela'] },
  { name: 'La Paz', country: 'Bolivia', value: 'America/La_Paz', aliases: ['bolivia'] },
  { name: 'Asuncion', country: 'Paraguay', value: 'America/Asuncion', aliases: ['paraguay'] },
  { name: 'Montevideo', country: 'Uruguay', value: 'America/Montevideo', aliases: ['uruguay'] },
  { name: 'Panama City', country: 'Panama', value: 'America/Panama', aliases: ['panama'] },
  { name: 'San Jose', country: 'Costa Rica', value: 'America/Costa_Rica', aliases: ['costa rica'] },
  { name: 'Havana', country: 'Cuba', value: 'America/Havana', aliases: ['cuba'] },
  { name: 'Kingston', country: 'Jamaica', value: 'America/Jamaica', aliases: ['jamaica'] },
  { name: 'Santo Domingo', country: 'Dominican Republic', value: 'America/Santo_Domingo', aliases: ['dominican republic'] },
  { name: 'San Juan', country: 'Puerto Rico', value: 'America/Puerto_Rico', aliases: ['puerto rico'] },
  { name: 'Nassau', country: 'Bahamas', value: 'America/Nassau', aliases: ['bahamas'] },
  { name: 'Quito', country: 'Ecuador', value: 'America/Quito', aliases: ['ecuador'] },

  // Africa
  { name: 'Cairo', country: 'Egypt', value: 'Africa/Cairo', aliases: ['egypt', 'cairo'] },
  { name: 'Johannesburg', country: 'South Africa', value: 'Africa/Johannesburg', aliases: ['south africa', 'cape town'] },
  { name: 'Nairobi', country: 'Kenya', value: 'Africa/Nairobi', aliases: ['kenya'] },
  { name: 'Lagos', country: 'Nigeria', value: 'Africa/Lagos', aliases: ['nigeria'] },
  { name: 'Casablanca', country: 'Morocco', value: 'Africa/Casablanca', aliases: ['morocco', 'rabat'] },
  { name: 'Algiers', country: 'Algeria', value: 'Africa/Algiers', aliases: ['algeria'] },
  { name: 'Tunis', country: 'Tunisia', value: 'Africa/Tunis', aliases: ['tunisia'] },
  { name: 'Tripoli', country: 'Libya', value: 'Africa/Tripoli', aliases: ['libya'] },
  { name: 'Addis Ababa', country: 'Ethiopia', value: 'Africa/Addis_Ababa', aliases: ['ethiopia'] },
  { name: 'Dar es Salaam', country: 'Tanzania', value: 'Africa/Dar_es_Salaam', aliases: ['tanzania'] },
  { name: 'Kampala', country: 'Uganda', value: 'Africa/Kampala', aliases: ['uganda'] },
  { name: 'Accra', country: 'Ghana', value: 'Africa/Accra', aliases: ['ghana'] },
  { name: 'Dakar', country: 'Senegal', value: 'Africa/Dakar', aliases: ['senegal'] },
  { name: 'Abidjan', country: 'Ivory Coast', value: 'Africa/Abidjan', aliases: ['ivory coast', 'cote d\'ivoire'] },
  { name: 'Luanda', country: 'Angola', value: 'Africa/Luanda', aliases: ['angola'] },
  { name: 'Khartoum', country: 'Sudan', value: 'Africa/Khartoum', aliases: ['sudan'] },
  { name: 'Harare', country: 'Zimbabwe', value: 'Africa/Harare', aliases: ['zimbabwe'] },
  { name: 'Lusaka', country: 'Zambia', value: 'Africa/Lusaka', aliases: ['zambia'] },
  { name: 'Douala', country: 'Cameroon', value: 'Africa/Douala', aliases: ['cameroon'] },
  { name: 'Antananarivo', country: 'Madagascar', value: 'Africa/Asmera', aliases: ['madagascar'] },

  // Oceania & Islands
  { name: 'Sydney', country: 'Australia', value: 'Australia/Sydney', aliases: ['australia', 'nsw'] },
  { name: 'Melbourne', country: 'Australia', value: 'Australia/Melbourne', aliases: ['australia', 'victoria'] },
  { name: 'Brisbane', country: 'Australia', value: 'Australia/Brisbane', aliases: ['australia', 'queensland'] },
  { name: 'Perth', country: 'Australia', value: 'Australia/Perth', aliases: ['australia', 'western australia'] },
  { name: 'Adelaide', country: 'Australia', value: 'Australia/Adelaide', aliases: ['australia', 'south australia'] },
  { name: 'Hobart', country: 'Australia', value: 'Australia/Hobart', aliases: ['australia', 'tasmania'] },
  { name: 'Darwin', country: 'Australia', value: 'Australia/Darwin', aliases: ['australia', 'northern territory'] },
  { name: 'Auckland', country: 'New Zealand', value: 'Pacific/Auckland', aliases: ['new zealand', 'nz', 'wellington'] },
  { name: 'Suva', country: 'Fiji', value: 'Pacific/Fiji', aliases: ['fiji'] },
  { name: 'Papeete', country: 'Tahiti', value: 'Pacific/Tahiti', aliases: ['tahiti', 'french polynesia'] },
  { name: 'Apia', country: 'Samoa', value: 'Pacific/Apia', aliases: ['samoa'] },
  { name: 'Port Louis', country: 'Mauritius', value: 'Indian/Mauritius', aliases: ['mauritius'] },
  { name: 'Male', country: 'Maldives', value: 'Indian/Maldives', aliases: ['maldives'] },
  { name: 'Victoria', country: 'Seychelles', value: 'Indian/Mahe', aliases: ['seychelles'] },
  { name: 'Hagatna', country: 'Guam', value: 'Pacific/Guam', aliases: ['guam'] },
  { name: 'Nuuk', country: 'Greenland', value: 'America/Nuuk', aliases: ['greenland'] }
];

// Fallback backdrop shown until a country's capital-city image has loaded (or if it fails to load).
export const DEFAULT_BG = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1920&auto=format&fit=crop';

// Core logic: every country resolves to ONE background — a photo of its capital city.
// Maps each `country` value used in `worldwideTimezones` to its capital's Wikipedia article
// title, which is used to fetch a real photo of that capital at runtime (see resolveCapitalBg).
export const countryCapitals: Record<string, string> = {
  'Saudi Arabia': 'Riyadh',
  'United Arab Emirates': 'Abu Dhabi',
  'Qatar': 'Doha',
  'Kuwait': 'Kuwait City',
  'Oman': 'Muscat',
  'Bahrain': 'Manama',
  'Israel': 'Jerusalem',
  'Jordan': 'Amman',
  'Lebanon': 'Beirut',
  'Syria': 'Damascus',
  'Iraq': 'Baghdad',
  'Iran': 'Tehran',
  'India': 'New Delhi',
  'Pakistan': 'Islamabad',
  'Bangladesh': 'Dhaka',
  'Sri Lanka': 'Colombo',
  'Nepal': 'Kathmandu',
  'Afghanistan': 'Kabul',
  'Japan': 'Tokyo',
  'South Korea': 'Seoul',
  'China': 'Beijing',
  'Hong Kong (China)': 'Hong Kong',
  'Taiwan': 'Taipei',
  'Mongolia': 'Ulaanbaatar',
  'Singapore': 'Singapore',
  'Malaysia': 'Kuala Lumpur',
  'Thailand': 'Bangkok',
  'Indonesia': 'Jakarta',
  'Vietnam': 'Hanoi',
  'Philippines': 'Manila',
  'Uzbekistan': 'Tashkent',
  'Kazakhstan': 'Astana',
  'United Kingdom': 'London',
  'France': 'Paris',
  'Germany': 'Berlin',
  'Italy': 'Rome',
  'Spain': 'Madrid',
  'Portugal': 'Lisbon',
  'Belgium': 'Brussels',
  'Netherlands': 'Amsterdam',
  'Switzerland': 'Bern',
  'Austria': 'Vienna',
  'Greece': 'Athens',
  'Russia': 'Moscow',
  'Ukraine': 'Kyiv',
  'Poland': 'Warsaw',
  'Czech Republic': 'Prague',
  'Hungary': 'Budapest',
  'Romania': 'Bucharest',
  'Sweden': 'Stockholm',
  'Norway': 'Oslo',
  'Denmark': 'Copenhagen',
  'Finland': 'Helsinki',
  'Ireland': 'Dublin',
  'Iceland': 'Reykjavik',
  'Turkey': 'Ankara',
  'United States': 'Washington, D.C.',
  'Canada': 'Ottawa',
  'Mexico': 'Mexico City',
  'Colombia': 'Bogotá',
  'Peru': 'Lima',
  'Chile': 'Santiago',
  'Brazil': 'Brasília',
  'Argentina': 'Buenos Aires',
  'Venezuela': 'Caracas',
  'Bolivia': 'La Paz',
  'Paraguay': 'Asunción',
  'Uruguay': 'Montevideo',
  'Panama': 'Panama City',
  'Costa Rica': 'San José, Costa Rica',
  'Cuba': 'Havana',
  'Jamaica': 'Kingston, Jamaica',
  'Dominican Republic': 'Santo Domingo',
  'Puerto Rico': 'San Juan, Puerto Rico',
  'Bahamas': 'Nassau, Bahamas',
  'Ecuador': 'Quito',
  'Egypt': 'Cairo',
  'South Africa': 'Pretoria',
  'Kenya': 'Nairobi',
  'Nigeria': 'Abuja',
  'Morocco': 'Rabat',
  'Algeria': 'Algiers',
  'Tunisia': 'Tunis',
  'Libya': 'Tripoli',
  'Ethiopia': 'Addis Ababa',
  'Tanzania': 'Dodoma',
  'Uganda': 'Kampala',
  'Ghana': 'Accra',
  'Senegal': 'Dakar',
  'Ivory Coast': 'Yamoussoukro',
  'Angola': 'Luanda',
  'Sudan': 'Khartoum',
  'Zimbabwe': 'Harare',
  'Zambia': 'Lusaka',
  'Cameroon': 'Yaoundé',
  'Madagascar': 'Antananarivo',
  'Australia': 'Canberra',
  'New Zealand': 'Wellington',
  'Fiji': 'Suva',
  'Tahiti': 'Papeete',
  'Samoa': 'Apia',
  'Mauritius': 'Port Louis',
  'Maldives': 'Malé',
  'Seychelles': 'Victoria, Seychelles',
  'Guam': 'Hagåtña, Guam',
  'Greenland': 'Nuuk',
};

// In-memory cache so each capital's photo is only ever fetched once per session.
const capitalBgCache = new Map<string, string>();

// Bumps a Wikimedia thumbnail URL up to a wallpaper-friendly width.
function upscaleThumbnail(url: string): string {
  return url.replace(/\/\d+px-/, '/1920px-');
}

// One core logic for every country: resolve its capital city, fetch a real photo of that
// capital from Wikipedia, and fall back to DEFAULT_BG if the capital is unknown or the
// fetch fails. Results are cached per capital for the lifetime of the session.
export async function resolveCapitalBg(country: string | undefined): Promise<string> {
  if (!country) return DEFAULT_BG;

  const capital = countryCapitals[country];
  if (!capital) return DEFAULT_BG;

  const cached = capitalBgCache.get(capital);
  if (cached) return cached;

  try {
    const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(capital)}`);
    if (!res.ok) return DEFAULT_BG;
    const data = await res.json();
    const source: string | undefined = data?.originalimage?.source || data?.thumbnail?.source;
    if (!source) return DEFAULT_BG;

    const bg = upscaleThumbnail(source);
    capitalBgCache.set(capital, bg);
    return bg;
  } catch {
    return DEFAULT_BG;
  }
}

