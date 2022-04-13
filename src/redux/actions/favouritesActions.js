import * as constants from 'redux/constants/favourites';

export const removeFavouriteItem = payload => ({
  type: constants.REMOVE_FAVOURITES_BEGIN,
  payload
});

export const saveFavourites = payload => ({
  type: constants.SAVE_FAVOURITES_BEGIN,
  payload
});

export const fetchFavourites = payload => ({
  type: constants.GET_FAVOURITES_BEGIN,
  payload
});
