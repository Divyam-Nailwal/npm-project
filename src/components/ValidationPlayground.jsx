import React, { useState } from 'react';
import {
  isValidDate,
  isToday,
  isPastDate,
  isFutureDate,
  isSameDay,
  isLeapYear,
  formatDate
} from '@shukracharya/date-helper-js';
import { ShieldCheck, CheckCircle2, XCircle, Sparkles, HelpCircle } from 'lucide-react';
import CodeSnippet from './CodeSnippet.jsx';

export default function ValidationPlayground({ onToast }) {
  const [testInput, setTestInput] = useState('2024-02-29');
  const [yearInput, setYearInput] = useState('2024');

  const [dateA, setDateA] = useState('2025-06-15T09:30');
  const [dateB, setDateB] = useState('2025-06-15T18:45');

  const isValid = isValidDate(testInput);
  let isTodayVal = false;
  let isPastVal = false;
  let isFutureVal = false;

  if (isValid) {
    try {
      const parsed = new Date(testInput);
      isTodayVal = isToday(parsed);
      isPastVal = isPastDate(parsed);
      isFutureVal = isFutureDate(parsed);
    } catch {
      // ignore
    }
  }

  const isLeap = isLeapYear(yearInput);
  const sameDayResult = isSameDay(dateA, dateB);

  const codeExample = `import {
  isValidDate,
  isToday,
  isPastDate,
  isFutureDate,
  isLeapYear,
  isSameDay
} from '@shukracharya/date-helper-js';

// Validation
isValidDate('${testInput}'); // ${isValid}
isToday('${testInput}');     // ${isTodayVal}
isPastDate('${testInput}');  // ${isPastVal}
isFutureDate('${testInput}'); // ${isFutureVal}

// Leap Year
isLeapYear(${yearInput});    // ${isLeap}

// Same Day Comparison
isSameDay('${dateA}', '${dateB}'); // ${sameDayResult}`;

  return (
    <div className="grid-2">
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <ShieldCheck size={20} color="#10b981" />
            <span>Date & Input Validation</span>
          </div>
          <span className="card-badge">Type Safe</span>
        </div>

        <div className="form-group">
          <label className="form-label">Test Input (String, Date, Timestamp)</label>
          <input
            type="text"
            className="input-field input-field-mono"
            value={testInput}
            onChange={(e) => setTestInput(e.target.value)}
            placeholder="Type any date or invalid value..."
          />
          <div className="preset-chips">
            <button className="chip" onClick={() => setTestInput('2024-02-29')}>2024-02-29 (Leap day)</button>
            <button className="chip" onClick={() => setTestInput('2023-02-29')}>2023-02-29 (Invalid)</button>
            <button className="chip" onClick={() => setTestInput(new Date().toISOString().slice(0, 10))}>Today's Date</button>
            <button className="chip" onClick={() => setTestInput('invalid-string')}>"invalid-string"</button>
            <button className="chip" onClick={() => setTestInput('')}>Empty string</button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginTop: 16 }}>
          <div className="stat-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>isValidDate()</span>
            {isValid ? (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: '#10b981', fontWeight: 700, fontSize: '0.85rem' }}>
                <CheckCircle2 size={16} /> true
              </span>
            ) : (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: '#f43f5e', fontWeight: 700, fontSize: '0.85rem' }}>
                <XCircle size={16} /> false
              </span>
            )}
          </div>

          <div className="stat-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>isToday()</span>
            <span style={{ color: isTodayVal ? '#10b981' : '#94a3b8', fontWeight: 700, fontSize: '0.85rem' }}>
              {String(isTodayVal)}
            </span>
          </div>

          <div className="stat-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>isPastDate()</span>
            <span style={{ color: isPastVal ? '#38bdf8' : '#94a3b8', fontWeight: 700, fontSize: '0.85rem' }}>
              {String(isPastVal)}
            </span>
          </div>

          <div className="stat-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>isFutureDate()</span>
            <span style={{ color: isFutureVal ? '#a855f7' : '#94a3b8', fontWeight: 700, fontSize: '0.85rem' }}>
              {String(isFutureVal)}
            </span>
          </div>
        </div>

        <div style={{ marginTop: 24 }}>
          <CodeSnippet code={codeExample} onCopy={onToast} />
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <Sparkles size={20} color="#f59e0b" />
            <span>Leap Year & Same Day Check</span>
          </div>
          <span className="card-badge">Fast & Pure</span>
        </div>

        <div className="form-group">
          <label className="form-label">Leap Year Checker</label>
          <div style={{ display: 'flex', gap: 10 }}>
            <input
              type="text"
              className="input-field input-field-mono"
              value={yearInput}
              onChange={(e) => setYearInput(e.target.value)}
              placeholder="e.g. 2024, 2025, 2000"
            />
            <div style={{ display: 'flex', alignItems: 'center', minWidth: 100, justifyContent: 'center', background: isLeap ? 'rgba(16,185,129,0.15)' : 'rgba(255,255,255,0.05)', borderRadius: 10, border: `1px solid ${isLeap ? '#10b981' : 'var(--border-subtle)'}` }}>
              <span style={{ fontWeight: 700, color: isLeap ? '#10b981' : 'var(--text-muted)' }}>
                {isLeap ? '✓ Leap Year' : 'Regular Year'}
              </span>
            </div>
          </div>
          <div className="preset-chips">
            <button className="chip" onClick={() => setYearInput('2024')}>2024 (Leap)</button>
            <button className="chip" onClick={() => setYearInput('2025')}>2025 (Regular)</button>
            <button className="chip" onClick={() => setYearInput('2000')}>2000 (Century Leap)</button>
            <button className="chip" onClick={() => setYearInput('1900')}>1900 (Century Non-leap)</button>
          </div>
        </div>

        <div className="form-group" style={{ marginTop: 20 }}>
          <label className="form-label">isSameDay() - Ignores Different Time of Day</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <input
              type="datetime-local"
              className="input-field input-field-mono"
              value={dateA}
              onChange={(e) => setDateA(e.target.value)}
            />
            <input
              type="datetime-local"
              className="input-field input-field-mono"
              value={dateB}
              onChange={(e) => setDateB(e.target.value)}
            />
          </div>
          <div className="result-display" style={{ marginTop: 12 }}>
            <div className="result-header">
              <span className="result-title">isSameDay Result</span>
            </div>
            <div className="result-value" style={{ color: sameDayResult ? '#10b981' : '#f43f5e' }}>
              {sameDayResult ? '✓ Same Calendar Day' : '✗ Different Calendar Days'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
