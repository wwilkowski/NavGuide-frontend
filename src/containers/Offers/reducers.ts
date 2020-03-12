import * as constants from './constants';
import * as types from './types';

interface IOffersStore {
  offer: types.ISingleTripType | undefined;
}

const initialState: IOffersStore = {
  offer: undefined
};

const RegistrationReducer = (state = initialState, action: types.IGetOfferByIdSuccessed) => {
  switch (action.type) {
    case constants.GET_OFFER_BY_ID_SUCCESSED:
      return {
        ...state,
        offer: action.offer
      };
    default:
      return state;
  }
};

export default RegistrationReducer;
