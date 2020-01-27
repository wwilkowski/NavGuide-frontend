export interface MyFormProps {
  onSubmit: () => void;
}

export interface FullFormValues {
  begin: Date;
  city: string;
  end: Date;
  file: string[];
  lat: Number;
  lon: Number;
  maxPeople: Number;
  name: string;
  price: Number;
  priceType: string;
  radius: Number;
  tags: string[];
}
