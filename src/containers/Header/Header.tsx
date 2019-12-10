import React from "react";
import { Link } from "react-router-dom";
import GoogleLoginButton from "../../components/GoogleLoginButton/GoogleLoginButton";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../Registration/actions";
import SwitchLanguageButton from "../../components/SwitchLanguageButton";
import { StoreType } from "../../store";
import { useTranslation } from "react-i18next";

const Header: React.FC = () => {
  const { t } = useTranslation();

  const registrationInProgress = useSelector(
    (state: StoreType) => state.user.registrationInProgress
  );

  const dispatcher = useDispatch();
  const signUpWithUserCode = (code: string) => {
    dispatcher(actions.signUpUserRequest("test"));
  };

  return (
    <div>
      <h1>{t("Header")}</h1>
      <Link to="/">{t("Home")}</Link>
      {!registrationInProgress && (
        <GoogleLoginButton signUpUserWithCode={signUpWithUserCode} />
      )}
      <SwitchLanguageButton code="pl" />
      <SwitchLanguageButton code="en" />
    </div>
  );
};

export default Header;
