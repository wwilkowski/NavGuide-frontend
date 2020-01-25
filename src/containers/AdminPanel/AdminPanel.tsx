import React, { useEffect } from 'react';
import * as actions from './actions';
import { useDispatch, useSelector } from 'react-redux';
import ListGuideRequests from '../../components/AdminPanel/ListGuideRequests';
import { StoreType } from '../../store';

const AdminPanel: React.FC = () => {
  const dispatcher = useDispatch();

  const guideRequests = useSelector((state: StoreType) => state.adminPanel.guideRequests);

  useEffect(() => {
    dispatcher(actions.getGuideRequestsRequest());
  }, []);

  return <ListGuideRequests guideRequests={guideRequests} />;
};

export default AdminPanel;
