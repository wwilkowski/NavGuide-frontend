import React from 'react';
import { IListSuggestedTripsProps } from './types';
import { ISuggestedPlace } from '../../containers/TripBrowser/types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import styles from './SearchForm.module.scss';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxHeight: '15em',
    overflow: 'auto',
    backgroundColor: theme.palette.background.paper
  }
}));

const ListSuggestedTrips = ({ onCityClick, onCityHover, suggestedTrips }: IListSuggestedTripsProps) => {
  const classes = useStyles();

  return (
    <div className={styles.suggestedCitiesList}>
      <List className={classes.root}>
        {suggestedTrips.map((trip: ISuggestedPlace, index: number) => (
          <ListItem button key={index} onClick={() => onCityClick(trip)} onMouseEnter={() => onCityHover(trip)}>
            <ListItemText primary={trip.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ListSuggestedTrips;
