export interface IOfferFormValues {
  place: string;
  begin: Date;
  city: string;
  end: Date;
  file: File[];
  lat: Number;
  lon: Number;
  maxPeople: Number;
  name: string;
  price: Number;
  priceType: string;
  radius: Number;
  tags: number[];
  description: string;
}

export interface ICreateOfferAction {
  type: string;
  formData: IOfferFormValues;
}
