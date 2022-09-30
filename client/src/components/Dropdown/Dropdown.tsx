import classNames from 'classnames';

import styles from './Dropdown.module.scss';

import { changeOrder, updateType } from '../../features/catalog/slice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { SortType, sortTypeText } from '../../types/Pizza';

const sortTypes: SortType[] = ['alphabetical', 'price'];

const Dropdown = () => {
  const dispatch = useAppDispatch();
  const sortType = useAppSelector((state) => state.catalog.sortType);
  const sortOrder = useAppSelector((state) => state.catalog.sortOrder);

  const option = { [styles['dropdown_reverse']]: !sortOrder };
  const style = classNames(styles.dropdown, option);

  const onClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const ulElement = (event.currentTarget as HTMLElement).querySelector('ul');

    if (!ulElement!.contains(event.target as HTMLElement))
      dispatch(changeOrder());
  };

  const listItems = sortTypes.map((type) => {
    return (
      <li
        className={styles.dropdown__item}
        onClick={() => dispatch(updateType(type))}
        key={type}
        tabIndex={0}
        onKeyUp={(e) => {
          if (e.key === 'Enter') (e.target as HTMLElement).click();
        }}
      >
        {sortTypeText[type]}
      </li>
    );
  });

  return (
    <div
      className={style}
      onClick={onClick}
      tabIndex={0}
      role="switch"
      aria-checked="mixed"
      onKeyUp={(e) => {
        if (e.key === 'Enter') (e.target as HTMLElement).click();
      }}
    >
      <span className={styles.dropdown__text}>Сортировка: </span>
      <span className={styles.dropdown__category}>
        {sortTypeText[sortType]}
      </span>
      <ul className={styles.dropdown__list}>{listItems}</ul>
    </div>
  );
};

export default Dropdown;
