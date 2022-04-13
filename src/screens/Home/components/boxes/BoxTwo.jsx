
import styles from './boxOne.module.scss';

function BoxTwo() {
  function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( const w of new Array(length) ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  return (
    <div className={styles.body}>
      <div className={styles.bgHash}>
        <div className={styles.hash}>
          <p className={styles.noselect}>{makeid(580)}</p>
        </div>
      </div>
      <div className={styles.isCenter}>
            joe.bnb
      </div>

    </div>
  );
}

export default BoxTwo;
