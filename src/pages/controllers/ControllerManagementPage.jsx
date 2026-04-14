/**
 * Controller Management Page
 * 
 * Interface for creating and managing Hummingbot controllers
 */

import React, { useState, useEffect } from 'react';
import {
  listControllers,
  getControllerConfig,
  createController,
  updateController,
  deleteController,
  getControllerTemplates,
} from '@services/api/controllerService';
import ControllerForm from '@components/controllers/ControllerForm';
import ControllerList from '@components/controllers/ControllerList';
import ControllerDetails from '@components/controllers/ControllerDetails';
import ConnectionStatus from '@components/realtime/ConnectionStatus';
import './ControllerManagementPage.css';

const ControllerManagementPage = () => {
  const [controllers, setControllers] = useState([]);
  const [selectedController, setSelectedController] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const templates = getControllerTemplates();

  useEffect(() => {
    fetchControllers();
  }, []);

  const fetchControllers = async () => {
    try {
      const data = await listControllers();
      setControllers(data);
    } catch (err) {
      console.error('Fetch controllers error:', err);
    }
  };

  const handleCreate = async (config) => {
    setLoading(true);
    setError(null);

    try {
      await createController(config);
      await fetchControllers();
      setShowForm(false);
      setSelectedController(null);
    } catch (err) {
      setError(err.response?.data?.detail || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (name, config) => {
    setLoading(true);
    setError(null);

    try {
      await updateController(name, config);
      await fetchControllers();
      setEditMode(false);
    } catch (err) {
      setError(err.response?.data?.detail || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (name) => {
    if (!confirm(`Delete controller "${name}"?`)) return;

    setLoading(true);
    setError(null);

    try {
      await deleteController(name);
      await fetchControllers();
      setSelectedController(null);
    } catch (err) {
      setError(err.response?.data?.detail || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = async (controller) => {
    setShowForm(false);
    setEditMode(false);
    setLoading(true);

    try {
      const details = await getControllerConfig(controller.type, controller.name);
      setSelectedController({ ...controller, ...details });
    } catch (err) {
      console.error('Get controller details error:', err);
      setSelectedController(controller);
    } finally {
      setLoading(false);
    }
  };

  const handleNewController = () => {
    setShowForm(true);
    setEditMode(false);
    setSelectedController(null);
  };

  const handleEdit = () => {
    setEditMode(true);
    setShowForm(false);
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <div>
          <h1>Controller Management</h1>
          <p className="subtitle">
            Create and manage trading controllers
          </p>
        </div>
        <div className="headerActions">
          <ConnectionStatus />
          <button onClick={handleNewController} className="newButton">
            ➕ New Controller
          </button>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="errorBanner">
          <strong>Error:</strong> {error}
          <button onClick={() => setError(null)}>Dismiss</button>
        </div>
      )}

      {/* Layout */}
      <div className="layout">
        {/* Sidebar - Controller List */}
        <div className="sidebar">
          <ControllerList
            controllers={controllers}
            selectedController={selectedController}
            onSelect={handleSelect}
            onRefresh={fetchControllers}
          />
        </div>

        {/* Main Content */}
        <div className="main">
          {showForm ? (
            <ControllerForm
              templates={templates}
              onSubmit={handleCreate}
              onCancel={() => setShowForm(false)}
              loading={loading}
            />
          ) : editMode && selectedController ? (
            <ControllerForm
              templates={templates}
              controller={selectedController}
              onSubmit={(config) => handleUpdate(selectedController.name, config)}
              onCancel={() => setEditMode(false)}
              loading={loading}
            />
          ) : selectedController ? (
            <ControllerDetails
              controller={selectedController}
              onEdit={handleEdit}
              onDelete={() => handleDelete(selectedController.name)}
              loading={loading}
            />
          ) : (
            <div className="emptyState">
              <div className="emptyIcon">🎮</div>
              <p>Select a controller or create a new one</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ControllerManagementPage;
