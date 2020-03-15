import React, { useState } from 'react';
import { IGalleryProps } from './types';
import styles from '../TripInfo.module.scss';
import leftArrow from '../../../assets/icons/leftArrow.png';
import rightArrow from '../../../assets/icons/rightArrow.png';

const Gallery = ({ photos }: IGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <>
      <div
        className={styles.gallery__switchLeft}
        onClick={() => {
          if (activeIndex === 0) setActiveIndex(photos.length - 1);
          else setActiveIndex((activeIndex - 1) % photos.length);
        }}
      >
        <img src={leftArrow} alt='' />
      </div>
      <div className={styles.gallery__content}>
        <img src={photos[activeIndex]} alt='' />
      </div>
      <div className={styles.gallery__switchRight} onClick={() => setActiveIndex((activeIndex + 1) % photos.length)}>
        <img src={rightArrow} alt='' />
      </div>
      <div className={styles.gallery__footer}>
        {photos.map((photo: string, index: number) =>
          index === activeIndex ? (
            <div key={index} className={styles.dotActive} />
          ) : (
            <div key={index} className={styles.dot} onClick={() => setActiveIndex(index)}></div>
          )
        )}
      </div>
    </>
  );
};

export default Gallery;
