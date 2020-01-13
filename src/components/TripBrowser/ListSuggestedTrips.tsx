import React from 'react';
import { IListSuggestedTripsProps } from './types';
import { ISuggestedPlace } from '../../containers/TripBrowser/types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';

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
    <div>
      <List className={classes.root}>
        {suggestedTrips.map((trip: ISuggestedPlace, index: number) => (
          <ListItem button key={index} onClick={() => onCityClick(trip)} onMouseEnter={() => onCityHover(trip)}>
            <ListItemText primary={trip} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ListSuggestedTrips;
