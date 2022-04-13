import { ReactComponent as FavActive } from 'assets/svg/icon-fav-active.svg';
import { ReactComponent as FavInactive } from 'assets/svg/icon-fav-inactive.svg';

import styles from './style.module.scss';

const BaseFavouriteContainer = (props) => {
  return (
    <div className={styles.container}>
      {props.isFav ? <FavActive width={props.width} onClick={props.onClick}/>
        : <FavInactive width={props.height} onClick={props.onClick}/>}
    </div>
  );
};


export default BaseFavouriteContainer;
