import {useBeforeFirstRender} from 'hooks';
import {useDispatch, useSelector} from 'react-redux';
import * as favouritesActions from 'redux/actions/favouritesActions';
import * as favouritesSelectors from 'redux/selectors/favouritesSelector';

import FavouritesContainer from './container';

const FavouritesScreen = () => {
  const dispatch = useDispatch(),
    fetchFavourites = () => dispatch(favouritesActions.fetchFavourites());

  const favourites = useSelector(state => favouritesSelectors.getFavourites(state));

  useBeforeFirstRender(() => {
    fetchFavourites();
  });

  return (
    <FavouritesContainer favourites={favourites.data} />
  );
};

export default FavouritesScreen;
