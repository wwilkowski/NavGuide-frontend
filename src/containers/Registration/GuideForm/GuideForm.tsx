import React, { useEffect, useState } from 'react';
import GuideRegisterForm from '../../../components/GuideRegisterForm/GuideRegisterForm';
import * as actions from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '../../../store';

interface FormValues {
  languages: string[];
  experience: string;
  description: string;
}

const GuideForm = () => {
  const dispatcher = useDispatch();
  const [blockForm, setBlockForm] = useState(false);
  const requests = useSelector((state: StoreType) => state.registration.guideRequests);

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

  return (
    <div>
      <p> Do tej pory probowales {requests.length} razy</p>
      {blockForm ? (
        <div>
          <p> Status zgłoszenia: {requests[0].status}</p>
          <p> Informacja: {requests[0].message ? requests[0].message : 'Brak'}</p>
        </div>
      ) : (
        <GuideRegisterForm onSubmit={onGuideRegisterFormSubmit} />
      )}
    </div>
  );
};

export default GuideForm;
