import React, {Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import i18n from "i18next";
import {  initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js'


import App from './App';
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use (LanguageDetector)
  .use(HttpApi)
  .init({
    supportedLngs: ['en', 'tr'],
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
   
    fallbackLng: "en",
    detection:{  order: [ 'cookie', 'localStorage','htmlTag', 'path', 'subdomain'],
      caches:['cookie'],
    },
    backend:{
      loadPath: './assets/locales/{{lng}}/translation.json',
    },
    react:{useSuspense:false},
    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  });



const root = ReactDOM.createRoot(document.getElementById('root'));

const loadingMarkup = (
  <div className='py-4 text-center'>
    <h2>Loading..</h2>
  </div>
)

root.render(
  <Suspense fallback={loadingMarkup}>
      <React.StrictMode>
    <App />
  </React.StrictMode>
  </Suspense>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
