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

// settle active offer

export const settleActiveOfferRequest = (id: number, status: string, message: string) => ({
  type: constants.SETTLE_ACTIVE_OFFER_REQUESTED,
  id,
  status,
  message
});

export const settleActiveOfferFailed = (message: string) => ({
  type: typeof constants.SETTLE_ACTIVE_OFFER_FAILED,
  message
});

// agreements

export const createAgreementRequest = (newAgreement: types.IAgreement) => ({
  type: constants.CREATE_AGREEMENT_REQUESTED,
  newAgreement
});

export const getOwnAgreementsRequest = () => ({
  type: constants.GET_OWN_AGREEMENTS_REQUESTED
});

export const getOwnAgreementsSuccessed = (agreements: types.IActiveOffer[]) => ({
  type: constants.GET_OWN_AGREEMENTS_SUCCESSED,
  agreements
});

export const getOwnAgreementsFailed = (message: string) => ({
  type: constants.GET_OWN_AGREEMENTS_FAILED,
  message
});

export const settleAgreementRequest = (id: number, status: string) => ({
  type: constants.SETTLE_AGREEMENT_REQUESTED,
  id,
  status
});

// report offer

export const reportOfferRequest = (offerId: number, description: string) => ({
  type: constants.REPORT_OFFER_REQUESTED,
  offerId,
  description
});

// add feedback

export const addFeedbackRequest = (feedback: types.IFeedback) => ({
  type: constants.ADD_FEEDBACK_REQUESTED,
  feedback
});

export const sendMessageRequest = (description: string, purchaseId: number) => ({
  type: constants.SEND_MESSAGE_REQUESTED,
  description,
  purchaseId
});

export const getMessagesRequest = (purchaseId: number) => ({
  type: constants.GET_MESSAGES_REQUESTED,
  purchaseId
});

export const getMessagesSuccessed = (messages: types.Message) => ({
  type: constants.GET_MESSAGES_SUCCESSED,
  messages
});
