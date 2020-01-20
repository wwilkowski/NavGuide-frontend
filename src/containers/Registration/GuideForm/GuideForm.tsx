import React, { useEffect, useState } from 'react';
import GuideRegisterForm from '../../../components/GuideRegisterForm/GuideRegisterForm';
import * as actions from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '../../../store';
import { useTranslation } from 'react-i18next';

interface FormValues {
  languages: string[];
  experience: string;
  description: string;
}

const GuideForm = () => {
  const dispatcher = useDispatch();
  const [blockForm, setBlockForm] = useState(false);
  const requests = useSelector((state: StoreType) => state.registration.guideRequests);
  const userRole = useSelector((state: StoreType) => state.profile.user.role);
  const { t } = useTranslation();
  useEffect(() => {
    dispatcher(actions.getGuideInfoRequest());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    for (let i = 0; i < requests.length; i++) {
      if (requests[i].status === 'PENDING') {
        setBlockForm(true);
      }
    }
  }, [dispatcher, requests]);

  const onGuideRegisterFormSubmit = (guideValues: FormValues) => {
    dispatcher(actions.sendRegisterGuideRequest(guideValues));
  };

  const lastRequestId = requests.length > 1 ? requests.length - 1 : -1;
  if (userRole === 'GUIDE') return <p>{t(`You are already a guide!`)}</p>;
  else {
    return (
      <div>
        {!blockForm && requests.length > 0 && (
          <div>
            <p>Wiadomość z ostatniej próby</p>
            <p>
              {t(requests[lastRequestId].status.toLowerCase())} : {requests[lastRequestId].message}
            </p>
          </div>
        )}
        {blockForm ? (
          <div>
            <p>{t(`You applied for being the guide`)}</p>
            <p>
              {t(`Request status`)}: {t(`${requests[lastRequestId].status.toLowerCase()}`)}
            </p>
            <p>
              {t(`Feedback`)}: {requests[lastRequestId].message ? requests[lastRequestId].message : t(`No message`)}
            </p>
          </div>
        ) : (
          <GuideRegisterForm onSubmit={onGuideRegisterFormSubmit} />
        )}
      </div>
    );
  }
};

export default GuideForm;
