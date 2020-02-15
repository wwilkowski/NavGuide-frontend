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
