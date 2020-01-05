import { Field, Form, FormikProps, withFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import * as Yup from "yup";
import countryCodes from "../../helpers/countryCodes.json";
import { showNotification } from "../../helpers/notification";
import i18n from "../../locales/i18n";
import Checkbox from "../../shared/Checkbox";
import { MyFormProps, FullFormValues, IInterest } from "./types";

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(
      /([a-zA-Z',.-]+( [a-zA-Z',.-]+)*){1,100}/,
      i18n.t("Input is not valid!")
    )
    .required("First name is required!"),
  lastName: Yup.string()
    .matches(
      /([a-zA-Z',.-]+( [a-zA-Z',.-]+)*){1,100}/,
      i18n.t("Input is not valid!")
    )
    .required("Last name is required!"),
  telephone: Yup.string()
    .matches(
      /^[0-9]{2}\s?[0-9]{3}\s?[0-9]{3}\s?[0-9]{3}$/,
      i18n.t("Input is not valid!")
    )
    .required("Telephone number is required!")
});

const InnerForm = (props: FormikProps<FullFormValues>) => {
  const { t } = useTranslation();
  const [interests, setInterests] = useState([]);

  const { touched, errors, isSubmitting } = props;

  useEffect(() => {
    if (Object.keys(errors).length !== 0 && isSubmitting) {
      Object.values(errors).forEach(error => {
        showNotification("warning", t("Form warning"), t(`${error}`));
      });
    }
  }, [errors, isSubmitting, t]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetch("https://235.ip-51-91-9.eu/interests");
      const json = await data.json();
      setInterests(json);
    }
    fetchData();
  }, []);

  return (
    <div className="section">
      <Form>
        <div className="field">
          <label className="label" htmlFor="firstName">
            {t("First name")}
          </label>
          <Field
            className="input"
            id="firstName"
            type="text"
            name="firstName"
          />
          {errors.firstName && touched.firstName && (
            <div>{t(errors.firstName)}</div>
          )}
        </div>

        <div className="field">
          <label className="label" htmlFor="lastName">
            {t("Last name")}
          </label>
          <Field className="input" id="lastName" type="text" name="lastName" />
          {errors.lastName && touched.lastName && (
            <div>{t(errors.lastName)}</div>
          )}
        </div>
        <div className="select is-multiple">
          <label className="label" htmlFor="country">
            {t("Country")}
          </label>
          <Field as="select" id="country" name="country">
            {countryCodes.map(country => (
              <option key={country.code} value={country.code}>
                {t(country.name)}
              </option>
            ))}
          </Field>
        </div>

        <div className="field">
          <label className="label" htmlFor="tel">
            {t("Telephone")}
          </label>
          <p className="control has-icons-left">
            <span className="icon is-small is-left">+</span>
            <Field
              className="input telephoneInput"
              id="telephone"
              type="text"
              name="telephone"
            />
            {errors.telephone && touched.telephone && (
              <div>{t(errors.telephone)}</div>
            )}
          </p>
        </div>

        <div className="field">
          <label className="label" htmlFor="gender">
            {t("Gender")}
          </label>
          <div className="select">
            <Field as="select" id="gender" name="gender">
              <option value="male">{t("Male")}</option>
              <option value="female">{t("Female")}</option>
            </Field>
          </div>
        </div>

        <div className="field">
          <label className="label" htmlFor="experience">
            {t("Experience")}
          </label>
          <div className="select">
            <Field as="select" id="experience" name="experience">
              <option value="AMBASSADOR">{t("ambassador")}</option>
              <option value="EXPERT">{t("expert")}</option>
              <option value="ADEPT">{t("adept")}</option>
              <option value="COMPETENT">{t("competent")}</option>
              <option value="EXPERIENCED">{t("experienced")}</option>
              <option value="NOVICE">{t("novice")}</option>
            </Field>
          </div>
        </div>

        <div className="field">
          {interests.map((interest: IInterest) => (
            <label
              key={interest.id}
              className="checkbox"
              htmlFor={interest.name}
            >
              <Checkbox
                id="interests"
                name="interests"
                value={interest.name}
                valueKey={interest.id}
              />
            </label>
          ))}
        </div>
        <button
          className="button is-primary"
          type="submit"
          disabled={isSubmitting}
        >
          {t("Submit")}
        </button>
      </Form>
    </div>
  );
};

const MyForm = withFormik<MyFormProps, FullFormValues>({
  mapPropsToValues: (props: MyFormProps) => {
    const {
      firstName,
      lastName,
      country,
      email,
      telephone,
      gender,
      experience,
      interests
    } = props.templateUser;
    return {
      firstName: firstName || "",
      lastName: lastName || "",
      country: country.toUpperCase() || "PL",
      email: email || "",
      telephone: telephone || "",
      gender: gender || "",
      experience: experience || "NOVICE",
      interests: interests.map(i => i.id) || [],
      avatar: "",
      role: ""
    };
  },
  validationSchema: SignupSchema,

  handleSubmit: (values: FullFormValues, { props }) => {
    const { ...user } = values;

    console.log(user.gender);
    user.telephone = user.telephone.replace(/\s/g, "");
    props.onSubmit(user);
  }
})(InnerForm);

export default MyForm;
