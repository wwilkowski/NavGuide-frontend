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
  tagsData,
  updateActiveTags
}: types.ISearchFormProps) => {
  const { t } = useTranslation();

  const [radius, setRadius] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [tags, setTags] = useState<ITag[]>([]);
  useEffect(() => {
    setLocation(formValue);
  }, [formValue]);
  useEffect(() => {
    setRadius(radiusValue);
  }, [radiusValue]);
  useEffect(() => {
    setTags(tagsData);
  }, [tagsData]);

  const handleRadiusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadius(event.target.value);
  };
  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
    onChange(event.target.value);
  };
  const handleFormSubmit = (event: React.FormEvent<EventTarget>) => {
    event.preventDefault();

    if (searchMode === "location") {
      !location
        ? NotificationManager.warning(t("Form is empty"), t("Warning"))
        : onSubmit(location, searchMode, activeTags);
    } else if (searchMode === "geo") {
      !radius
        ? NotificationManager.warning(
            t("Please set radius first"),
            t("Warning")
          )
        : onSubmit(radius, searchMode, activeTags);
    }
  };

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

  const [activeTags, setActiveTags] = useState<string[]>([]);
  const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tagNames = tags.map((tag: ITag) => tag.name);
    const tmp = activeTags;
    tagNames.forEach((tagName: string) => {
      if (event.target.name === tagName) {
        if (!activeTags.includes(tagName)) tmp.push(tagName);
        else {
          const index = activeTags.indexOf(tagName);
          tmp.splice(index, 1);
        }
      }
    });
    setActiveTags(tmp);
    updateActiveTags(tmp);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label>{t("Location")}: </label>
      <input type="text" value={location} onChange={handleFormChange} />
      {geoButton}
      {cancelGeoButton}
      {radiusInput}
      {searchSwitches}
      {tags.map((tag: ITag) => (
        <label key={tag.id}>
          <input
            name={tag.name}
            type="checkbox"
            checked={activeTags.includes(tag.name)} //nie dziala
            onChange={handleTagChange}
          />
          {tag.name}
        </label>
      ))}
      <button type="submit">{t("Find")}</button>
    </form>
  );
};

export default SearchForm;
