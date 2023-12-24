import React, { useState } from "react";
import "../assets/CropCard.css";

const CropCard = ({ crop }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleCardClick = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div className="crop-card" onClick={handleCardClick}>
        <img src={crop.thumbnails[0].image} alt={crop.crop_name} />
        <h3>{crop.crop_name}</h3>
      </div>
      {modalOpen && (
        <div className="modal">
          <span className="close-btn" onClick={closeModal}>
            &times;
          </span>
          <img src={crop.thumbnails[0].image} alt={crop.crop_name} />
        </div>
      )}
    </>
  );
};

export default CropCard;
