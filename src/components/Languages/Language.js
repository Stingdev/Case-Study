import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobeAmericas } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import Cookies from "js-cookie";




const languages = [
    {
      code: "tr",
      name: "Türkçe",
      country_code: "tr",
    },
    {
      code: "en",
      name: "English",
      country_code: "gb",
    },
  ];

const Language = () => {
    const { t } = useTranslation(); 
    const currentLanguageCode = Cookies.get('i18next') || 'en'
    const currentLanguage = languages.find( l => l.code === currentLanguageCode)
  
  
  return (
    <div className=" d-flex align-items-center justify-content-end ">
    <div className="d-flex justify-content-end">
      <div className="dropdown">
        <button
          className="btn btn-link dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <FontAwesomeIcon icon={faGlobeAmericas} fontSize={"35px"}  />
        </button>
        <ul className="dropdown-menu">
          {languages.map(({ code, name, country_code }) => (
            <li key={country_code}>
              <button className="dropdown-item" onClick={() =>i18next.changeLanguage (code)}
                disabled={code === currentLanguageCode}>
                <span className={`fi fi-${country_code} mx-2`}
                  style={{opacity: code === currentLanguageCode ? 0.5 : 1 }}
                ></span>
                {name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
    
  </div>
  )
}

export default Language;
