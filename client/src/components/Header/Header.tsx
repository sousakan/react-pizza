import classNames from 'classnames';

import styles from './Header.module.scss';

import CartButton from '../CartButton';
import Intro from '../Intro';
import Search from '../Search';

interface Props {
  className?: string;
  hasSearch?: boolean;
}

const Header = ({ className, hasSearch }: Props) => {
  const classes = classNames(styles.header, className);

  return (
    <header className={classes}>
      <Intro />
      {hasSearch && <Search className={styles.header__search} />}
      <CartButton />
    </header>
  );
};

export default Header;
