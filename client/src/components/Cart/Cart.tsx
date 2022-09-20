import { Link } from 'react-router-dom';

import styles from './Cart.module.scss';

import { ReactComponent as BackIcon } from '../../assets/icons/back_button_icon.svg';
import { ReactComponent as BasketIcon } from '../../assets/icons/basket.svg';
import { ReactComponent as TrashIcon } from '../../assets/icons/trash.svg';
import totalPrice from '../../helpers/totalPrice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { cleanCart, selectCartSize } from '../../slices/cartSlice';
import Bar from '../Bar';
import Empty from '../Empty';

const Cart = () => {
  const dispatch = useAppDispatch();
  const cartSize = useAppSelector(selectCartSize);
  const cart = useAppSelector((state) => state.cart);
  const bars = cart.map((bar) => <Bar bar={bar} key={bar.id} />);

  const content = (
    <div className={styles.cart} data-testid="cart">
      <header className={styles.cart__header}>
        <h2 className={styles.cart__title}>
          <BasketIcon className={styles['cart__title-icon']} />
          Корзина
        </h2>
        <button
          className={styles['cart__clean-button']}
          onClick={() => dispatch(cleanCart())}
        >
          <TrashIcon className={styles['cart__clean-icon']} />
          Очистить корзину
        </button>
      </header>
      <main className={styles.cart__main} role="list">
        {bars}
      </main>
      <footer className={styles.cart__footer}>
        <div className={styles['cart__footer-details']}>
          <span className={styles.cart__count}>
            Всего пицц: <b>{cartSize} шт.</b>
          </span>
          <span className={styles['cart__price-text']}>
            Сумма заказа:&nbsp;
            <span className={styles.cart__price} data-testid="cart-price">
              {totalPrice(cart)} ₽
            </span>
          </span>
        </div>
        <div className={styles.cart__buttons}>
          <Link to="/" className={styles['cart__back-button']}>
            <BackIcon className={styles['cart__back-icon']} />
            Вернуться назад
          </Link>
          <button className={styles['cart__pay-button']}>
            Оплатить сейчас
          </button>
        </div>
      </footer>
    </div>
  );

  const emptyContent = <Empty />;

  return cart.length ? content : emptyContent;
};

export default Cart;
