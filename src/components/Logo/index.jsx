import images from '../../constants/images';
import styles from './styles.module.css';

export const Logo = () => (
  <a href="#home" className={styles.logo}>
    <img src={images.khosmix} alt="Khosmix" width="150" height="50" />
  </a>
); 