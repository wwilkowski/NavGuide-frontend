import React from 'react';
import { IDesctiptionProps } from './types';

const Description = ({ text }: IDesctiptionProps) => {
  return <p style={{ textAlign: 'center' }}>{text}</p>;
};

export default Description;
