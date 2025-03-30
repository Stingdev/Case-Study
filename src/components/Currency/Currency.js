import React, { useState } from "react";

const Currency = ({ onCurrencyChange }) => {
  const [currency, setCurrency] = useState("USD");

  const handleCurrencyChange = (selectedCurrency) => {
    setCurrency(selectedCurrency); // Local state güncellemesi
    onCurrencyChange(selectedCurrency); // Üst bileşene bildir
  };

  return (
    <div className="currency-selector d-flex gap-2">
      <button
        onClick={() => handleCurrencyChange("USD")}
        className={currency === "USD" ? "btn btn-primary" : "btn btn-outline-primary"}
      >
        USD
      </button>
      <button
        onClick={() => handleCurrencyChange("TL")}
        className={currency === "TL" ? "btn btn-primary" : "btn btn-outline-primary"}
      >
        TL
      </button>
    </div>
  );
};

export default Currency;
