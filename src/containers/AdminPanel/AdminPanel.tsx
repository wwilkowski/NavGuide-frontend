import React, { useEffect } from 'react';
import * as actions from './actions';
import { useDispatch, useSelector } from 'react-redux';
import ListGuideRequests from '../../components/AdminPanel/ListGuideRequests';
import { StoreType } from '../../store';
import SettleGuideRequestForm from '../../components/AdminPanel/SettleGuideRequestForm';
import { ISettleGuideRequestFormValues } from '../../components/AdminPanel/types';
import { IGuideRequest } from './types';

const AdminPanel: React.FC = () => {
  const dispatcher = useDispatch();

  const guideRequests = useSelector((state: StoreType) => state.adminPanel.guideRequests);
  const availableIDs = guideRequests.map((el: IGuideRequest) => el.id);
  useEffect(() => {
    dispatcher(actions.getGuideRequestsRequest());
  }, [dispatcher]);

  const onSubmitForm = (data: ISettleGuideRequestFormValues) => {
    dispatcher(actions.settleGuideRequest(data));
  };

  return (
    <>
      <ListGuideRequests guideRequests={guideRequests} />
      <SettleGuideRequestForm onSubmit={onSubmitForm} availableIDs={availableIDs} />
    </>
  );
};

export default AdminPanel;
