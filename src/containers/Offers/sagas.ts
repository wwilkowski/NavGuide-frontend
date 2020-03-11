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

function* createOffer(action: types.ICreateOfferAction) {
  const formData = new FormData();
  const { file, begin, end, city, lat, lon, maxPeople, name, price, priceType, radius, tags, description } = action.formData;
  formData.append('file', file.toString());
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

function* mainSaga() {
  yield takeLatest(constants.CREATE_OFFER_REQUESTED, createOffer);
  yield takeLatest(constants.GET_OFFER_BY_ID_REQUESTED, getOfferById);
}

export default mainSaga;
