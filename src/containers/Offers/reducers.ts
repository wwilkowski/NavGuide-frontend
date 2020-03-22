import * as constants from './constants';
import * as types from './types';

interface IOffersStore {
  offer: types.ISingleTripType | undefined;
}

const initialState: IOffersStore = {
  offer: undefined
};

const currentOfferReducer = (state = initialState, action: types.IOffersActionType) => {
  switch (action.type) {
    case constants.GET_OFFER_BY_ID_SUCCESSED:
      return {
        ...state,
        offer: action.offer
      };
    case constants.GET_ACTIVE_OFFERS_SUCCESSED:
      return {
        ...state,
        activeOffers: action.trips
      };
    case constants.GET_APPROACHES_SUCCESSED:
      return {
        ...state,
        approaches: action.trips
      };
    case constants.GET_OWN_AGREEMENTS_SUCCESSED:
      return {
        ...state,
        agreements: action.agreements
      };

    case constants.SETTLE_ACTIVE_OFFER_FAILED:
      return state;

    default:
      return state;
  }
};

export default currentOfferReducer;
