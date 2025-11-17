/**
 * Controller Form Component
 * 
 * Form for creating/editing controllers
 */

import React, { useState, useEffect } from 'react';
import { validateControllerConfig } from '@services/api/controllerService';
import styles from './ControllerForm.module.css';

const ControllerForm = ({ templates, controller, onSubmit, onCancel, loading }) => {
  const [selectedType, setSelectedType] = useState(controller?.type || 'pmm');
  const [name, setName] = useState(controller?.name || '');
  const [description, setDescription] = useState(controller?.description || '');
  const [parameters, setParameters] = useState(controller?.parameters || {});
  const [errors, setErrors] = useState([]);

  const template = templates[selectedType];

  useEffect(() => {
    if (!controller) {
      // Initialize with default values
      const defaults = {};
      Object.entries(template.parameters).forEach(([key, param]) => {
        defaults[key] = param.default;
      });
      setParameters(defaults);
    }
  }, [selectedType, template, controller]);

  const handleTypeChange = (type) => {
    setSelectedType(type);
    const newTemplate = templates[type];
    const defaults = {};
    Object.entries(newTemplate.parameters).forEach(([key, param]) => {
      defaults[key] = param.default;
    });
    setParameters(defaults);
  };

  const handleParameterChange = (key, value) => {
    setParameters(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate
    const validation = validateControllerConfig(selectedType, parameters);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    setErrors([]);
    
    const config = {
      name,
      type: selectedType,
      description,
      parameters,
    };

    onSubmit(config);
  };

  const renderParameter = (key, param) => {
    const value = parameters[key];

    switch (param.type) {
      case 'number':
        return (
          <input
            type="number"
            value={value || ''}
            onChange={(e) => handleParameterChange(key, parseFloat(e.target.value))}
            min={param.min}
            max={param.max}
            step={param.step}
            required
          />
        );

      case 'select':
        return (
          <select
            value={value || ''}
            onChange={(e) => handleParameterChange(key, e.target.value)}
            required
          >
            {param.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case 'boolean':
        return (
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={value || false}
              onChange={(e) => handleParameterChange(key, e.target.checked)}
            />
            <span>Enabled</span>
          </label>
        );

      case 'text':
      default:
        return (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => handleParameterChange(key, e.target.value)}
            required
          />
        );
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formHeader}>
        <h2>{controller ? 'Edit Controller' : 'New Controller'}</h2>
      </div>

      {/* Errors */}
      {errors.length > 0 && (
        <div className={styles.errorBox}>
          <strong>Validation Errors:</strong>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Basic Info */}
      <div className={styles.section}>
        <h3>Basic Information</h3>
        
        <div className={styles.field}>
          <label>Controller Name *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="my_controller"
            required
            disabled={!!controller}
          />
        </div>

        <div className={styles.field}>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Controller description"
            rows={3}
          />
        </div>
      </div>

      {/* Controller Type */}
      {!controller && (
        <div className={styles.section}>
          <h3>Controller Type</h3>
          <div className={styles.templateGrid}>
            {Object.entries(templates).map(([key, tmpl]) => (
              <div
                key={key}
                className={`${styles.templateCard} ${
                  selectedType === key ? styles.templateCardSelected : ''
                }`}
                onClick={() => handleTypeChange(key)}
              >
                <div className={styles.templateName}>{tmpl.name}</div>
                <div className={styles.templateDescription}>{tmpl.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Parameters */}
      <div className={styles.section}>
        <h3>Parameters</h3>
        <div className={styles.parametersGrid}>
          {Object.entries(template.parameters).map(([key, param]) => (
            <div key={key} className={styles.field}>
              <label>
                {key.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </label>
              {renderParameter(key, param)}
              {param.min !== undefined && param.max !== undefined && (
                <span className={styles.hint}>
                  Range: {param.min} - {param.max}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <button type="button" onClick={onCancel} className={styles.cancelButton}>
          Cancel
        </button>
        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? '⏳ Saving...' : controller ? '💾 Update' : '✨ Create'}
        </button>
      </div>
    </form>
  );
};

export default ControllerForm;
