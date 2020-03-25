import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '../../store';
import { RouteComponentProps, Redirect } from 'react-router-dom';
import * as actions from './actions';
import UserProfile from '../../components/UserProfile/UserProfile';
import { showNotification } from '../../helpers/notification';

interface TParams {
  userId: string;
}

const User = (props: RouteComponentProps<TParams>) => {
  const dispatcher = useDispatch();

  const isLogged = useSelector((state: StoreType) => state.profile.isLoggedIn);
  const userData = useSelector((state: StoreType) => state.user.users[0]);

  useEffect(() => {
    dispatcher(actions.cleanUserProfiles());
    dispatcher(actions.getUserProfileRequest(parseInt(props.match.params.userId, 10)));
  }, [dispatcher, props.match.params.userId]);

  useEffect(() => {
    if (!isLogged) showNotification('info', 'Information', 'You dont have permission to this content');
  }, [isLogged]);

  return (
    <>
      {isLogged && userData && <UserProfile user={userData} />}
      {!isLogged && <Redirect to='/' />}
    </>
  );
};

export default User;
