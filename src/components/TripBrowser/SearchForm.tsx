import React, { useState } from "react";
import * as types from "./types";
import { useTranslation } from "react-i18next";
import { NotificationManager } from "react-notifications";

const SearchForm = ({ onChange, onSubmit, value }: types.ISearchFormProps) => {
  const { t } = useTranslation();

  //nie ustawia sie location na value
  const [location, setLocation] = useState<string>(value);

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
    onChange(event.target.value);
  };
  const handleFormSubmit = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();

    location !== ""
      ? onSubmit(location)
      : NotificationManager.warning(t("Form is empty"), t("Warning"));
  };

  const [geoMode, setGeoMode] = useState<boolean>(false);
  const handleGeoModeChange = () => {
    setGeoMode(geoMode ? !geoMode : !geoMode);
  };
  const geoButton = !geoMode && (
    <button onClick={handleGeoModeChange}>{t("Set GEO")}</button>
  );
  const cancelGeoButton = geoMode && (
    <button onClick={handleGeoModeChange}>{t("Unset GEO")}</button>
  );
  const radiusInput = geoMode && <input type="number" min="0"></input>;

  const [selectedOption, setSelectedOption] = useState<string>("");
  const handleSelectedOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedOption(event.target.value);
  };
  const searchSwitches = geoMode && (
    <>
      <label>
        <input
          type="radio"
          value="location"
          checked={selectedOption === "location"}
          onChange={handleSelectedOptionChange}
        />
        {t("location")}
      </label>
      <label>
        <input
          type="radio"
          value="geo"
          checked={selectedOption === "geo"}
          onChange={handleSelectedOptionChange}
        />
        {t("GEO")}
      </label>
    </>
  );

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label>{t("Location")}: </label>
        <input type="text" value={location} onChange={handleFormChange} />
        {geoButton}
        {cancelGeoButton}
        {radiusInput}
        {searchSwitches}
        <button type="submit">{t("Find")}</button>
      </form>
    </div>
  );
};

export default SearchForm;
