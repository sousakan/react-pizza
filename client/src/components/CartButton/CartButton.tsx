import { Link } from 'react-router-dom';

import styles from './CartButton.module.scss';

import { ReactComponent as BasketIcon } from '../../assets/icons/basket.svg';
import { selectCartPrice, selectCartSize } from '../../features/cart/selectors';
import { useAppSelector } from '../../hooks/redux';

const CartButton = () => {
  const cartPrice = useAppSelector(selectCartPrice);
  const cartSize = useAppSelector(selectCartSize);

  return (
    <Link to="/cart" className={styles['cart-button']}>
      <span>{cartPrice} ₽</span>
      <div className={styles['cart-button__line']} />
      <BasketIcon className={styles['cart-button__icon']} />
      <span>{cartSize || ''}</span>
    </Link>
  );
};

export default CartButton;
