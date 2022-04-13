import { useState, useEffect } from 'react';

import { useBeforeFirstRender } from 'hooks';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import * as favouritesActions from 'redux/actions/favouritesActions';
import * as favouritesSelectors from 'redux/selectors/favouritesSelector';

import BaseFavouriteContainer from './container';

const BaseFavouriteHeart = (props) => {
  const dispatch = useDispatch();

  const favourites = useSelector(state => favouritesSelectors.getFavourites(state));

  const saveFavouriteHandler = domain => dispatch(favouritesActions.saveFavourites(domain)),
    removeFavouriteHandler = domain => dispatch(favouritesActions.removeFavouriteItem(domain)),
    fetchFavourites = () => dispatch(favouritesActions.fetchFavourites());

  const [isFav, setIsFav] = useState(false);

  const handleFav = () => {
    const domain =  props.value;
    if (!isFav) {
      saveFavouriteHandler(domain);
    } else {
      removeFavouriteHandler(domain);
    }
    setIsFav(!isFav);
  };

  useBeforeFirstRender(() => {
    fetchFavourites();
  });

  useEffect(() => {
    if(favourites.data.length > 0) {
      const exists = favourites.data.find(e => e.domain === props.value);
      setIsFav(!!exists);
    }
  }, [favourites.data]);

  return(
    <BaseFavouriteContainer
      onClick={handleFav}
      isFav={isFav}
      width={props.width}
      height={props.height}
    />
  );
};

BaseFavouriteHeart.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number
};

BaseFavouriteHeart.defaultProps = {
  onClick: () => {},
  value: null,
  width: 30,
  height: 30
};

export default BaseFavouriteHeart;
