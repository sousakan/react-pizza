import classNames from 'classnames';

import styles from './Switch.module.scss';

import {
  PizzaSize,
  pizzaSizeText,
  PizzaType,
  pizzaTypeText,
  SizeInStockInfo,
  TypeInStockInfo,
} from '../../types/Pizza';

interface Props {
  className?: string;
  types: TypeInStockInfo[];
  sizes: SizeInStockInfo[];
  activeType: PizzaType;
  activeSize: PizzaSize;
  setActiveType: React.Dispatch<PizzaType>;
  setActiveSize: React.Dispatch<PizzaSize>;
}

const Switch = ({
  className,
  activeType,
  setActiveType,
  activeSize,
  setActiveSize,
  types,
  sizes,
}: Props) => {
  const switchStyle = classNames(styles.switch, className);
  const defStyle = styles.switch__cell;
  const activeStyle = classNames(styles.switch__cell, styles.active);

  const typeTabs = types.map((type) => {
    return (
      <button
        className={activeType === type.name ? activeStyle : defStyle}
        disabled={!type.inStock}
        onClick={() => setActiveType(type.name)}
        key={type.name}
        tabIndex={0}
        role="switch"
        aria-checked={activeType === type.name}
        onKeyUp={(e) => {
          if (e.key === 'Enter') (e.target as HTMLElement).click();
        }}
      >
        {pizzaTypeText[type.name]}
      </button>
    );
  });

  const sizeTabs = sizes.map((size) => {
    return (
      <button
        className={activeSize === size.name ? activeStyle : defStyle}
        disabled={!size.inStock}
        onClick={() => setActiveSize(size.name)}
        key={size.name}
        tabIndex={0}
        role="switch"
        aria-checked={activeSize === size.name}
        onKeyUp={(e) => {
          if (e.key === 'Enter') (e.target as HTMLElement).click();
        }}
      >
        {pizzaSizeText[size.name]}
      </button>
    );
  });

  return (
    <div className={switchStyle}>
      <div className={styles.switch__row}>{typeTabs}</div>
      <div className={styles.switch__row}>{sizeTabs}</div>
    </div>
  );
};

export default Switch;
