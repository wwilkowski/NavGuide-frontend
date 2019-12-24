import React, { useState, useEffect } from "react";
import * as types from "./types";
import { useTranslation } from "react-i18next";
import { NotificationManager } from "react-notifications";
import { ITag } from "../../containers/TripBrowser/types";

const SearchForm = ({
  onChange,
  onSubmit,
  formValue,
  radiusValue,
  onTagChange
}: types.ISearchFormProps) => {
  const { t } = useTranslation();

  const [radius, setRadius] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  useEffect(() => {
    setLocation(formValue);
  }, [formValue]);
  useEffect(() => {
    setRadius(radiusValue);
  }, [radiusValue]);

  //system tagów
  const [tag1, setTag1] = useState<boolean>(false);
  const [tag2, setTag2] = useState<boolean>(false);
  const [tag3, setTag3] = useState<boolean>(false);
  const [tag4, setTag4] = useState<boolean>(false);
  const [tag5, setTag5] = useState<boolean>(false);
  let activeTags: string[] = [];
  const createActiveTagsTable = () => {
    if (tag1) activeTags.push("tag1");
    if (tag2) activeTags.push("tag2");
    if (tag3) activeTags.push("tag3");
    if (tag4) activeTags.push("tag4");
    if (tag5) activeTags.push("tag5");
  };

  const handleRadiusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadius(event.target.value);
  };
  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
    onChange(event.target.value);
  };
  const handleFormSubmit = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();

    createActiveTagsTable();

    if (searchMode === "location") {
      !location
        ? NotificationManager.warning(t("Form is empty"), t("Warning"))
        : onSubmit(location, searchMode);
    } else if (searchMode === "geo") {
      !radius
        ? NotificationManager.warning(
            t("Please set radius first"),
            t("Warning")
          )
        : onSubmit(radius, searchMode);
    }
  };

  //ENABLE GEO BUTTON
  const [geoMode, setGeoMode] = useState<boolean>(false);
  const handleGeoModeChange = () => {
    if (geoMode) setSearchMode("location");
    setGeoMode(!geoMode);
  };
  const geoButton = !geoMode && (
    <button onClick={handleGeoModeChange}>{t("Set GEO")}</button>
  );
  const cancelGeoButton = geoMode && (
    <button onClick={handleGeoModeChange}>{t("Unset GEO")}</button>
  );
  const radiusInput = geoMode && (
    <input
      type="number"
      min="0"
      value={radius}
      onChange={handleRadiusChange}
    ></input>
  );

  //SEARCH SWITCHES
  const [searchMode, setSearchMode] = useState<string>("location");
  const [selectedOption, setSelectedOption] = useState<string>("location");
  const handleSelectedOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedOption(event.target.value);

    event.target.value === "location"
      ? setSearchMode("location")
      : setSearchMode("geo");
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

  //nie dziala, bo po uruchomieniu akcji ponownie kilka razy pobieraja sie wycieczki ze store'a (handleTagChange)
  const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case "tag1":
        setTag1(!tag1);
        createActiveTagsTable();
        onTagChange(activeTags);
        break;
      case "tag2":
        setTag2(!tag2);
        createActiveTagsTable();
        onTagChange(activeTags);
        break;
      case "tag3":
        setTag3(!tag3);
        createActiveTagsTable();
        onTagChange(activeTags);
        break;
      case "tag4":
        setTag4(!tag4);
        createActiveTagsTable();
        onTagChange(activeTags);
        break;
      case "tag5":
        setTag5(!tag5);
        createActiveTagsTable();
        onTagChange(activeTags);
        break;
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label>{t("Location")}: </label>
      <input type="text" value={location} onChange={handleFormChange} />
      {geoButton}
      {cancelGeoButton}
      {radiusInput}
      {searchSwitches}
      <label>
        <input
          name="tag1"
          type="checkbox"
          checked={tag1}
          onChange={handleTagChange}
        />
        tag1
      </label>
      <label>
        <input
          name="tag2"
          type="checkbox"
          checked={tag2}
          onChange={handleTagChange}
        />
        tag2
      </label>
      <label>
        <input
          name="tag3"
          type="checkbox"
          checked={tag3}
          onChange={handleTagChange}
        />
        tag3
      </label>
      <label>
        <input
          name="tag4"
          type="checkbox"
          checked={tag4}
          onChange={handleTagChange}
        />
        tag4
      </label>
      <label>
        <input
          name="tag5"
          type="checkbox"
          checked={tag5}
          onChange={handleTagChange}
        />
        tag5
      </label>
      <button type="submit">{t("Find")}</button>
    </form>
  );
};

export default SearchForm;
