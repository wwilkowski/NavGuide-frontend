import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { IPosition, ITag } from "../../containers/TripBrowser/types";
import { withFormik, FormikProps, Field, Form } from "formik";
import { useSelector } from "react-redux";
import { StoreType } from "../../store";
import * as Yup from "yup";
import { ISearchFormValues, ISearchFormProps } from "./types";
import { showNotification } from "../../helpers/notification";
import i18n from "../../locales/i18n";
import { usePosition } from "../../helpers/position";
import { IPositionData } from "../../shared/types";

const SearchFormSchema = Yup.object().shape({});

const InnerForm = (
  props: ISearchFormProps & FormikProps<ISearchFormValues>
) => {
  const { t } = useTranslation();

  const tags = useSelector((state: StoreType) => state.tripBrowser.tags);

  //problem, bo usePosition nie mozna wywolac w onClick
  const currentPosition = usePosition();

  const { values, setFieldValue, touched, errors, isSubmitting } = props;

  const [location, setLocation] = useState<string>("");
  const [position, setPosition] = useState<IPosition>({
    latitude: 0,
    longitude: 0,
    radius: 0
  });
  /* const [currentPosition, setCurrentPosition] = useState<IPositionData>({
    latitude: 0,
    longitude: 0
  });*/

  useEffect(() => {
    if (Object.keys(errors).length !== 0 && isSubmitting) {
      Object.values(errors).forEach(error => {
        showNotification("warning", t("Form warning"), t(`${error}`));
      });
    }
  }, [errors, isSubmitting, t]);

  useEffect(() => {
    setLocation(props.formValue);
    values.location = props.formValue;
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <div className="columns">
      <Form className="column is-one-third" style={{ padding: "3rem" }}>
        <div className="field is-horizontal columns">
          <div className="field-label is-normal">
            <label htmlFor="location" className="label">
              {t("Location")}:
            </label>
          </div>

          <Field
            className="input"
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
          {errors.location && touched.location && (
            <div>{t(errors.location)}</div>
          )}
        </div>
        <div className="field columns">
          <div className="field-label is-normal">
            <label htmlFor="lat" className="label">
              {t("Lat")}:{" "}
            </label>
          </div>
          <Field
            className="input"
            id="lat"
            type="text"
            name="lat"
            value={position.latitude}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              props.handleChange(event);
              setPosition({
                latitude: event.target.value
                  ? parseFloat(event.target.value)
                  : 0,
                longitude: position.longitude,
                radius: position.radius
              });
            }}
          />
          <div className="field-label is-normal">
            <label htmlFor="lon" className="label">
              {t("Lon")}:
            </label>
          </div>
          <Field
            className="input"
            id="lon"
            type="text"
            name="lon"
            value={position.longitude}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              props.handleChange(event);
              setPosition({
                latitude: position.latitude,
                longitude: event.target.value
                  ? parseFloat(event.target.value)
                  : 0,
                radius: position.radius
              });
            }}
          />
        </div>
        <div className="field is-horizontal columns">
          <div className="field-label is-normal">
            <label htmlFor="radius" className="label">
              {t("Radius")}:
            </label>
          </div>
          <Field
            className="input"
            id="radius"
            type="text"
            name="radius"
            value={position.radius}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              props.handleChange(event);
              setPosition({
                latitude: position.latitude,
                longitude: position.longitude,
                radius: event.target.value ? parseFloat(event.target.value) : 0
              });
            }}
          />
        </div>
        <div className="field is-horizontal columns">
          <div className="field columns is-half">
            <label className="radio label" htmlFor="currentGeo">
              <input
                type="button"
                value="CURRENT GEO"
                onClick={() => {
                  console.log(currentPosition);
                  setPosition({
                    latitude: currentPosition.latitude,
                    longitude: currentPosition.longitude,
                    radius: position.radius
                  });
                  setFieldValue("lat", currentPosition.latitude);
                  setFieldValue("lon", currentPosition.longitude);
                }}
              />
            </label>
          </div>
        </div>
        <div className="field is-horizontal columns">
          <div className="control column is-half">
            <label
              className="radio label"
              htmlFor="locationSwitch"
              style={{ textAlign: "left" }}
            >
              {t("Location")}
              <Field
                id="locationSwitch"
                type="radio"
                name="searchMode"
                value="location"
                checked={values.searchMode === "location"}
                onChange={props.handleChange}
              />
            </label>
          </div>

          <div className="control column is-half">
            <label
              className="radio label"
              htmlFor="geoSwitch"
              style={{ textAlign: "left" }}
            >
              {t("Geo")}:
              <Field
                id="geoSwitch"
                type="radio"
                name="searchMode"
                value="geo"
                checked={values.searchMode === "geo"}
                onChange={props.handleChange}
              />
            </label>
          </div>
        </div>
        <div className="field is-grouped is-grouped-multiline columns">
          {tags.map((tag: ITag) => (
            <p className="control" key={tag.id}>
              <label className="checkbox label">
                <Field
                  name="activeTags"
                  type="checkbox"
                  value={tag.name}
                  checked={values.activeTags.includes(tag.name)}
                  onChange={handleTagChange}
                />
                {tag.name}
              </label>
            </p>
          ))}
        </div>
        <button className="button is-primary" type="submit">
          {t("Find")}
        </button>
      </Form>
    </div>
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
      radius: positionValue.radius || 1,
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
      showNotification(
        "warning",
        i18n.t("Warning"),
        i18n.t("Please set the cords first")
      );
    } else if (values.location === "" && values.searchMode === "location") {
      showNotification(
        "warning",
        i18n.t("Warning"),
        i18n.t("Please enter city first")
      );
    } else {
      const position: IPosition = {
        latitude: values.lat,
        longitude: values.lon,
        radius: values.radius
      };
      //za kazdym razem radius resetuje sie do wartosci przed zwiekszeniem jej buttonem 'ADD 5KM'
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
