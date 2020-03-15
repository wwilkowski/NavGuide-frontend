import React, { useEffect } from 'react';
import * as actions from './actions';
import * as userActions from '../User/actions';
import { useDispatch, useSelector } from 'react-redux';
import ListGuideRequests from '../../components/AdminPanel/ListGuideRequests';
import { StoreType } from '../../store';
import SettleGuideRequestForm from '../../components/AdminPanel/SettleGuideRequestForm';
import { ISettleGuideRequestFormValues } from '../../components/AdminPanel/types';
import { IGuideRequest } from './types';

const AdminPanel: React.FC = () => {
  const dispatcher = useDispatch();

  const guideRequests = useSelector((state: StoreType) => state.adminPanel.guideRequests);
  const userIds = guideRequests.map((req: IGuideRequest) => req.userId);
  const availableIds = guideRequests.map((req: IGuideRequest) => req.id);

  useEffect(() => {
    dispatcher(actions.getGuideRequestsRequest());
  }, [dispatcher]);

  useEffect(() => {
    dispatcher(userActions.cleanUserProfiles());
    userIds.forEach((id: number) => dispatcher(userActions.getUserProfileRequest(id)));
  }, [userIds, dispatcher]);

  const onSubmitForm = (data: ISettleGuideRequestFormValues) => {
    dispatcher(actions.settleGuideRequest(data));
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <ListGuideRequests guideRequests={guideRequests} />
      <SettleGuideRequestForm onSubmit={onSubmitForm} availableIDs={availableIds} />
    </div>
  );
};

export default AdminPanel;
