/**
 * Controller Details Component
 * 
 * Display controller configuration and actions
 */

import React from 'react';
import './ControllerDetails.css';

const ControllerDetails = ({ controller, onEdit, onDelete, loading }) => {
  return (
    <div className="container">
      <div className="header">
        <div>
          <h2>{controller.name}</h2>
          {controller.description && (
            <p className="description">{controller.description}</p>
          )}
        </div>
        <span className="typeBadge">{controller.type.toUpperCase()}</span>
      </div>

      <div className="section">
        <h3>Configuration</h3>
        <div className="configGrid">
          {controller.parameters && Object.entries(controller.parameters).map(([key, value]) => (
            <div key={key} className="configItem">
              <span className="configLabel">
                {key.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}:
              </span>
              <span className="configValue">
                {typeof value === 'boolean' ? (value ? 'Enabled' : 'Disabled') : value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="actions">
        <button onClick={onEdit} className="editButton" disabled={loading}>
          ✏️ Edit Configuration
        </button>
        <button onClick={onDelete} className="deleteButton" disabled={loading}>
          🗑️ Delete Controller
        </button>
      </div>
    </div>
  );
};

export default ControllerDetails;
