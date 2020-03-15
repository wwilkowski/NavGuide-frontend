import { GET_OFFER_BY_ID_SUCCESSED, GET_ACTIVE_OFFERS_SUCCESSED, GET_APPROACHES_SUCCESSED } from './constants';

export interface IOfferFormValues {
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
  radius: Number;
  tags: number[];
  description: string;
}

export interface ITag {
  id: number;
  name: string;
}

export interface ICreateOfferAction {
  type: string;
  formData: IOfferFormValues;
}

export interface IGetOfferByIdAction {
  type: string;
  id: number;
}

export interface IBuyOfferAction {
  type: string;
  id: string;
  message: string;
  date: Date;
}

export interface ISingleTripType {
  city: string;
  description: string;
  id: number;
  lat: number;
  lon: number;
  maxPeople: number;
  name: string;
  owner: {
    experience: number;
    firstName: string;
    guideId: number;
    languages: string[];
    lastName: string;
    userId: number;
  };
  photos: string[];
  price: number;
  priceType: string;
  radius: number;
  tags: ITag[];
}

export interface IGetOfferByIdSuccessed {
  type: typeof GET_OFFER_BY_ID_SUCCESSED;
  offer: ISingleTripType;
}

export interface IGetActiveTripsSuccessed {
  type: typeof GET_ACTIVE_OFFERS_SUCCESSED;
  trips: ISingleTripType[];
}

export interface IGetApproachesSuccessed {
  type: typeof GET_APPROACHES_SUCCESSED;
  trips: ISingleTripType[];
}

export type IOffersActionType = IGetOfferByIdSuccessed | IGetActiveTripsSuccessed | IGetApproachesSuccessed;
