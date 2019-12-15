import React, { useState } from "react";
import * as types from "./types";
import { useTranslation } from "react-i18next";

const SearchForm = ({
  onSubmit,
  geoMode,
  geoModeChange
}: types.ISearchFormProps) => {
  const { t } = useTranslation();

  const [location, setLocation] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();
    setLocation("");
    onSubmit(location);
  };

  const geoButton = !geoMode && (
    <button onClick={geoModeChange}>{t("Set GEO")}</button>
  );

  const cancelGeoButton = geoMode && (
    <button onClick={geoModeChange}>{t("Unset GEO")}</button>
  );

  const radiusInput = geoMode && <input type="number" min="0"></input>;

  //do tego przelacznika setState i metode obslugujaca zmiane
  const searchSwitch = geoMode && (
    <>
      <label>
        <input type="radio" checked={true} />
        {t("location")}
      </label>
      <label>
        <input type="radio" />
        {t("GEO")}
      </label>
    </>
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>{t("Location")}: </label>
        <input type="text" value={location} onChange={handleChange} />
        {geoButton}
        {cancelGeoButton}
        {radiusInput}
        {searchSwitch}
        <button onClick={handleSubmit}>{t("Find")}</button>
      </form>
    </div>
  );
};

export default SearchForm;
