import * as favoritesTypes from '../constants'


export function getLocationsConditions( payload: any ) {
  return {
    type: favoritesTypes.GET_LOCATIONS_CONDITIONS_TRIGGER,
    payload
  }
}
