import React, { useEffect, useState } from 'react';
import * as actions from './actions';
import * as userActions from '../User/actions';
import { useDispatch, useSelector } from 'react-redux';
import ListGuideRequests from '../../components/AdminPanel/ListGuideRequests';
import { StoreType } from '../../store';
import { ISettleGuideRequestFormValues } from '../../components/AdminPanel/types';
import { IGuideRequest } from './types';
import { Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const container = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  padding: '1rem',
  justifyContent: 'center',
} as React.CSSProperties;

const content = {
  flex: window.innerWidth >= 1200 ? '0 0 50%' : '0 0 100%',
  height: '100%',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
} as React.CSSProperties;

const AdminPanel: React.FC = () => {
  const dispatcher = useDispatch();

  const { t } = useTranslation();

  const guideRequests = useSelector((state: StoreType) => state.adminPanel.guideRequests);
  const role = useSelector((state: StoreType) => state.profile.user.role);

  const [userIds, setUserIds] = useState<number[]>([]);

  useEffect(() => {
    setUserIds(guideRequests.map((req: IGuideRequest) => req.userId));
  }, [guideRequests]);

  useEffect(() => {
    if (role === 'ADMIN') {
      dispatcher(actions.getGuideRequestsRequest());
    }
  }, [dispatcher, role]);

  useEffect(() => {
    if (role === 'ADMIN') {
      dispatcher(userActions.cleanUserProfiles());
      userIds.forEach((id: number) => {
        dispatcher(userActions.getUserProfileRequest(id));
      });
    }
  }, [userIds, dispatcher, role]);

  const onSubmitForm = (data: ISettleGuideRequestFormValues) => {
    dispatcher(actions.settleGuideRequest(data));
  };

  return role === 'ADMIN' ? (
    <div style={container}>
      <div style={content}>
        <h1 style={{ justifySelf: 'center', fontWeight: 'bold', fontSize: '1.5rem' }}>{t('Admin Panel')}</h1>
        <ListGuideRequests guideRequests={guideRequests} onSubmitForm={onSubmitForm} />
      </div>
    </div>
  ) : (
    <Redirect to='/' />
  );
};

export default AdminPanel;
