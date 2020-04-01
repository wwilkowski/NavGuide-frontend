import {
  GET_OFFER_BY_ID_SUCCESSED,
  GET_ACTIVE_OFFERS_SUCCESSED,
  GET_APPROACHES_SUCCESSED,
  SETTLE_ACTIVE_OFFER_REQUESTED,
  SETTLE_ACTIVE_OFFER_SUCCESSED,
  SETTLE_ACTIVE_OFFER_FAILED,
  GET_OWN_AGREEMENTS_REQUESTED,
  GET_OWN_AGREEMENTS_SUCCESSED,
  GET_OWN_AGREEMENTS_FAILED,
  CREATE_AGREEMENT_REQUESTED,
  SETTLE_AGREEMENT_REQUESTED,
  REPORT_OFFER_REQUESTED,
  ADD_FEEDBACK_REQUESTED,
  GET_OFFER_FEEDBACKS_REQUESTED,
  GET_OFFER_FEEDBACKS_SUCCESSED,
  GET_OFFER_FEEDBACKS_FAILED
} from './constants';

import * as typesTripBrowser from '../../containers/TripBrowser/types';

export interface ITraveler {
  id: number;
  firstName: string;
  lastName: string;
  country: string;
  role: string;
  experience: number;
  avatar: string;
}

export interface IOffer {
  id: number;
  message: string;
  offer: typesTripBrowser.ISingleTripType;
  plannedDate: Date;
  traveler: ITraveler;
  status: string;
  feedbackMessage: string;
}

export interface IActiveOffer {
  id: number;
  message: string;
  offer: typesTripBrowser.ISingleTripType;
  plannedDate: Date;
  traveler: ITraveler;
  status: string;
  feedbackMessage: string;
}

export interface IAgreementOffer {
  description: string;
  id: number;
  offer: typesTripBrowser.ISingleTripType;
  plannedDate: string;
  purchase: IActiveOffer;
  price: number;
  status: string;
  traveler: ITraveler;
}

export interface ICurrentOffer {
  offer: typesTripBrowser.ISingleTripType;
  feedbacks: IGotFeedback[];
  activeOffers: IActiveOffer[];
  approaches: IActiveOffer[];
  agreements: IAgreementOffer[];
}

export interface IProfileOffersProps {
  trips: IOffer[];
  agreements: IAgreementOffer[];
}

export interface IProfileVerifiedOffersProps {
  trips: IOffer[];
  state: string;
}

export interface IProfileHistoryOffersProps {
  trips: typesTripBrowser.IEndedSingleTripType[];
  feedbacks: IGotFeedback[];
  userRole: string;
}

export interface IAgreementsProps {
  agreements: IAgreementOffer[];
  verifiedOffers: IActiveOffer[];
  onAgreementButtonClick: (agreementId: number, status: string) => void;
}

export interface IAcceptedOffersProps {
  agreements: IAgreementOffer[];
}

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

export interface ITag {
  id: number;
  name: string;
}
export interface IAgreement {
  purchaseId: number;
  description: string;
  userId: number;
  plannedDate: string;
  price: number;
}

export interface IFeedback {
  offerId: number;
  scoreOffer: number;
  scoreGuide: number;
  comment: string;
}

export interface IGotFeedback extends IFeedback {
  date: Date;
  offer: ISingleTripType;
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

export interface ISettleOfferAction {
  type: typeof SETTLE_ACTIVE_OFFER_REQUESTED;
  id: number;
  status: string;
  message: string;
}

export interface ICreateAgreementAction {
  type: typeof CREATE_AGREEMENT_REQUESTED;
  newAgreement: IAgreement;
}

export interface IGetOwnAgreementsAction {
  type: typeof GET_OWN_AGREEMENTS_REQUESTED;
}

export interface ISettleAgreementAction {
  type: typeof SETTLE_AGREEMENT_REQUESTED;
  id: number;
  status: string;
}

export interface IReportOfferAction {
  type: typeof REPORT_OFFER_REQUESTED;
  offerId: number;
  description: string;
}

export interface IAddFeedbackAction {
  type: typeof ADD_FEEDBACK_REQUESTED;
  feedback: IFeedback;
}

export interface IGetOfferFeedbacksAction {
  type: typeof GET_OFFER_FEEDBACKS_REQUESTED;
  id: number;
}

export interface IGetOfferFeedbacksSuccessedAction {
  type: typeof GET_OFFER_FEEDBACKS_SUCCESSED;
  feedbacks: IFeedback[];
}

export interface IGetOfferFeedbacksFailedAction {
  type: typeof GET_OFFER_FEEDBACKS_FAILED;
  message: string;
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

export interface ISettleActiveOfferSuccessed {
  type: typeof SETTLE_ACTIVE_OFFER_SUCCESSED;
}

export interface ISettleActiveOfferFailed {
  type: typeof SETTLE_ACTIVE_OFFER_FAILED;
}

export interface IGetOwnAgreementsSuccessed {
  type: typeof GET_OWN_AGREEMENTS_SUCCESSED;
  agreements: IActiveOffer[];
}

export interface IGetOwnAgreementsFailed {
  type: typeof GET_OWN_AGREEMENTS_FAILED;
  message: string;
}

export type IOffersActionType =
  | IGetOfferByIdSuccessed
  | IGetActiveTripsSuccessed
  | IGetApproachesSuccessed
  | ISettleActiveOfferSuccessed
  | ISettleActiveOfferFailed
  | IGetOwnAgreementsSuccessed
  | IGetOwnAgreementsFailed
  | IGetOfferFeedbacksSuccessedAction
  | IGetOfferFeedbacksFailedAction;
