import React from 'react';
import { IDesctiptionProps } from './types';
import styles from './styles.module.scss';

const Description = ({ text }: IDesctiptionProps) => {
  return <p className={styles.description}>{text}</p>;
};

export default Description;
