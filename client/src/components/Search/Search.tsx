import classNames from 'classnames';

import styles from './Search.module.scss';

import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  searchChanged,
  selectSearchValue,
  setPage,
} from '../../slices/catalogSlice';

interface Props {
  className?: string;
}

const Search = ({ className }: Props) => {
  const dispatch = useAppDispatch();
  const searchValue = useAppSelector(selectSearchValue);

  const style = classNames(styles.search, className);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPage(0));
    dispatch(searchChanged(e.target.value));
  };

  return (
    <div className={style}>
      <input
        className={styles.search__input}
        type="search"
        placeholder="Поиск пиццы..."
        onChange={onChange}
        value={searchValue}
        role="search"
      />
    </div>
  );
};

export default Search;
