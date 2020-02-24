import React from 'react';
import { IDesctiptionProps } from './types';
import { useTranslation } from 'react-i18next';

const Description = ({ text }: IDesctiptionProps) => {
  return <div>{text}</div>;
};

export default Description;
