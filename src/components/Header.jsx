import React, { useState, useEffect } from 'react';
import { getCurrentDate, getCurrentTime } from '@shukracharya/date-helper-js';
import { Calendar, Clock, Copy, Check, ExternalLink } from 'lucide-react';

export default function Header({ onToast }) {
  const [copied, setCopied] = useState(false);
  const [liveTime, setLiveTime] = useState('');
  const [liveDate, setLiveDate] = useState('');

  const installCmd = 'npm i @shukracharya/date-helper-js';

  useEffect(() => {
    const updateTick = () => {
      setLiveTime(getCurrentTime('HH:mm:ss'));
      setLiveDate(getCurrentDate('YYYY-MM-DD'));
    };
    updateTick();
    const interval = setInterval(updateTick, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyInstall = () => {
    navigator.clipboard.writeText(installCmd);
    setCopied(true);
    if (onToast) onToast('Copied installation command!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="app-header">
      <div className="header-top">
        <div className="header-brand">
          <div className="header-logo">
            <Calendar size={24} color="#38bdf8" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <h1>date-helper-js</h1>
              <span className="pkg-badge">v1.0.0</span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Interactive playground for zero-dependency modern date utilities
            </p>
          </div>
        </div>

        <div className="header-actions">
          <div className="live-clock-badge" title="Live clock computed via getCurrentTime()">
            <span className="live-dot"></span>
            <Clock size={14} />
            <span>{liveDate} {liveTime}</span>
          </div>

          <button className="install-command" onClick={handleCopyInstall} title="Click to copy install command">
            <span>{installCmd}</span>
            {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
          </button>

          <a
            href="https://github.com/Divyam-Nailwal/date-helper-js"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-link"
          >
            <span>GitHub</span>
            <ExternalLink size={13} />
          </a>
        </div>
      </div>
    </header>
  );
}
