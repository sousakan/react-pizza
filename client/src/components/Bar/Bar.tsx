import styles from './Bar.module.scss';

import { ReactComponent as IncrementIcon } from '../../assets/icons/add_counter.svg';
import removeIcon from '../../assets/icons/remove_bar_icon.svg';
import { ReactComponent as DecrementIcon } from '../../assets/icons/remove_counter.svg';
import { useAppDispatch } from '../../hooks/redux';
import {
  decrementById,
  incrementById,
  removeFromCart,
} from '../../slices/cartSlice';
import { ICartPizza, pizzaSizeText, pizzaTypeText } from '../../types/Pizza';
interface Props {
  bar: ICartPizza;
}

const Bar = ({ bar }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <div className={styles.bar} role="listitem">
      <img className={styles.bar__img} src={bar.imgUrl} alt="pizza" />
      <div className={styles.bar__details}>
        <h3 className={styles.bar__name} tabIndex={0}>
          {bar.name}
        </h3>
        <span className={styles.bar__info} tabIndex={0}>
          {pizzaTypeText[bar.typeInfo.name]}, {pizzaSizeText[bar.sizeInfo.name]}
        </span>
      </div>
      <div className={styles.bar__counters}>
        <button
          className={styles['bar__dec-counter']}
          disabled={bar.count === 1}
          onClick={() => dispatch(decrementById(bar.id))}
        >
          <DecrementIcon className={styles['bar__counter-icon']} />
        </button>
        <span className={styles['bar__counter-value']} tabIndex={0}>
          {bar.count}
        </span>
        <button
          className={styles['bar__inc-counter']}
          onClick={() => dispatch(incrementById(bar.id))}
        >
          <IncrementIcon className={styles['bar__counter-icon']} />
        </button>
      </div>
      <span className={styles.bar__price}>
        {(bar.sizeInfo.price + bar.typeInfo.price) * bar.count} ₽
      </span>
      <button
        className={styles['bar__remove-button']}
        onClick={() => dispatch(removeFromCart(bar.id))}
      >
        <img
          className={styles['bar__remove-icon']}
          src={removeIcon}
          alt="remove"
        />
      </button>
    </div>
  );
};

export default Bar;
