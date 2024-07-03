import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import styles from "../Task/Task.module.css";

const SkeletonLoader = () => {
  return (
    <div className={styles.main}>
      <div className={styles.headerContainer}>
        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="text" width={100} height={30} />
      </div>
      <div className={styles.container}>
        <div className={styles.body}>
          <div className={styles.header}>
            <Skeleton variant="circular" width={30} height={30} />
            <Skeleton variant="text" width={100} height={30} />
          </div>
          <Skeleton variant="text" width={200} height={40} />
          <div className={styles.task_list_conainer}>
            <div className={styles.check_list_conainer}>
              <Skeleton variant="text" width={150} height={30} />
            </div>
            <div className={styles.tasks}>
              {Array.from(new Array(3)).map((_, index) => (
                <div className={styles.task} key={index}>
                  <Skeleton variant="rectangular" width={20} height={20} />
                  <Skeleton variant="text" width={200} height={30} />
                </div>
              ))}
            </div>
          </div>
          <div className={styles.chip_container}>
            <Skeleton variant="text" width={100} height={30} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
