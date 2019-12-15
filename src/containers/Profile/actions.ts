import * as constants from './constants';

export const templateRequest = () => ({
  type: constants.TEMP_REQUESTED
});

export const templateSuccessed = (firstName: string) => ({
  type: constants.TEMP_SUCCESSED,
  firstName
});
