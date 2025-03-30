import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTranslation } from "react-i18next";
import "./Footer.css";


const Footer = () => {
    const { t } = useTranslation(); 

  return (
    <footer className="py-4 mt-5">
      <div className="container px-5 text-center text-md-start">
        <div className="row">
          <div className="col-md-4">
            <h5>Hyper Teknoloji</h5>
            <p> {t("rights")}</p>
          </div>
          <div className="col-md-4">
            <h5>{t("links")}</h5>
            <ul className="list-unstyled">
              <li><a href="#" className=" text-decoration-none">{t("abt")}</a></li>
              <li><a href="#" className=" text-decoration-none">{t("contact")}</a></li>
              <li><a href="#" className=" text-decoration-none">{t("privacy")}</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5 className="text-center">{t("follow")}</h5>
            <div className="d-flex gap-3 justify-content-center">
              <a href="#" className=" text-decoration-none">🔵 Facebook</a>
              <a href="#" className="text-decoration-none">🐦 Twitter</a>
              <a href="#" className=" text-decoration-none">📷 Instagram</a>
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
          <p className="text-secondary">{t("case")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
