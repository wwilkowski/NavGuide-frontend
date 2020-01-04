import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserDataForm from "../../components/UserDataForm/UserDataForm";
import RegisterForm from "./RegisterForm/RegisterForm";
import { StoreType } from "../../store";
import PrivateRoute from "../../shared/PrivateRoute";
import GuideRegisterForm from "../../components/GuideRegisterForm/GuideRegisterForm";
import { FormValues } from "../../components/GuideRegisterForm/types";
import * as actions from "./actions";

const Registration: React.FC = () => {
  const dispatcher = useDispatch();
  const registrationData = useSelector(
    (state: StoreType) => state.registration
  );
  const isLoggedIn = useSelector(
    (state: StoreType) => state.profile.isLoggedIn
  );

  const onGuideRegisterFormSubmit = (guideValues: FormValues) => {
    dispatcher(actions.sendRegisterGuideRequest(guideValues));
  };

  return (
    <div>
      <Switch>
        <Route exact path={"/register"}>
          {registrationData.registrationInProgress ? (
            RegisterForm(UserDataForm)
          ) : (
            <Redirect to="/" />
          )}
        </Route>
        <PrivateRoute
          path={"/register/guide"}
          component={GuideRegisterForm}
          onSubmit={onGuideRegisterFormSubmit}
          isLoggedIn={isLoggedIn}
        />
        <Route>
          <p data-testid="content">NotFoundPage</p>
        </Route>
      </Switch>
    </div>
  );
};

export default Registration;
