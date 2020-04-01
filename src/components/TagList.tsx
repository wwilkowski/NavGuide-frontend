import React from 'react';
import { ITag } from '../containers/TripBrowser/types';
import Checkbox from '../shared/Checkbox';
import { makeStyles } from '@material-ui/core';

interface Props {
  tags: ITag[];
}

const useStyles = makeStyles({
  tagList: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: '1rem'
  },
  tag: {
    margin: '0.2rem 0'
  }
});

const TagList = ({ tags }: Props) => {
  const classes = useStyles();
  return (
    <ul className={classes.tagList}>
      {tags.map(tag => (
        <li key={tag.id} className={classes.tag}>
          <Checkbox name='interests' value={tag.name} valueKey={tag.id} />
        </li>
      ))}
    </ul>
  );
};

export default TagList;
