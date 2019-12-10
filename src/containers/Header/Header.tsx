import React from "react";
import { Link } from "react-router-dom";
import GoogleLoginButton from "../../components/GoogleLoginButton/GoogleLoginButton";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../Registration/actions";
import SwitchLanguageButton from "../../components/SwitchLanguageButton";
import { UserDataType } from "../Registration/types";

const Header: React.FC = () => {
  const accountInfo = useSelector((state: UserDataType) => state);

  //Tutaj symulowanie stanu zalogowania
  accountInfo.registrationInProgress = false;

  const dispatcher = useDispatch();
  const signUpWithUserCode = (code: string) => {
    dispatcher(actions.signUpUserRequest);
  };

  const content = accountInfo.registrationInProgress ? (
    <h1>Header</h1>
  ) : (
    <div>
      <h1>Header</h1>
      <Link to="/">Home</Link>
      <GoogleLoginButton signUpUserWithCode={signUpWithUserCode} />
      <SwitchLanguageButton code="pl" />
      <SwitchLanguageButton code="en" />
    </div>
  );

  return <>{content}</>;
};

export default Header;
