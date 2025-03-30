import { useState, useEffect } from "react";
import axios from "axios";
import "./List.css";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const List = ({ convertPrice, currency }) => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const { t } = useTranslation();

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
        console.log("API Yanıtı:", response.data);
        if (response.data.success) {
          setData(response.data.data);
        } else {
          console.error("API başarısız oldu:", response.data.message);
        }
      } catch (error) {
        console.error(
          "API Hatası:",
          error.response ? error.response.data : error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredItems = data.filter((item) =>
    item.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center"
        style={{ height: "400px" }}
      >
        {" "}
        <h3 className="text-info position-absolute top-50">{t("load")}</h3>{" "}
      </div>
    );
  }

  return (
    <div className="container list-container mt-5">
      <div className=" pb-4  mb-3 input-container d-flex justify-content-center   ">
        <form class="row w-50 g-3 align-items-center ">
          <div class="col-12 ">
            <div class="input-group">
              <button
                type="submit"
                class="input-group-text"
                id="inputGroupPrepend"
              >
                {" "}
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </button>

              <input
                type="text"
                className="form-control "
                placeholder={t("search")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </form>
      </div>
      {filteredItems.length === 0 ? (
        <div>
          {" "}
          <div
            className="d-flex justify-content-center"
            style={{ height: "400px" }}
          >
            {" "}
            <h3 className="text-info position-absolute top-50">
              {t("error")}
            </h3>{" "}
          </div>
        </div>
      ) : (
        <>
          <div className="container d-flex gap-3 flex-wrap align-items-center justify-content-center card-container">
            {currentItems.map((item, index) => (
              <div key={index} className="card">
                <img
                  className="card-img-top"
                  src={item.productData.productMainImage}
                  alt={item.productName}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <h4>{item.productName}</h4>
                  <p>{item.productData.productDescription}</p>
                  <div className="d-flex gap-3">
                    <p className="fs-5  text-decoration-line-through">
                      {convertPrice(item.salePrice).toFixed(2)}
                      {currency === "TL" ? " ₺" : " $"}
                    </p>
                    <p className="fs-5 text-info ">
                      {convertPrice(item.marketPrice).toFixed(2)}
                      {currency === "TL" ? " ₺" : " $"}
                    </p>
                  </div>
                  <div className="d-flex align-items-center justify-content-center">
                    <a href="#" className="btn btn-primary w-100">
                      {t("item_info")}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="pagination p-4 mb-5 d-flex justify-content-center">
            <button
              className={`btn btn-secondary mx-2 ${
                currentPage === 1 ? "disabled" : ""
              }`}
              onClick={handlePrevPage}
            >
              {t("prev")}
            </button>
            <button
              className={`btn btn-secondary mx-2 ${
                currentPage === totalPages ? "disabled" : ""
              }`}
              onClick={handleNextPage}
            >
              {t("next")}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default List;
