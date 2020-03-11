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
