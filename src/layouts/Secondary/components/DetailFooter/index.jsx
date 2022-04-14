import {ReactComponent as LogoSvgFooter} from 'assets/svg/logo-row-gray.svg';

import styles from './detailFooter.module.scss';

const DetailFooter = () => {

  const baseUrl = {
    telegram: 'https://t.me/canastaofficial',
    discord: 'https://discord.gg/X5HGFr5Cuf',
    twitter: 'https://twitter.com/CanastaDomains',
    docs: 'https://docs.canasta.domains',
    medium: 'https://blog.canasta.domains/',
    github: 'https://github.com/canastabns'
  };

  const clickToUrl = (type) => {
    window.open(
      baseUrl[type],
      '_blank' 
    );
  };
  return(
    <div className={styles.footer}>
      <div className={styles.icons}>
        <LogoSvgFooter width={150} height={100} />
      </div>

      <div className={styles.socials}>
        <div onClick={()=>clickToUrl('twitter')} className={styles.socials__network}>Twitter</div>
        <div onClick={()=>clickToUrl('medium')} className={styles.socials__network}>Medium</div>
        <div onClick={()=>clickToUrl('github')} className={styles.socials__network}>Github</div>
      </div>
    </div>
  );
};

export default DetailFooter;
