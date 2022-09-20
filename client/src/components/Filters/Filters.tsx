import classNames from 'classnames';

import styles from './Filters.module.scss';

import Dropdown from '../Dropdown';
import Tabs from '../Tabs';

interface Props {
  className?: string;
}

const Filters = ({ className }: Props) => {
  const classes = classNames(styles.filters, className);

  return (
    <div className={classes}>
      <Tabs />
      <Dropdown />
    </div>
  );
};

export default Filters;
