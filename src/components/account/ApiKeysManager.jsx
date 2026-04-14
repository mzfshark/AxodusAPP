// src/components/account/ApiKeysManager.jsx
import React, { useEffect, useMemo, useState } from "react";
import "@styles/Global.module.css";
import { addCredential, listAccounts, listConnectors } from "../../services/api/hummingbotClient";

export default function ApiKeysManager() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [connectors, setConnectors] = useState([]);

  const [mode, setMode] = useState("simple"); // simple | json
  const [simpleCreds, setSimpleCreds] = useState({ api_key: "", api_secret: "" });
  const [showKey, setShowKey] = useState(false);
  const [showSecret, setShowSecret] = useState(false);

  const [form, setForm] = useState({
    account_name: "master_account",
    connector_name: "",
    credentials_json: "{\n  \"api_key\": \"\",\n  \"api_secret\": \"\"\n}",
  });

  const parsedCredentials = useMemo(() => {
    try { return JSON.parse(form.credentials_json || "{}"); }
    catch { return null; }
  }, [form.credentials_json]);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [acc, conns] = await Promise.all([
        listAccounts().catch(() => []),
        listConnectors().catch(() => []),
      ]);
      setAccounts(Array.isArray(acc) ? acc : []);
      setConnectors(conns || []);
    } catch (err) {
      setError(err.message || "Falha ao carregar dados");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let payloadCreds = null;
    if (mode === "simple") {
      if (!simpleCreds.api_key || !simpleCreds.api_secret) {
        setError("Preencha API key e API secret.");
        return;
      }
      payloadCreds = { api_key: simpleCreds.api_key, api_secret: simpleCreds.api_secret };
    } else {
      if (!parsedCredentials) {
        setError("JSON de credenciais inválido");
        return;
      }
      payloadCreds = parsedCredentials;
    }
    setLoading(true);
    setError(null);
    try {
      await addCredential({
        account_name: form.account_name,
        connector_name: form.connector_name,
        credentials: payloadCreds,
      });
      await loadData();
      if (mode === "simple") setSimpleCreds({ api_key: "", api_secret: "" });
    } catch (err) {
      setError(err.message || "Falha ao salvar credenciais");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2 style={{ marginTop: 0 }}>Integrações (API Keys)</h2>
      <p style={{ color: "var(--text-muted)", marginTop: 0 }}>
        Adicione/edite credenciais para CEX/DEX/Gateway. O formato das credenciais depende do conector.
      </p>

      <form onSubmit={onSubmit} style={{ marginTop: 12 }}>
        <div style={{ display: "flex", gap: 12, marginBottom: 8 }}>
          <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <input
              type="radio"
              name="mode"
              value="simple"
              checked={mode === "simple"}
              onChange={() => setMode("simple")}
            />
            Modo simples
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <input
              type="radio"
              name="mode"
              value="json"
              checked={mode === "json"}
              onChange={() => setMode("json")}
            />
            JSON avançado
          </label>
        </div>

        <div className="formRow">
          <label>Account name</label>
          <select name="account_name" value={form.account_name} onChange={onChange}>
            {accounts.length === 0 && <option value="master_account">master_account</option>}
            {accounts.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>

        <div className="formRow">
          <label>Connector</label>
          <select name="connector_name" value={form.connector_name} onChange={onChange}>
            <option value="">Selecione...</option>
            {connectors.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {mode === "simple" ? (
          <>
            <div className="formRow">
              <label>API Key</label>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input
                  type={showKey ? "text" : "password"}
                  value={simpleCreds.api_key}
                  onChange={(e) => setSimpleCreds((s) => ({ ...s, api_key: e.target.value }))}
                  placeholder="Insira sua API Key"
                  autoComplete="off"
                />
                <button type="button" className="secondaryButton" onClick={() => setShowKey((v) => !v)}>
                  {showKey ? "Ocultar" : "Mostrar"}
                </button>
              </div>
            </div>
            <div className="formRow">
              <label>API Secret</label>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input
                  type={showSecret ? "text" : "password"}
                  value={simpleCreds.api_secret}
                  onChange={(e) => setSimpleCreds((s) => ({ ...s, api_secret: e.target.value }))}
                  placeholder="Insira seu API Secret"
                  autoComplete="off"
                />
                <button type="button" className="secondaryButton" onClick={() => setShowSecret((v) => !v)}>
                  {showSecret ? "Ocultar" : "Mostrar"}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="formRow">
            <label>Credentials (JSON)</label>
            <textarea
              name="credentials_json"
              rows={8}
              value={form.credentials_json}
              onChange={onChange}
              placeholder='{"api_key":"...","api_secret":"..."}'
            />
          </div>
        )}

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button type="submit" className="primaryButton" disabled={loading}>Salvar</button>
          {error && <span style={{ color: "var(--error)" }}>{error}</span>}
          {!error && mode === "json" && parsedCredentials == null && (
            <span style={{ color: "var(--warning)" }}>JSON inválido</span>
          )}
        </div>
      </form>

      <div style={{ marginTop: 24 }}>
        <h3 style={{ marginTop: 0 }}>Contas</h3>
        {loading && <p>Carregando...</p>}
        {!loading && accounts.length === 0 && (
          <p style={{ color: "var(--text-muted)" }}>Nenhuma conta encontrada.</p>
        )}
        {!loading && accounts.length > 0 && (
          <div className="tableResponsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Account</th>
                  <th>Tipo</th>
                  <th>Conector</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((acc, idx) => (
                  <tr key={typeof acc === 'string' ? acc : (acc.id || acc.name || idx)}>
                    <td>{typeof acc === 'string' ? acc : (acc.name || acc.account_name || '-')}</td>
                    <td>{typeof acc === 'string' ? '-' : (acc.type || acc.account_type || '-')}</td>
                    <td>{typeof acc === 'string' ? '-' : (acc.connector || acc.connector_name || '-')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
