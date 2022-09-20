import classNames from 'classnames';

import styles from './Container.module.scss';

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Container = ({ children, className }: Props) => {
  const style = classNames(styles.container, className);

  return <div className={style}>{children}</div>;
};

export default Container;
