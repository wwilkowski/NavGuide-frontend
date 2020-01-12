import React from 'react';
import { IListSuggestedTripsProps } from './types';
import { IPosition } from '../../containers/TripBrowser/types';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: 'auto',
    maxWidth: 300,
    backgroundColor: theme.palette.background.paper
  }
}));

const ListSuggestedTrips = ({ onCityClick, onCityHover, suggestedTrips, activeTags }: IListSuggestedTripsProps) => {
  const classes = useStyles();

  const position: IPosition = {
    latitude: 0,
    longitude: 0,
    radius: 0
  };

  return (
    <div className={classes.root}>
      <List>
        {suggestedTrips.map((trip: string, index: number) => (
          <ListItem
            button
            key={index}
            onClick={() => onCityClick(trip, position, 'location', activeTags)}
            onMouseEnter={() => onCityHover(trip)}
          >
            <ListItemText primary={trip} />
          </ListItem>
        ))}
      </List>
    </div>
    /*<ul>
      {suggestedTrips.map((trip: string, index: number) => (
        <li
          key={index.toString()}
          onClick={() => onCityClick(trip, position, "location", activeTags)}
          onMouseEnter={() => onCityHover(trip)}
        >
          {trip}
        </li>
      ))}
    </ul>*/
  );
};

export default ListSuggestedTrips;
