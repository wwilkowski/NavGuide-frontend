import * as constants from "./constants";
import * as types from "./types";
import { IUserFormValues, IUserData } from "../../shared/types";
import { FormValues } from "../../components/GuideRegisterForm/types";

export const signUpGoogleRequest = (code: string) => ({
  type: constants.SIGN_UP_GOOGLE_REQUESTED,
  code
});

interface signUpGoogleResponse {
  templateUser: IUserData;
  registerToken: string;
}

export const signUpGoogleSuccessed = (
  response: signUpGoogleResponse
): types.ISignUpActionType => ({
  type: constants.SIGN_UP_GOOGLE_SUCCESSED,
  templateUser: response.templateUser,
  registerToken: response.registerToken
});

export const signUpGoogleFailed = () => ({
  type: constants.SIGN_UP_GOOGLE_FAILED
});

export const confirmSignUpRequest = (
  templateUser: IUserFormValues,
  token: string,
  toBeGuide: boolean
) => ({
  type: constants.CONFIRM_SIGN_UP_REQUESTED,
  templateUser,
  token,
  toBeGuide
});

export const confirmSignUpSuccessed = (token: string) => ({
  type: constants.CONFIRM_SIGN_UP_SUCCESSED,
  token
});

export const confirmSignUpFailed = () => ({
  type: constants.CONFIRM_SIGN_UP_FAILED
});

export const getInterestsRequest = () => ({
  type: constants.GET_INTERESTS_REQUESTED
});

export const getInterestsSuccessed = (
  response: types.IGetInterestsResponse
) => ({
  type: constants.GET_INTERESTS_SUCCESSED,
  interests: response
});

export const getInterestsFailed = () => ({
  type: constants.GET_INTERESTS_FAILED
});

export const sendRegisterGuideRequest = (guideValues: FormValues) => ({
  type: constants.SEND_REGISTER_GUIDE_REQUEST,
  guideValues
});
