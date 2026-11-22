import React, { useState } from 'react';
import { isBefore, isAfter, isBetween, formatDate } from '@shukracharya/date-helper-js';
import { GitCompare, ArrowRight, Sparkles } from 'lucide-react';
import CodeSnippet from './CodeSnippet.jsx';

export default function ComparisonPlayground({ onToast }) {
  const [dateToCheck, setDateToCheck] = useState('2025-06-15');
  const [rangeStart, setRangeStart] = useState('2025-01-01');
  const [rangeEnd, setRangeEnd] = useState('2025-12-31');
  const [isInclusive, setIsInclusive] = useState(false);

  let beforeStart = false;
  let afterEnd = false;
  let betweenRange = false;
  let errorMsg = null;

  try {
    const target = new Date(dateToCheck);
    const start = new Date(rangeStart);
    const end = new Date(rangeEnd);

    beforeStart = isBefore(target, start);
    afterEnd = isAfter(target, end);
    betweenRange = isBetween(target, start, end, isInclusive);
  } catch (err) {
    errorMsg = err.message || 'Comparison error';
  }

  const codeExample = `import { isBefore, isAfter, isBetween } from '@shukracharya/date-helper-js';

const target = '${dateToCheck}';
const start = '${rangeStart}';
const end = '${rangeEnd}';

// Chronological checks
isBefore(target, start); // ${beforeStart}
isAfter(target, end);   // ${afterEnd}

// Range check (inclusive = ${isInclusive})
isBetween(target, start, end, ${isInclusive}); // ${betweenRange}`;

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">
          <GitCompare size={20} color="#38bdf8" />
          <span>Chronological Comparisons & Range Checking</span>
        </div>
        <span className="card-badge">isBefore / isAfter / isBetween</span>
      </div>

      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 20 }}>
        Reliably compare chronological ordering and evaluate whether a date falls strictly or inclusively within a start and end boundary.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
        <div className="form-group">
          <label className="form-label">Range Start</label>
          <input
            type="date"
            className="input-field input-field-mono"
            value={rangeStart}
            onChange={(e) => setRangeStart(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label" style={{ color: 'var(--cyan)' }}>
            Target Date to Test
          </label>
          <input
            type="date"
            className="input-field input-field-mono"
            value={dateToCheck}
            onChange={(e) => setDateToCheck(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Range End</label>
          <input
            type="date"
            className="input-field input-field-mono"
            value={rangeEnd}
            onChange={(e) => setRangeEnd(e.target.value)}
          />
        </div>
      </div>

      <div style={{ margin: '14px 0' }}>
        <div
          className="toggle-wrapper"
          onClick={() => setIsInclusive(!isInclusive)}
        >
          <div className={`toggle-slider ${isInclusive ? 'active' : ''}`}>
            <div className="toggle-knob" />
          </div>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Inclusive boundary check (<code>inclusive = {String(isInclusive)}</code>)
          </span>
        </div>
      </div>

      {errorMsg ? (
        <div style={{ color: 'var(--rose)', marginTop: 12 }}>{errorMsg}</div>
      ) : (
        <div className="grid-3" style={{ marginTop: 16 }}>
          <div className="stat-card">
            <div className="stat-label">isBefore(target, start)</div>
            <div className="stat-number" style={{ color: beforeStart ? '#f43f5e' : '#94a3b8' }}>
              {String(beforeStart)}
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
              {beforeStart ? 'Target precedes start' : 'Not before start'}
            </span>
          </div>

          <div className="stat-card" style={{ borderColor: betweenRange ? 'rgba(16,185,129,0.4)' : 'var(--border-subtle)' }}>
            <div className="stat-label" style={{ color: betweenRange ? '#10b981' : 'var(--text-muted)' }}>
              isBetween(target, start, end)
            </div>
            <div className="stat-number" style={{ color: betweenRange ? '#10b981' : '#f43f5e' }}>
              {String(betweenRange)}
            </div>
            <span style={{ fontSize: '0.72rem', color: betweenRange ? '#34d399' : 'var(--text-dim)' }}>
              {betweenRange ? '✓ Target is within range' : '✗ Outside boundary'}
            </span>
          </div>

          <div className="stat-card">
            <div className="stat-label">isAfter(target, end)</div>
            <div className="stat-number" style={{ color: afterEnd ? '#f43f5e' : '#94a3b8' }}>
              {String(afterEnd)}
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
              {afterEnd ? 'Target succeeds end' : 'Not after end'}
            </span>
          </div>
        </div>
      )}

      <div style={{ marginTop: 24 }}>
        <CodeSnippet code={codeExample} onCopy={onToast} />
      </div>
    </div>
  );
}
