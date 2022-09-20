import { Link } from 'react-router-dom';

import styles from './Empty.module.scss';

import cartSvg from '../../assets/images/cart.svg';

const Empty = () => {
  return (
    <div className={styles.empty}>
      <div className={styles.empty__content}>
        <h1 className={styles.empty__title}>Корзина пустая 😕</h1>
        <p className={styles.empty__text}>
          Вероятней всего, вы не заказывали ещё пиццу. Для того, чтобы заказать
          пиццу, перейди на главную страницу.
        </p>
        <img className={styles.empty__img} src={cartSvg} alt="empty cart" />
        <Link to="/" className={styles.empty__button}>
          Вернуться назад
        </Link>
      </div>
    </div>
  );
};

export default Empty;
