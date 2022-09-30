import classNames from 'classnames';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

import config from '../../config';

import { selectPageNumber } from '../../features/catalog/selectors';
import { setPage } from '../../features/catalog/slice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

interface Props {
  className?: string;
}

const Pagination = ({ className }: Props) => {
  const dispatch = useAppDispatch();
  const listSize = useAppSelector((state) => state.catalog.displayedListSize);
  const pageNumber = useAppSelector(selectPageNumber);

  const style = classNames(styles.pagination, className);

  const pageCount = Math.ceil(listSize / config.maxElemOnPage);

  const handlePageClick = ({ selected }: { selected: number }) => {
    dispatch(setPage(selected));

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const content = (
    <ReactPaginate
      nextLabel=">"
      onPageChange={handlePageClick}
      pageCount={pageCount}
      previousLabel="<"
      containerClassName={styles.pagination__list}
      pageLinkClassName={styles.pagination__page}
      previousLinkClassName={styles.pagination__prev}
      nextLinkClassName={styles.pagination__next}
      activeLinkClassName={styles.pagination__active}
      disabledLinkClassName={styles.pagination__disabled}
      forcePage={pageNumber}
    />
  );

  return <div className={style}>{listSize !== 0 && content}</div>;
};

export default Pagination;
