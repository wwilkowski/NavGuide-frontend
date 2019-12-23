import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { showNotification } from '../helpers/notification';
import i18n from '../locales/i18n';

interface PrivateRouteProps extends RouteProps {
  component: any;
  isLoggedIn: boolean;
}

const PrivateRoute = (props: PrivateRouteProps) => {
  const { component: Component, isLoggedIn, ...rest } = props;

  const redirectWithNotification = () => {
    showNotification('info', i18n.t("You don't have permission to this content"), i18n.t('You are not logged in!'));
    return (
      <Redirect
        to={{
          pathname: '/'
        }}
      />
    );
  };

  return <Route {...rest} render={routeProps => (isLoggedIn ? <Component {...routeProps} /> : redirectWithNotification())} />;
};

export default PrivateRoute;
