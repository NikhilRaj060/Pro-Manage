// BoardSkeletonLoader.js
import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import styles from './Board.module.css';

const BoardSkeletonLoader = () => {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.overview}>
          <Skeleton variant="text" width={200} height={30} />
          <Skeleton variant="text" width={150} height={20} />
        </div>
        <div className={styles.board}>
          <div className={styles.text_title}>
            <Skeleton variant="text" width={100} height={30} />
            <div className={styles.text_title_sub}>
              <Skeleton variant="text" width={100} height={20} />
            </div>
          </div>
          <div className={styles.date_filter}>
            <Skeleton variant="text" width={100} height={20} />
            <Skeleton variant="circular" width={20} height={20} />
          </div>
        </div>
      </div>
      <div className={styles.board_conatiner}>
        {Array.from(new Array(4)).map((_, index) => (
          <div key={index} className={styles.cardBoard}>
            <Skeleton variant="rectangular" width={350} height={750} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardSkeletonLoader;
