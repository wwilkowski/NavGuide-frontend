import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import { StoreType } from '../../store';
import ListTrips from './ListTrips';
import { ISearchFormProps, ListMode } from './types';
import { useSelector } from 'react-redux';
import ControlledSearchForm from '../ControlledSearchForm';
import LeafletMap from '../LeafletMap/LeafletMap';
import SearchIcon from '@material-ui/icons/Search';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const useStyles = makeStyles({
  menu: {
    position: 'fixed',
    bottom: '0',
    left: '0',
    width: '100%'
  },
  scrolledGrid: {
    overflowY: 'scroll',
    height: '85vh'
  }
});

const SearchForm = (props: ISearchFormProps) => {
  const classes = useStyles();

  const { setPosition, positionValue, formValue, trips, getTrips } = props;

  const isLogged = useSelector((state: StoreType) => state.profile.isLoggedIn);
  const closestTripsData = useSelector((state: StoreType) => state.tripBrowser.closestTrips);

  const [chosenOfferId, setChosenOfferId] = useState<number | null>(null);
  const [formView, setFormView] = useState(true);
  const [mode, setMode] = useState<ListMode>(ListMode.normal);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!trips.length && isLogged) setMode(ListMode.closest);
    else setMode(ListMode.normal);
  }, [isLogged, trips]);

  useEffect(() => {
    if (mode !== ListMode.normal) getTrips(mode);
  }, [getTrips, mode]);

  return (
    <Grid container>
      <Grid item xs={12} sm={6} className={classes.scrolledGrid}>
        <ControlledSearchForm
          onChange={props.onChange}
          onSubmit={props.onSubmit}
          getTrips={props.getTrips}
          updateActiveTags={props.updateActiveTags}
          formValue={formValue}
          positionValue={positionValue}
          setPosition={setPosition}
          trips={props.trips}
          onCityHover={props.onCityHover}
          onCityClick={props.onCityClick}
        />
        <ListTrips
          trips={props.trips}
          closestTrips={closestTripsData}
          mode={mode}
          chosenOfferId={chosenOfferId}
          setChosenOfferId={setChosenOfferId}
        />
      </Grid>
      <Grid item sm={6}>
        {(!formView || window.innerWidth > 900) && (
          <LeafletMap
            position={positionValue}
            height={window.innerWidth > 800 ? '85vh' : '100vh'}
            trips={props.trips.length > 0 ? props.trips : closestTripsData}
            chosenOfferId={chosenOfferId}
            setChosenOfferId={setChosenOfferId}
          />
        )}
      </Grid>
      {window.innerWidth < 900 && (
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
            if (newValue === 0) {
              setFormView(true);
            } else {
              setFormView(false);
            }
          }}
          showLabels
          className={classes.menu}
        >
          <BottomNavigationAction label='Search Form' icon={<SearchIcon />} />
          <BottomNavigationAction label='Show map' icon={<LocationOnIcon />} />
        </BottomNavigation>
      )}
    </Grid>
  );
};

export default SearchForm;
