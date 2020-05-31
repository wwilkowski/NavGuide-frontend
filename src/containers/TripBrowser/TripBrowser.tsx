import React, { useEffect, useMemo, useCallback, useState } from 'react';
import { IPosition, ISingleTripType } from './types';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from './actions';
import { StoreType } from '../../store';
import { ListMode } from '../../components/TripBrowser/types';
import { BottomNavigation, BottomNavigationAction, Grid } from '@material-ui/core';
import ControlledSearchForm from '../../components/ControlledSearchForm';
import ListTrips from '../../components/TripBrowser/ListTrips';
import LeafletMap from '../../components/LeafletMap/LeafletMap';
import { LocationOn, Search } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  menu: {
    position: 'fixed',
    bottom: '0',
    left: '0',
    width: '100%',
  },
  scrolledGrid: {
    overflowY: 'scroll',
    height: '85vh',
  },
});

interface ILocationData {
  displayName: string;
  coords: number[];
}

const TripBrowser: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const dispatcher = useDispatch();

  // TODO: czy zalogowany
  const isLogged = useSelector((state: StoreType) => state.profile.isLoggedIn);
  // TODO; wszystkie pobrane tripy
  const tripsData = useSelector((state: StoreType) => state.tripBrowser.trips);
  // TODO: sugerowane lokalizacje!!!!
  const suggestedCities = useSelector((state: StoreType) => state.tripBrowser.places);
  // TODO: znalezione najbliższe lokalizacje
  const closestTripsData = useSelector((state: StoreType) => state.tripBrowser.closestTrips);
  // TODO: początkowa data
  const [beginDate, setBeginDate] = useState<Date>(new Date());
  // TODO: końcowa data
  const [endDate, setEndDate] = useState<Date>(new Date());
  // TODO: wycieczki przefiltrowane przez dane z formularza
  const [filteredTrips, setFilteredTrips] = useState<ISingleTripType[]>([]);
  // TODO: zaznaczone tagi
  const [activeTags, setActiveTags] = useState<number[]>([]);
  // TODO: wartość inputa lokalizacji
  const [formValue, setFormValue] = useState<string>('UMK Wydział Matematyki i Informatyki');
  // TODO: czy wyświetlać formularz czy mapę na mobilce
  const [formView, setFormView] = useState(true);
  // TODO: temp dla mobilnej nawigacji
  const [value, setValue] = useState(0);
  // TODO: aktualne koordynaty
  const [positionValue, setPositionValue] = useState<IPosition>({
    latitude: 53.01023065,
    longitude: 18.594376006630313,
    radius: 1.0,
  });
  // TODO: id wybranej oferty
  const [chosenOfferId, setChosenOfferId] = useState<number | null>(null);

  // TODO: pierwsze zapytanie o wycieczki po pierwszym renderze
  useEffect(() => {
    const locationData = {
      displayName: formValue,
      coords: [positionValue.longitude, positionValue.latitude],
    };
    fetchTags();
    onSearchFormSubmit(locationData, positionValue.radius, 'normal');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // TODO: wyszukiwanie po zmianie radiusa
  useEffect(() => {
    const locationData = {
      displayName: formValue,
      coords: [positionValue.longitude, positionValue.latitude],
    };

    onSearchFormSubmit(locationData, positionValue.radius, 'geo');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [positionValue.radius, isLogged]);

  // TODO: jeżeli brak wycieczek, to ustawia wyszukiwanie na najbliższe wycieczki
  const mode = useMemo(() => {
    if (!filteredTrips.length) {
      return ListMode.closest;
    } else {
      return ListMode.normal;
    }
  }, [filteredTrips.length]);

  const fetchTags = useCallback(() => {
    dispatcher(actions.fetchTagsRequested());
  }, [dispatcher]);

  const validateTripDate = useCallback(
    (targetBegin: Date, targetEnd: Date) => {
      const beginTime = beginDate.getTime();
      const endTime = endDate.getTime();
      const targetBeginTime = new Date(targetBegin).getTime();
      const targetEndTime = new Date(targetEnd).getTime();
      return (beginTime >= targetBeginTime && beginTime <= targetEndTime) || (endTime >= targetBeginTime && endTime <= targetEndTime);
    },
    [beginDate, endDate]
  );

  const filterTripsByTags = useCallback(() => {
    if (!activeTags.length) return tripsData;
    return tripsData.filter((trip) => {
      const equalTags = trip.tags.filter((tag) => {
        return activeTags.includes(tag.id);
      });
      return equalTags.length;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTags]);

  const setDate = (begin: Date, end: Date) => {
    setBeginDate(begin);
    setEndDate(end);
  };

  useEffect(() => {
    const filteredTrips = tripsData.filter((trip) => validateTripDate(trip.begin, trip.end));
    setFilteredTrips(filteredTrips);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [beginDate, endDate, tripsData]);

  // TODO: filtrowanie wycieczek przy zmianie danych w formularzu
  useEffect(() => {
    if (activeTags && activeTags.length) {
      const filteredTrips = filterTripsByTags().filter((trip) => validateTripDate(trip.begin, trip.end));
      setFilteredTrips(filteredTrips);
    } else setFilteredTrips(tripsData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTags, tripsData]);

  // TODO: gdy user kliknie na polecaną lokalizację
  const onSuggestedCityClick = useCallback(() => {
    dispatcher(actions.fetchSuggestedCitiesRequested('', 0));
  }, [dispatcher]);

  // TODO: gdy zmieni się wpisana lokalizacja
  const onSearchFormChange = useCallback(
    (location: string) => {
      setFormValue(location);
      if (location.length === 0) {
        dispatcher(actions.fetchSuggestedCitiesRequested(location, 0));
      } else {
        dispatcher(actions.fetchSuggestedCitiesRequested(location, 10));
      }
    },
    [dispatcher]
  );

  // TODO: gdy formularz zostanie wysłany
  const onSearchFormSubmit = (location: ILocationData, radius: number, mode: string) => {
    if (mode === 'geo' && suggestedCities.length > 0 && location.displayName !== formValue) {
      if (suggestedCities.length) {
        location.coords[0] = suggestedCities[0].coords[0];
        location.coords[1] = suggestedCities[0].coords[1];
        setFormValue(location.displayName);
        if (location.displayName.length) {
          setPositionValue({
            latitude: location.coords[1],
            longitude: location.coords[0],
            radius,
          });
          dispatcher(actions.fetchGeoTripsRequested(location.coords[1], location.coords[0], radius * 1000, isLogged));
        }
      }
    } else if (mode === 'name') {
      dispatcher(actions.fetchNameTripsRequested(location.displayName));
    } else {
      setFormValue(location.displayName);
      setPositionValue({
        latitude: location.coords[1],
        longitude: location.coords[0],
        radius,
      });
      dispatcher(actions.fetchGeoTripsRequested(location.coords[1], location.coords[0], radius * 1000, isLogged));
    }
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={6} className={classes.scrolledGrid}>
        <ControlledSearchForm
          onChange={onSearchFormChange}
          onSubmit={onSearchFormSubmit}
          updateActiveTags={setActiveTags}
          formValue={formValue}
          positionValue={positionValue}
          setPosition={setPositionValue}
          trips={filteredTrips}
          onCityClick={onSuggestedCityClick}
          isLogged={isLogged}
          setDate={setDate}
        />
        <ListTrips
          trips={filteredTrips}
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
            trips={filteredTrips.length ? filteredTrips : closestTripsData}
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
          <BottomNavigationAction label={t('Search form')} icon={<Search />} />
          <BottomNavigationAction label={t('Show map')} icon={<LocationOn />} />
        </BottomNavigation>
      )}
    </Grid>
  );
};

export default TripBrowser;
