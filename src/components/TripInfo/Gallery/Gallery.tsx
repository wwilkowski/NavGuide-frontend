import React, { useState } from 'react';
import { IGalleryProps } from './types';
import styles from './styles.module.scss';
import LeftArrowIcon from '../../../assets/icons/left-arrow-white.png';
import RightArrowIcon from '../../../assets/icons/right-arrow.-white.png';

const Gallery = ({ photos }: IGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <div className={styles.container}>
      <button
        onClick={() => {
          if (activeIndex === 0) setActiveIndex(photos.length - 1);
          else setActiveIndex((activeIndex - 1) % photos.length);
        }}
        className={`${styles.button} ${styles.leftArrow}`}
      >
        <img src={LeftArrowIcon} alt='' />
      </button>
      <img src={photos[activeIndex]} alt='' className={styles.img} />
      <button onClick={() => setActiveIndex((activeIndex + 1) % photos.length)} className={`${styles.button} ${styles.rightArrow}`}>
        <img src={RightArrowIcon} alt='' />
      </button>
      <div>
        {photos.map((photo: string, index: number) =>
          index === activeIndex ? <div key={index} /> : <div key={index} onClick={() => setActiveIndex(index)}></div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
