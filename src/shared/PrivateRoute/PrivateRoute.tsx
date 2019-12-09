import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { UserInfoType } from '../../containers/RegisterForm/types';

interface Props {
  component: React.ElementType;
  path: string;
}

const PrivateRoute = ({ component, ...rest }: Props) => {
  const logged = useSelector((state: UserInfoType) => state.logged);
  return <Route {...rest} render={props => (logged === true ? React.createElement(component, props) : <Redirect to='/login' />)} />;
};

export default PrivateRoute;
