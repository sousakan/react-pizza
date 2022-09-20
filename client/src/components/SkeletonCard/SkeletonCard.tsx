import styles from './SkeletonCard.module.scss';

const SkeletonCard = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.skeleton__img} />
      <div className={styles.skeleton__name} />
      <div className={styles.skeleton__tabs}>
        <div className={styles.skeleton__one}>
          <div className={styles.skeleton__tab} />
          <div className={styles.skeleton__tab} />
        </div>
        <div className={styles.skeleton__two}>
          <div className={styles.skeleton__tab} />
          <div className={styles.skeleton__tab} />
          <div className={styles.skeleton__tab} />
        </div>
      </div>
      <div className={styles.skeleton__footer}>
        <div className={styles.skeleton__price} />
        <div className={styles.skeleton__button} />
      </div>
    </div>
  );
};

export default SkeletonCard;
