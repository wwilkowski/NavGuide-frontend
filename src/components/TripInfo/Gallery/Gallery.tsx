import React, { useState } from 'react';
import { IGalleryProps } from './types';
import styles from '../TripInfo.module.scss';

const Gallery = ({ photos }: IGalleryProps) => {
  const [activePhoto, setActivePhoto] = useState<string>(photos[0]);

  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <>
      <div className={styles.gallery__switchLeft} onClick={() => setActiveIndex((activeIndex - 1) % photos.length)}></div>
      <div className={styles.gallery__content}>
        <img src={photos[activeIndex]} />
      </div>
      <div className={styles.gallery__switchRight} onClick={() => setActiveIndex((activeIndex + 1) % photos.length)}></div>
      <div className={styles.gallery__footer}>
        {photos.map((photo: string, index: number) =>
          index === activeIndex ? (
            <div className={styles.dotActive} />
          ) : (
            <div className={styles.dot} onClick={() => setActiveIndex(index)}></div>
          )
        )}
      </div>
    </>
  );
};

export default Gallery;
