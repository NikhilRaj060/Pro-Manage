import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import styles from './Analytics.module.css';

const AnalyticsSkeletonLoader = () => {
  return (
    <div className={styles.main}>
      <div className={styles.header}><Skeleton variant="text" width={150} height={30} /></div>
      <div className={styles.container}>
        <div className={styles.analytics_container}>
          <div className={styles.task_container}>
            {Array.from(new Array(4)).map((_, index) => (
              <div className={styles.tasks} key={index}>
                <div className={styles.content}>
                  <Skeleton variant="circular" width={40} height={40} />
                  <Skeleton variant="text" width={100} height={30} />
                </div>
                <Skeleton variant="text" width={30} height={30} />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.analytics_container}>
          <div className={styles.task_container}>
            {Array.from(new Array(4)).map((_, index) => (
              <div className={styles.tasks} key={index}>
                <div className={styles.content}>
                  <Skeleton variant="circular" width={40} height={40} />
                  <Skeleton variant="text" width={100} height={30} />
                </div>
                <Skeleton variant="text" width={30} height={30} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSkeletonLoader;
