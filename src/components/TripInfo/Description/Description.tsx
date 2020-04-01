import React from 'react';
import { IDesctiptionProps } from './types';
import styles from './styles.module.scss';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  text: {
    textAlign: 'center',
    padding: '1rem 2rem'
  }
});

const Description = ({ text }: IDesctiptionProps) => {
  const classes = useStyles();
  return (
    <Typography variant='subtitle2' className={classes.text}>
      {text}
    </Typography>
  );
};

export default Description;
