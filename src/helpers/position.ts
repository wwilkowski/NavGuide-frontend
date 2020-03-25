import { IPositionData, IGeoLocationProps } from '../shared/types';
import { useState, useEffect } from 'react';

const initialPosition: IPositionData = {
  latitude: 0,
  longitude: 0
};

export const usePosition = () => {
  const [position, setPosition] = useState<IPositionData>(initialPosition);

  const onChange = ({ coords }: IGeoLocationProps) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude
    });
  };

  useEffect(() => {
    const geo = navigator.geolocation;
    if (!geo) {
      console.error("GeoLocation doesn't supported");
    }

    const watcher = geo.watchPosition(onChange);

    return () => geo.clearWatch(watcher);
  }, []);

  return { ...position };
};
