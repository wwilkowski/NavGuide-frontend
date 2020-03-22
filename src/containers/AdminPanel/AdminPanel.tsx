import React, { useEffect } from 'react';
import * as actions from './actions';
import * as userActions from '../User/actions';
import { useDispatch, useSelector } from 'react-redux';
import ListGuideRequests from '../../components/AdminPanel/ListGuideRequests';
import { StoreType } from '../../store';
import SettleGuideRequestForm from '../../components/AdminPanel/SettleGuideRequestForm';
import { ISettleGuideRequestFormValues } from '../../components/AdminPanel/types';
import { IGuideRequest } from './types';
import { Redirect } from 'react-router-dom';

const AdminPanel: React.FC = () => {
  const dispatcher = useDispatch();

  const guideRequests = useSelector((state: StoreType) => state.adminPanel.guideRequests);
  const role = useSelector((state: StoreType) => state.profile.user.role);
  const userIds = guideRequests.map((req: IGuideRequest) => req.userId);
  const availableIds = guideRequests.map((req: IGuideRequest) => req.id);

  useEffect(() => {
    if (role === 'ADMIN') {
      dispatcher(actions.getGuideRequestsRequest());
    }
  }, [dispatcher, role]);

  useEffect(() => {
    if (role === 'ADMIN') {
      dispatcher(userActions.cleanUserProfiles());
      userIds.forEach((id: number) => dispatcher(userActions.getUserProfileRequest(id)));
    }
  }, [userIds, dispatcher, role]);

  const onSubmitForm = (data: ISettleGuideRequestFormValues) => {
    dispatcher(actions.settleGuideRequest(data));
  };

  return role === 'ADMIN' ? (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <ListGuideRequests guideRequests={guideRequests} />
      <SettleGuideRequestForm onSubmit={onSubmitForm} availableIDs={availableIds} />
    </div>
  ) : (
    <Redirect to='/' />
  );
};

export default AdminPanel;
