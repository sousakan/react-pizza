import classNames from 'classnames';

import styles from './Tabs.module.scss';

import { setPage, updateCategory } from '../../features/catalog/slice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { PizzaCategories, pizzaCategoriesText } from '../../types/Pizza';

const tabs: PizzaCategories[] = [
  'all',
  'closed',
  'grill',
  'meat',
  'spicy',
  'vegetarian',
];

const Tabs = () => {
  const dispatch = useAppDispatch();
  const category = useAppSelector((state) => state.catalog.category);

  const defaultStyle = styles.tabs__item;
  const activeStyle = classNames(styles.tabs__item, styles.tabs__item_active);

  const content = tabs.map((tab) => (
    <div
      className={tab === category ? activeStyle : defaultStyle}
      onClick={() => {
        dispatch(updateCategory(tab));
        dispatch(setPage(0));
      }}
      key={tab}
      tabIndex={0}
      role="switch"
      aria-checked={tab === category}
      onKeyUp={(e) => {
        if (e.key === 'Enter') (e.target as HTMLElement).click();
      }}
    >
      {pizzaCategoriesText[tab]}
    </div>
  ));

  return <div className={styles.tabs}>{content}</div>;
};

export default Tabs;
