import React, { useState } from "react";
import * as types from "./types";
import { useTranslation } from "react-i18next";

const SearchForm = ({ onSubmit }: types.ISearchFormProps) => {
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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>{t("Location")}: </label>
        <input type="text" value={location} onChange={handleChange} />
        <button onClick={handleSubmit}>{t("Find")}</button>
      </form>
    </div>
  );
};

export default SearchForm;
