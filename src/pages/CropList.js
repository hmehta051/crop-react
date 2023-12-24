import React, { useEffect, useState } from "react";
import CropCard from "../components/CropCard";
import "../assets/CropList.css";

const CropList = () => {
  const [crops, setCrops] = useState([]);
  const [filteredCrops, setFilteredCrops] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);

    const filtered = crops.data.filter((crop) =>
      crop.crop_name.toLowerCase().includes(searchTerm)
    );
    setFilteredCrops(filtered);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://api-cache-test.leanagri.com/pop/pop_list/en/64/pop_list.json"
      );
      const data = await response.json();
      setCrops(data);
      setFilteredCrops(data.data);
    }
    fetchData();
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedCrops = filteredCrops.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredCrops.length / itemsPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(
      <span
        key={i}
        className={i === currentPage ? "active" : ""}
        onClick={() => handlePageChange(i)}
      >
        {i}
      </span>
    );
  }

  return (
    <div style={{ width: "90%", margin: "auto" }}>
      <input
        type="text"
        placeholder="Search by crop name"
        value={searchTerm}
        onChange={handleSearch}
        style={{ width: "70%", marginLeft: "20px", marginTop: "10px" }}
      />
      <div className="crop-grid">
        {displayedCrops.map((crop) => (
          <CropCard key={crop.id} crop={crop} />
        ))}
      </div>
      <div className="pagination">
        <span
          onClick={() => handlePageChange(currentPage - 1)}
          className={currentPage === 1 ? "disabled" : ""}
        >
          &laquo;
        </span>
        {pageNumbers}
        <span
          onClick={() => handlePageChange(currentPage + 1)}
          className={currentPage === totalPages ? "disabled" : ""}
        >
          &raquo;
        </span>
      </div>
    </div>
  );
};

export default CropList;
