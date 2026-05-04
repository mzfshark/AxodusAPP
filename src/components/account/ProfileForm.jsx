// src/components/account/ProfileForm.jsx
import React, { useEffect, useState } from "react";
import "@/styles/Global.css";
import { useAppKitAccount } from "@reown/appkit/react";

const LS_KEY = "axodus.profile";

export default function ProfileForm() {
  const { address } = useAppKitAccount();
  const [form, setForm] = useState({
    name: "",
    email: "",
    telegram: "",
    locale: "",
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        setForm((prev) => ({ ...prev, ...data }));
      }
    } catch {
      // Ignore invalid local profile cache.
    }
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    setSaved(false);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem(LS_KEY, JSON.stringify(form));
    setSaved(true);
  };

  return (
    <form onSubmit={onSubmit} className="card">
      <h2 style={{ marginTop: 0 }}>Perfil do Usuário</h2>
      <p style={{ marginTop: 0, color: "var(--text-muted)" }}>
        Wallet vinculada: {address ? `${address.slice(0,6)}…${address.slice(-4)}` : "(desconectada)"}
      </p>

      <div className="formRow">
        <label>Nome</label>
        <input name="name" value={form.name} onChange={onChange} placeholder="Seu nome" />
      </div>

      <div className="formRow">
        <label>Email</label>
        <input name="email" value={form.email} onChange={onChange} placeholder="voce@exemplo.com" />
      </div>

      <div className="formRow">
        <label>Telegram</label>
        <input name="telegram" value={form.telegram} onChange={onChange} placeholder="@seu_usuario" />
      </div>

      <div className="formRow">
        <label>Locale</label>
        <input name="locale" value={form.locale} onChange={onChange} placeholder="pt-BR" />
      </div>

      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <button type="submit" className="primaryButton">Salvar</button>
        {saved && <span style={{ color: "var(--success)" }}>Salvo</span>}
      </div>
    </form>
  );
}
