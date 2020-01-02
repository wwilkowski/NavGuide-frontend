import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { IPosition, ITag } from "../../containers/TripBrowser/types";
import { withFormik, FormikProps, Field, Form } from "formik";
import { useSelector } from "react-redux";
import { StoreType } from "../../store";
import { NotificationManager } from "react-notifications";
import * as Yup from "yup";
import i18n from "../../locales/i18n";
import { ISearchFormValues, ISearchFormProps } from "./types";

const SearchFormSchema = Yup.object().shape({});

const InnerForm = (
  props: ISearchFormProps & FormikProps<ISearchFormValues>
) => {
  const { t } = useTranslation();

  const tags = useSelector((state: StoreType) => state.tripBrowser.tags);

  const { values, setFieldValue, touched, isSubmitting, errors } = props;

  const [location, setLocation] = useState<string>("");
  const [position, setPosition] = useState<IPosition>({
    latitude: 0,
    longitude: 0,
    radius: 0
  });

  useEffect(() => {
    setLocation(props.formValue);
  }, [props.formValue]);

  useEffect(() => {
    setPosition({
      latitude: props.positionValue.latitude,
      longitude: props.positionValue.longitude,
      radius: props.positionValue.radius
    });
  }, [props.positionValue]);

  const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tagNames = tags.map((tag: ITag) => tag.name);
    const tmp = values.activeTags;
    tagNames.forEach((tagName: string) => {
      if (event.target.value === tagName) {
        if (!values.activeTags.includes(tagName)) tmp.push(tagName);
        else {
          const index = values.activeTags.indexOf(tagName);
          tmp.splice(index, 1);
        }
      }
    });
    props.updateActiveTags(tmp);
    setFieldValue("activeTags", tmp);
  };

  return (
    <Form>
      <label>{t("Location")}: </label>
      <Field
        id="location"
        type="text"
        name="location"
        value={location}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          props.handleChange(event);
          setLocation(event.target.value);
          props.onChange(event.target.value);
        }}
      />
      {errors.location && touched.location && <div>{t(errors.location)}</div>}

      <label>{t("Lat")}: </label>
      <Field
        id="lat"
        type="text"
        name="lat"
        value={position.latitude}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          props.handleChange(event);
          setPosition({
            latitude: parseFloat(event.target.value),
            longitude: position.longitude,
            radius: position.radius
          });
        }}
      />

      <label>{t("Lon")}: </label>
      <Field
        id="lon"
        type="text"
        name="lon"
        value={position.longitude}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          props.handleChange(event);
          setPosition({
            latitude: position.latitude,
            longitude: parseFloat(event.target.value),
            radius: position.radius
          });
        }}
      />

      <label>{t("Radius")}: </label>
      <Field
        id="radius"
        type="text"
        name="radius"
        value={position.radius}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          props.handleChange(event);
          setPosition({
            latitude: position.latitude,
            longitude: position.longitude,
            radius: parseInt(event.target.value, 10)
          });
        }}
      />

      <label>{t("Location")}: </label>
      <Field
        id="locationSwitch"
        type="radio"
        name="searchMode"
        value="location"
        checked={values.searchMode === "location"}
        onChange={props.handleChange}
      />

      <label>{t("Geo")}: </label>
      <Field
        id="geoSwitch"
        type="radio"
        name="searchMode"
        value="geo"
        checked={values.searchMode === "geo"}
        onChange={props.handleChange}
      />

      {tags.map((tag: ITag) => (
        <label key={tag.id}>
          <Field
            name="activeTags"
            type="checkbox"
            value={tag.name}
            onChange={handleTagChange}
          />
          {tag.name}
        </label>
      ))}

      <button type="submit">{t("Find")}</button>
    </Form>
  );
};

const ControlledSearchForm = withFormik<ISearchFormProps, ISearchFormValues>({
  mapPropsToValues: (props: ISearchFormProps) => {
    const formValue = props.formValue;
    const positionValue = props.positionValue;

    return {
      location: formValue || "",
      lat: positionValue.latitude || 0,
      lon: positionValue.longitude || 0,
      radius: positionValue.radius || 0,
      searchMode: "location",
      activeTags: []
    };
  },

  validationSchema: SearchFormSchema,

  handleSubmit: (values: ISearchFormValues, { props }) => {
    //warningi z tlumaczeniem
    if (
      values.searchMode === "geo" &&
      (values.lat === 0 || values.lon === 0 || values.radius === 0)
    ) {
      NotificationManager.warning(`Please set the cords please`, `Warning`);
    } else if (values.location === "" && values.searchMode === "location") {
      NotificationManager.warning(`Please enter city first`, `Warning`);
    } else {
      const position: IPosition = {
        latitude: values.lat,
        longitude: values.lon,
        radius: values.radius
      };

      props.onSubmit(
        values.location,
        position,
        values.searchMode,
        values.activeTags
      );
    }
  }
})(InnerForm);

const SearchForm = (props: ISearchFormProps) => (
  <ControlledSearchForm
    onChange={props.onChange}
    onSubmit={props.onSubmit}
    updateActiveTags={props.updateActiveTags}
    formValue={props.formValue}
    positionValue={props.positionValue}
  />
);

export default SearchForm;
