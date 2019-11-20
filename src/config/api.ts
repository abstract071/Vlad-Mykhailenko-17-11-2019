const ACCU_WEATHER_API_URL = 'https://dataservice.accuweather.com'

export const api = {
  autocomplete: `${ACCU_WEATHER_API_URL}/locations/v1/cities/autocomplete`,
  locationByKey: ( locationKey: string ) => `${ACCU_WEATHER_API_URL}/locations/v1/${locationKey}`,
  forecast5days: ( locationKey: string ) => `${ACCU_WEATHER_API_URL}/forecasts/v1/daily/5day/${locationKey}`,
  conditions: ( locationKey: string ) => `${ACCU_WEATHER_API_URL}/currentconditions/v1/${locationKey}`
}
