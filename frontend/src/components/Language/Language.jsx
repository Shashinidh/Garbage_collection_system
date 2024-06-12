import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import './Language.css';

const Language = () => {
  const { t, i18n } = useTranslation("global");
  const navigate = useNavigate();

  const handleChangeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  }

  const handleButtonClick = () => {
    navigate('/home');
  }

  return (
    <div className="language-container flex justify-center items-center h-screen bg-gray-100">
      <div className="form bg-white p-8 rounded-lg shadow-md">
        <h1 className="language-title text-2xl font-bold mb-4">{t("language.title")}</h1>
        <div className="button-container">
          <button className="gray-button bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2" onClick={() => handleChangeLanguage("en")}>{t("language.en")}</button>
          <button className="gray-button bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" onClick={() => handleChangeLanguage("si")}>{t("language.sin")}</button>
        </div>
        <div className="mt-4 button-container">
          <button className="light-green-button bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleButtonClick}>{t("language.button")}</button>
        </div>
      </div>
    </div>
  );
}

export default Language;
