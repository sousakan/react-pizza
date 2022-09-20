import { Link } from 'react-router-dom';

import styles from './Intro.module.scss';

import PizzaIcon from '../../assets/images/pizza.png';

const Intro = () => {
  return (
    <Link to="/" style={{ textDecoration: 'none' }}>
      <div className={styles.intro}>
        <img className={styles.intro__icon} src={PizzaIcon} alt="logo" />
        <div className={styles.intro__content}>
          <h3 className={styles.intro__title}>REACT PIZZA</h3>
          <p className={styles.intro__text}>самая вкусная пицца во вселенной</p>
        </div>
      </div>
    </Link>
  );
};

export default Intro;
