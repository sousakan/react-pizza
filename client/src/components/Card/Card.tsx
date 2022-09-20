import { useState } from 'react';

import styles from './Card.module.scss';

import { getDefaultSize, getDefaultType } from '../../helpers/getDefault';
import {
  ICatalogPizza,
  PizzaSize,
  PizzaType,
  SizeInStockInfo,
  TypeInStockInfo,
} from '../../types/Pizza';
import AddButton from '../AddButton';
import Switch from '../Switch';

interface Props {
  card: ICatalogPizza;
}

function getTypesInfo(pizza: ICatalogPizza): TypeInStockInfo[] {
  const types: TypeInStockInfo[] = [];

  types.push({ name: 'thin', inStock: pizza.types.thin.inStock });
  types.push({ name: 'traditional', inStock: pizza.types.traditional.inStock });

  return types;
}

function getSizesInfo(pizza: ICatalogPizza): SizeInStockInfo[] {
  const sizes: SizeInStockInfo[] = [];

  sizes.push({ name: 'S', inStock: pizza.sizes.S.inStock });
  sizes.push({ name: 'M', inStock: pizza.sizes.M.inStock });
  sizes.push({ name: 'L', inStock: pizza.sizes.L.inStock });

  return sizes;
}

const Card = ({ card }: Props) => {
  const defaultType = getDefaultType(card);
  const defaultSize = getDefaultSize(card);

  const [activeType, setActiveType] = useState<PizzaType>(defaultType);
  const [activeSize, setActiveSize] = useState<PizzaSize>(defaultSize);

  const types = getTypesInfo(card);
  const sizes = getSizesInfo(card);

  return (
    <div className={styles.card} data-testid={card.id} role="gridcell">
      <img className={styles.card__img} src={card.imgUrl} alt="pizza img" />
      <h3 className={styles.card__name} tabIndex={0}>
        {card.name}
      </h3>
      <Switch
        className={styles.card__switch}
        activeSize={activeSize}
        activeType={activeType}
        setActiveType={setActiveType}
        setActiveSize={setActiveSize}
        types={types}
        sizes={sizes}
      />
      <div className={styles.card__footer}>
        <span className={styles.card__price} data-testid="card-price">
          {card.types[activeType].price + card.sizes[activeSize].price} ₽
        </span>
        <AddButton
          pizza={card}
          activeType={activeType}
          activeSize={activeSize}
        />
      </div>
    </div>
  );
};

export default Card;
