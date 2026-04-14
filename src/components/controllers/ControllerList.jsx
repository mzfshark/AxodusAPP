/**
 * Controller List Component
 * 
 * List of available controllers
 */

import React from 'react';
import './ControllerList.module.css';

const ControllerList = ({ controllers, selectedController, onSelect, onRefresh }) => {
  const getTypeBadge = (type) => {
    const typeMap = {
      pmm: { label: 'PMM', color: '#4ecdc4' },
      directional: { label: 'Directional', color: '#ff9f43' },
      dca: { label: 'DCA', color: '#4caf50' },
      grid: { label: 'Grid', color: '#9b59b6' },
      arbitrage: { label: 'Arbitrage', color: '#e74c3c' },
    };

    const config = typeMap[type] || { label: type, color: '#666' };
    return (
      <span className="typeBadge" style={{ borderColor: config.color, color: config.color }}>
        {config.label}
      </span>
    );
  };

  return (
    <div className="container">
      <div className="header">
        <h3>Controllers</h3>
        <button onClick={onRefresh} className="refreshButton">
          🔄
        </button>
      </div>

      {controllers.length === 0 ? (
        <div className="empty">No controllers</div>
      ) : (
        <div className="list">
          {controllers.map((controller) => (
            <div
              key={controller.name}
              className={`item ${
                selectedController?.name === controller.name ? 'itemSelected' : ''
              }`}
              onClick={() => onSelect(controller)}
            >
              <div className="itemHeader">
                <span className="itemTitle">{controller.name}</span>
                {getTypeBadge(controller.type)}
              </div>
              
              {controller.description && (
                <p className="itemDescription">{controller.description}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ControllerList;
