import { IPosition } from '../../containers/TripBrowser/types';

export interface MyFormProps {
  onSubmit: (formData: FullFormValues) => void;
  onChange: (location: string) => void;
  position: IPosition;
  place: string;
  setPlace: (place: string) => void;
  setPosition: (position: IPosition) => void;
}

export interface FullFormValues {
  place: string;
  begin: Date;
  city: string;
  end: Date;
  file1: File;
  file2: File;
  file3: File;
  lat: Number;
  lon: Number;
  maxPeople: Number;
  name: string;
  price: Number;
  priceType: string;
  radius: number;
  tags: number[];
  description: string;
}
