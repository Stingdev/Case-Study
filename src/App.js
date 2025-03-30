import React, { useEffect, useState } from "react";
import axios from "axios";
import Language from "./components/Languages/Language";
import DarkMode from "./components/DarkModel/DarkMode";
import Currency from "./components/Currency/Currency";
import List from "./components/List/List";
import "./App.css";
import "./index.css";
import { useTranslation } from "react-i18next";
import Footer from "./components/Footer/Footer";

function App() {
  const { t } = useTranslation();
  const [currency, setCurrency] = useState("USD");
  const EXCHANGE_RATE = 32; // 1 USD = 32 TL

  const handleCurrencyChange = (selectedCurrency) => {
    setCurrency(selectedCurrency); // Seçilen para birimini güncelle
  };

  const convertPrice = (price) => {
    return currency === "TL" ? price * EXCHANGE_RATE : price;
  };

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  const [isDark, setIsDark] = useState(() => {
    const savedValue = localStorage.getItem("isDark");
    return savedValue === "true";
  });
  useEffect(() => {
    localStorage.setItem("isDark", isDark);
  }, [isDark]);

  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://api.hyperteknoloji.com.tr/Products/List",
          {},
          {
            headers: {
              accept: "application/json",
              authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
            },
          }
        );
        console.log("API Yanıtı:", response.data.data);
        setData(response.data.data);
      } catch (error) {
        console.error(
          "API Hatası:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchData();
  }, []);

  return (
    <div
      className={`App ${loading ? "loading" : ""}`}
      data-theme={isDark ? "dark" : "light"}
    >
      {!loading && (
        <div>
          <header className="d-flex align-items-center justify-content-center gap-5 p-4 flex-wrap">
            
              <DarkMode
                isChecked={isDark}
                handleChange={() => setIsDark(!isDark)}
              />
              <Currency onCurrencyChange={handleCurrencyChange} />
              <Language />
            
          </header>
          <div>
            <h1 className="text-center mt-5">{t("all_products")}</h1>
            <List data={data} currency={currency} convertPrice={convertPrice} />
          </div>

          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;
