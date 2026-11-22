import React, { useState } from 'react';
import { formatDate, getCurrentDate, getCurrentTime } from '@shukracharya/date-helper-js';
import { Calendar, RefreshCw, Sparkles, HelpCircle } from 'lucide-react';
import CodeSnippet from './CodeSnippet.jsx';

export default function FormatPlayground({ onToast }) {
  const [selectedDate, setSelectedDate] = useState(() => {
    const now = new Date();
    // format as YYYY-MM-DDTHH:mm
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${mins}`;
  });

  const [pattern, setPattern] = useState('YYYY-MM-DD HH:mm:ss');

  const presetPatterns = [
    'YYYY-MM-DD',
    'DD/MM/YYYY',
    'MM/DD/YYYY',
    'YYYY-MM-DD HH:mm:ss',
    'DD-MM-YYYY HH:mm',
    'HH:mm:ss',
    'YY/MM/DD'
  ];

  let formattedResult = '';
  let errorMsg = null;
  try {
    const d = new Date(selectedDate);
    formattedResult = formatDate(d, pattern);
  } catch (err) {
    errorMsg = err.message || 'Formatting failed';
  }

  const handleSetNow = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    setSelectedDate(`${year}-${month}-${day}T${hours}:${mins}`);
  };

  const codeExample = `import { formatDate } from '@shukracharya/date-helper-js';

const date = new Date('${selectedDate}');
const pattern = '${pattern}';

const result = formatDate(date, pattern);
// Output: "${formattedResult}"`;

  return (
    <div className="grid-2">
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <Calendar size={20} color="#38bdf8" />
            <span>Date & Time Formatting</span>
          </div>
          <span className="card-badge">formatDate()</span>
        </div>

        <div className="form-group">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label className="form-label">Input Date & Time</label>
            <button
              onClick={handleSetNow}
              className="btn-secondary"
              style={{ padding: '3px 8px', fontSize: '0.72rem' }}
            >
              <RefreshCw size={12} />
              <span>Use Current Time</span>
            </button>
          </div>
          <input
            type="datetime-local"
            className="input-field input-field-mono"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Format Pattern (Token based)</label>
          <input
            type="text"
            className="input-field input-field-mono"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            placeholder="e.g. YYYY-MM-DD HH:mm:ss"
          />
          <div className="preset-chips">
            {presetPatterns.map((p) => (
              <button
                key={p}
                className={`chip ${pattern === p ? 'active' : ''}`}
                onClick={() => setPattern(p)}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="result-display">
          <div className="result-header">
            <span className="result-title">Formatted Result</span>
            <Sparkles size={14} color="#38bdf8" />
          </div>
          {errorMsg ? (
            <div style={{ color: 'var(--rose)', fontSize: '0.9rem' }}>{errorMsg}</div>
          ) : (
            <div className="result-value">{formattedResult}</div>
          )}
        </div>

        <CodeSnippet code={codeExample} onCopy={onToast} />
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <HelpCircle size={20} color="#818cf8" />
            <span>Token Reference & Helper Functions</span>
          </div>
          <span className="card-badge">Zero Dependencies</span>
        </div>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 16 }}>
          Tokens are case-sensitive and match standard formatting conventions. Any non-token characters (such as hyphens, slashes, colons, or spaces) are preserved verbatim.
        </p>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-subtle)', textAlign: 'left', color: 'var(--cyan)' }}>
              <th style={{ padding: '8px 4px' }}>Token</th>
              <th style={{ padding: '8px 4px' }}>Description</th>
              <th style={{ padding: '8px 4px' }}>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <td style={{ padding: '8px 4px', color: '#f1f5f9' }}>YYYY</td>
              <td style={{ padding: '8px 4px', color: 'var(--text-muted)' }}>4-digit Year</td>
              <td style={{ padding: '8px 4px', color: '#a5b4fc' }}>{new Date().getFullYear()}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <td style={{ padding: '8px 4px', color: '#f1f5f9' }}>YY</td>
              <td style={{ padding: '8px 4px', color: 'var(--text-muted)' }}>2-digit Year</td>
              <td style={{ padding: '8px 4px', color: '#a5b4fc' }}>{String(new Date().getFullYear()).slice(-2)}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <td style={{ padding: '8px 4px', color: '#f1f5f9' }}>MM</td>
              <td style={{ padding: '8px 4px', color: 'var(--text-muted)' }}>2-digit Month (01-12)</td>
              <td style={{ padding: '8px 4px', color: '#a5b4fc' }}>{String(new Date().getMonth() + 1).padStart(2, '0')}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <td style={{ padding: '8px 4px', color: '#f1f5f9' }}>DD</td>
              <td style={{ padding: '8px 4px', color: 'var(--text-muted)' }}>2-digit Day (01-31)</td>
              <td style={{ padding: '8px 4px', color: '#a5b4fc' }}>{String(new Date().getDate()).padStart(2, '0')}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <td style={{ padding: '8px 4px', color: '#f1f5f9' }}>HH</td>
              <td style={{ padding: '8px 4px', color: 'var(--text-muted)' }}>24-hour clock (00-23)</td>
              <td style={{ padding: '8px 4px', color: '#a5b4fc' }}>{String(new Date().getHours()).padStart(2, '0')}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <td style={{ padding: '8px 4px', color: '#f1f5f9' }}>mm</td>
              <td style={{ padding: '8px 4px', color: 'var(--text-muted)' }}>Minutes (00-59)</td>
              <td style={{ padding: '8px 4px', color: '#a5b4fc' }}>{String(new Date().getMinutes()).padStart(2, '0')}</td>
            </tr>
            <tr>
              <td style={{ padding: '8px 4px', color: '#f1f5f9' }}>ss</td>
              <td style={{ padding: '8px 4px', color: 'var(--text-muted)' }}>Seconds (00-59)</td>
              <td style={{ padding: '8px 4px', color: '#a5b4fc' }}>{String(new Date().getSeconds()).padStart(2, '0')}</td>
            </tr>
          </tbody>
        </table>

        <div style={{ marginTop: 20 }}>
          <h4 style={{ fontSize: '0.85rem', color: 'var(--text-main)', marginBottom: 8 }}>
            Direct Helper Convenience Shortcuts:
          </h4>
          <CodeSnippet
            code={`// Current date formatted (defaults to 'YYYY-MM-DD')
const today = getCurrentDate(); // "${getCurrentDate()}"

// Current time formatted (defaults to 'HH:mm:ss')
const nowTime = getCurrentTime(); // "${getCurrentTime()}"`}
            label="Convenience Helpers"
            onCopy={onToast}
          />
        </div>
      </div>
    </div>
  );
}
