import { call, put, takeLatest } from 'redux-saga/effects';
import { showNotification } from '../../helpers/notification';
import { getToken } from '../../helpers/tokenCookie';
import { forwardTo } from '../../history';
import i18n from '../../locales/i18n';
import * as actions from './actions';
import * as constants from './constants';
import * as types from './types';

const offerEndpoint = 'https://235.ip-51-91-9.eu/offers';
const currentOfferEndpoint = (id: number) => `https://235.ip-51-91-9.eu/offers/${id}`;
const buyOfferEndpoint = 'https://235.ip-51-91-9.eu/purchases';
const getActiveOffersEndpoint = 'https://235.ip-51-91-9.eu/purchases';
const getYourApproaches = 'https://235.ip-51-91-9.eu/profile/approaches';

function* createOffer(action: types.ICreateOfferAction) {
  const formData = new FormData();
  const { file1, file2, file3, begin, end, city, lat, lon, maxPeople, name, price, priceType, radius, tags, description } = action.formData;
  formData.append('file', file1);
  formData.append('file', file2);
  formData.append('file', file3);
  formData.append('begin', begin.toUTCString());
  formData.append('end', end.toUTCString());
  formData.append('city', city.toString());
  formData.append('lat', lat.toString());
  formData.append('lon', lon.toString());
  formData.append('maxPeople', maxPeople.toString());
  formData.append('name', name);
  formData.append('price', price.toString());
  formData.append('priceType', priceType.toString());
  formData.append('radius', radius.toString());
  formData.append('tags', tags.toString());
  formData.append('description', description.toString());

  try {
    const response = yield call(fetch, offerEndpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getToken()}`
      },
      body: formData
    });
    if (response.status >= 200 && response.status <= 300) {
      yield put(actions.createOfferSuccessed());
      showNotification('success', `${i18n.t('The offer has been added')}`, '');
      yield call(forwardTo, '/');
    } else {
      if (response.status === 401) {
        throw new Error('You are not logged in');
      } else {
        throw new Error('Something goes wrong');
      }
    }
  } catch (error) {
    yield put(actions.createOfferFailed());
  }
}

function* getOfferById(action: types.IGetOfferByIdAction) {
  try {
    const response = yield call(fetch, currentOfferEndpoint(action.id), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    if (response.status >= 200 && response.status <= 300) {
      const json = yield response.json();
      yield put(actions.getOfferByIdSuccessed(json));
    } else {
      if (response.status === 401) {
        throw new Error('You are not logged in');
      } else {
        throw new Error('Something goes wrong');
      }
    }
  } catch (error) {
    yield put(actions.getOfferByIdFailed());
  }
}

function* buyOffer(action: types.IBuyOfferAction) {
  try {
    const response = yield call(fetch, buyOfferEndpoint, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify({
        offerId: action.id,
        message: action.message,
        plannedDate: action.date
      })
    });
    if (response.status >= 200 && response.status <= 300) {
      yield put(actions.buyOfferSuccessed());
      showNotification('success', `${i18n.t('You have asked the guide to buy a trip')}`, '');
      yield call(forwardTo, '/');
    } else {
      if (response.status === 401) {
        throw new Error('You are not logged in');
      } else {
        throw new Error('Something goes wrong');
      }
    }
  } catch (error) {
    yield put(actions.buyOfferFailed());
  }
}

function* getActiveOffers() {
  try {
    const response = yield call(fetch, getActiveOffersEndpoint, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    if (response.status >= 200 && response.status <= 300) {
      const json = yield response.json();
      yield put(actions.getActiveOffersSuccessed(json));
    } else {
      if (response.status === 401) {
        throw new Error('You are not logged in');
      } else {
        throw new Error('Something goes wrong');
      }
    }
  } catch (error) {
    yield put(actions.getActiveOffersFailed());
  }
}

function* getApproaches() {
  try {
    const response = yield call(fetch, getYourApproaches, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    if (response.status >= 200 && response.status <= 300) {
      const json = yield response.json();

      yield put(actions.getApproachesSuccessed(json));
    } else {
      if (response.status === 401) {
        throw new Error('You are not logged in');
      } else {
        throw new Error('Something goes wrong');
      }
    }
  } catch (error) {
    yield put(actions.getApproachesFailed());
  }
}

function* settleActiveOffer(action: types.ISettleOfferAction) {
  try {
    const settleActiveOffer = `https://235.ip-51-91-9.eu/purchases/${action.id}`;
    const response = yield call(fetch, settleActiveOffer, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify({
        status: action.status,
        message: action.message
      })
    });

    if (response.status >= 200 && response.status <= 300) {
      yield put(actions.getActiveOffersRequest());
    } else if (response.status === 401) {
      throw new Error('You are not logged in');
    } else {
      throw new Error('Something goes wrong');
    }
  } catch (error) {
    console.error(error);
    yield put(actions.settleActiveOfferFailed(error.toString()));
  }
}

function* createAgreement(action: types.ICreateAgreementAction) {
  try {
    const endpoint = `https://235.ip-51-91-9.eu/agreements`;
    const response = yield call(fetch, endpoint, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify({
        offerId: action.newAgreement.offerId,
        description: action.newAgreement.description,
        userId: action.newAgreement.userId,
        plannedDate: action.newAgreement.plannedDate,
        price: action.newAgreement.price
      })
    });

    if (response.status >= 200 && response.status <= 300) {
      const json = yield response.json();
      console.log(json);
    } else if (response.status === 401) {
      throw new Error('You are not logged in');
    } else {
      console.log(response.status);
      throw new Error('Something goes wrong');
    }
  } catch (error) {
    console.log(error);
  }
}

function* getOwnAgreements() {
  try {
    const endpoint = `https://235.ip-51-91-9.eu/agreements`;
    const response = yield call(fetch, endpoint, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });
    if (response.status >= 200 && response.status <= 300) {
      const json = yield response.json();
      yield put(actions.getOwnAgreementsSuccessed(json));
    } else if (response.status === 401) {
      throw new Error('You are not logged in!');
    } else {
      throw new Error('Something goes wrong');
    }
  } catch (error) {
    console.error(error);
  }
}

function* settleAgreement(action: types.ISettleAgreementAction) {
  try {
    const endpoint = `https://235.ip-51-91-9.eu/agreements/${action.id}`;
    const response = yield call(fetch, endpoint, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify({
        status: action.status
      })
    });

    if (response.status >= 200 && response.status <= 300) {
      const json = yield response.json();
      console.log(json);
    } else if (response.status === 401) {
      throw new Error('You are not logged in!');
    } else {
      throw new Error('Something goes wrong');
    }
  } catch (error) {
    console.error(error);
  }
}

function* mainSaga() {
  yield takeLatest(constants.CREATE_OFFER_REQUESTED, createOffer);
  yield takeLatest(constants.GET_OFFER_BY_ID_REQUESTED, getOfferById);
  yield takeLatest(constants.BUY_OFFER_REQUESTED, buyOffer);
  yield takeLatest(constants.GET_ACTIVE_OFFERS_REQUESTED, getActiveOffers);
  yield takeLatest(constants.GET_APPROACHES_REQUESTED, getApproaches);
  yield takeLatest(constants.SETTLE_ACTIVE_OFFER_REQUESTED, settleActiveOffer);
  yield takeLatest(constants.GET_OWN_AGREEMENTS_REQUESTED, getOwnAgreements);
  yield takeLatest(constants.CREATE_AGREEMENT_REQUESTED, createAgreement);
  yield takeLatest(constants.SETTLE_AGREEMENT_REQUESTED, settleAgreement);
}

export default mainSaga;
