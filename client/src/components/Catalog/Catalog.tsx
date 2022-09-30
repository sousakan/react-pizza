import classNames from 'classnames';
import { useEffect, useMemo, useState } from 'react';

import styles from './Catalog.module.scss';

import config from '../../config';
import { selectSearchValue } from '../../features/catalog/selectors';
import { updateDisplayedListSize } from '../../features/catalog/slice';
import filterByCategory from '../../helpers/filterByCategory';
import filterBySearchValue from '../../helpers/filterBySearchValue';
import sortByNamePrice from '../../helpers/sortByNamePrice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import useDebounce from '../../hooks/useDebounce';
import Card from '../Card';
import SkeletonCard from '../SkeletonCard';

interface Props {
  className?: string;
}

const Catalog = ({ className }: Props) => {
  const dispatch = useAppDispatch();
  const catalog = useAppSelector((state) => state.catalog);
  const searchValue = useAppSelector(selectSearchValue);

  const debouncedSearchValue = useDebounce(searchValue, config.searchDelay);
  const [displayedListSize, setDisplayedListSize] = useState(
    catalog.list.length,
  );

  const style = classNames(styles.catalog, className);

  const content = useMemo(() => {
    const filteredList = filterByCategory(catalog.list, catalog.category);
    const sortedFilteredList = sortByNamePrice(
      filteredList,
      catalog.sortType,
      catalog.sortOrder,
    );
    const processedList = filterBySearchValue(
      sortedFilteredList,
      debouncedSearchValue,
    );

    let cards = processedList
      .map((card) => <Card card={card} key={card.id} />)
      .slice(
        catalog.pageNumber * config.maxElemOnPage,
        (catalog.pageNumber + 1) * config.maxElemOnPage,
      );

    setDisplayedListSize(processedList.length);

    if (catalog.list.length === 0)
      cards = new Array(8)
        .fill(0)
        .map((_, index) => <SkeletonCard key={index} />);

    return (
      <div className={style}>
        <h2 className={styles.catalog__title}>Все пиццы</h2>
        <div className={styles.catalog__grid} role="grid">
          {cards}
        </div>
      </div>
    );
  }, [debouncedSearchValue, catalog, style]);

  useEffect(() => {
    dispatch(updateDisplayedListSize(displayedListSize));
  }, [displayedListSize]);

  return content;
};

export default Catalog;
