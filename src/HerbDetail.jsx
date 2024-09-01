// HerbDetail.js
import React from 'react';
import './VirtualHerbalGarden.css'; // Ensure correct path to CSS

const HerbDetail = ({ selectedHerb, onClose }) => {
  if (!selectedHerb) return null;

  return (
    <div className="herb-detail">
      <button className="close-button" onClick={onClose}>Close</button>
      <div className="herb-detail-content">
        <div className="herb-model">
          <iframe
            title={selectedHerb.title}
            frameBorder="0"
            allowFullScreen
            src={selectedHerb.modelSrc}
            width="100%"
            height="480"
          ></iframe>
        </div>
        <div className="herb-info">
          <h2>{selectedHerb.title}</h2>
          <p><strong>Botanical Name:</strong> {selectedHerb.botanicalName}</p>
          <p><strong>Common Names:</strong> {selectedHerb.commonNames}</p>
          <p><strong>Habitat:</strong> {selectedHerb.habitat}</p>
          <p><strong>Medicinal Uses:</strong> {selectedHerb.medicinalUses}</p>
          <p><strong>How to Find:</strong> {selectedHerb.howToFind}</p>
        </div>
      </div>
    </div>
  );
};

export default HerbDetail;