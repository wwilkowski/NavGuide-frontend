import * as constants from './constants';
import * as types from './types';

export const createOfferRequest = (formData: types.IOfferFormValues) => ({
  type: constants.CREATE_OFFER_REQUESTED,
  formData
});

export const createOfferSuccessed = () => ({
  type: constants.CREATE_OFFER_SUCCESSED
});

export const createOfferFailed = () => ({
  type: constants.CREATE_OFFER_FAILED
});

export const getOfferByIdRequest = (id: string) => ({
  type: constants.GET_OFFER_BY_ID_REQUESTED,
  id
});

export const getOfferByIdSuccessed = (offer: types.ISingleTripType) => ({
  type: constants.GET_OFFER_BY_ID_SUCCESSED,
  offer
});

export const getOfferByIdFailed = () => ({
  type: constants.GET_OFFER_BY_ID_FAILED
});

export const buyOfferRequest = (id: string, date: Date, message: string) => ({
  type: constants.BUY_OFFER_REQUESTED,
  id,
  message,
  date
});

export const buyOfferSuccessed = () => ({
  type: constants.BUY_OFFER_SUCCESSED
});

export const buyOfferFailed = () => ({
  type: constants.BUY_OFFER_FAILED
});

export const getActiveOffersRequest = () => ({
  type: constants.GET_ACTIVE_OFFERS_REQUESTED
});

export const getActiveOffersSuccessed = (trips: types.ISingleTripType[]) => ({
  type: constants.GET_ACTIVE_OFFERS_SUCCESSED,
  trips
});

export const getActiveOffersFailed = () => ({
  type: constants.GET_ACTIVE_OFFERS_FAILED
});

// approaches

export const getApproachesRequest = () => ({
  type: constants.GET_APPROACHES_REQUESTED
});

export const getApproachesSuccessed = (trips: types.ISingleTripType[]) => ({
  type: constants.GET_APPROACHES_SUCCESSED,
  trips
});

export const getApproachesFailed = () => ({
  type: constants.GET_APPROACHES_FAILED
});
