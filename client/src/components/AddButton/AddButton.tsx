import classNames from 'classnames';

import styles from './AddButton.module.scss';

import { ReactComponent as PlusIcon } from '../../assets/icons/plus.svg';
import { addToCart, incrementById } from '../../features/cart/asyncActions';
import { selectCartPizza } from '../../features/cart/selectors';
import { createCartPizza } from '../../features/cart/slice';
import getCartPizzaId from '../../helpers/getCartPizzaId';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { ICatalogPizza, PizzaSize, PizzaType } from '../../types/Pizza';

interface Props {
  pizza: ICatalogPizza;
  activeType: PizzaType;
  activeSize: PizzaSize;
}

const AddButton = ({ pizza, activeType, activeSize }: Props) => {
  const dispatch = useAppDispatch();
  const cartPizzaId = getCartPizzaId(pizza.name, activeType, activeSize);
  const cartPizza = useAppSelector((state) =>
    selectCartPizza(state, cartPizzaId),
  );

  const count = cartPizza ? cartPizza.count : 0;

  const onAdd = () =>
    dispatch(
      cartPizza
        ? incrementById(cartPizzaId)
        : addToCart(createCartPizza(pizza, activeType, activeSize)),
    );

  const option = { [styles['add-button_added']]: count !== 0 };
  const classes = classNames(styles['add-button'], option);

  return (
    <button className={classes} onClick={onAdd} data-testid="cart-add-button">
      <PlusIcon className={styles['add-button__icon']} />
      <span className={styles['add-button__text']}>Добавить</span>
      <span className={styles['add-button__count']}>{count}</span>
    </button>
  );
};

export default AddButton;
