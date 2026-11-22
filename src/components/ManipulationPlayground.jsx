import React, { useState } from 'react';
import {
  addDays,
  subtractDays,
  addHours,
  addMinutes,
  addMonths,
  addYears,
  formatDate
} from '@shukracharya/date-helper-js';
import { Sliders, Plus, Minus, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import CodeSnippet from './CodeSnippet.jsx';

export default function ManipulationPlayground({ onToast }) {
  const [baseDate, setBaseDate] = useState('2025-01-31T12:00');
  const [unit, setUnit] = useState('months');
  const [amount, setAmount] = useState(1);
  const [operation, setOperation] = useState('add');

  // Showcase presets
  const handlePreset = (type) => {
    if (type === 'month-end') {
      setBaseDate('2025-01-31T12:00');
      setUnit('months');
      setAmount(1);
      setOperation('add');
    } else if (type === 'leap-year') {
      setBaseDate('2024-02-29T12:00');
      setUnit('years');
      setAmount(1);
      setOperation('add');
    } else if (type === 'next-week') {
      const now = new Date();
      const pad = (n) => String(n).padStart(2, '0');
      setBaseDate(`${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T12:00`);
      setUnit('days');
      setAmount(7);
      setOperation('add');
    }
  };

  let resultDate = null;
  let formattedResult = '';
  let errorMsg = null;
  let fnName = 'addDays';

  try {
    const input = new Date(baseDate);
    const numericAmount = Number(amount) || 0;
    const finalAmount = operation === 'subtract' ? -numericAmount : numericAmount;

    switch (unit) {
      case 'days':
        fnName = operation === 'subtract' ? 'subtractDays' : 'addDays';
        resultDate = operation === 'subtract' ? subtractDays(input, numericAmount) : addDays(input, numericAmount);
        break;
      case 'hours':
        fnName = 'addHours';
        resultDate = addHours(input, finalAmount);
        break;
      case 'minutes':
        fnName = 'addMinutes';
        resultDate = addMinutes(input, finalAmount);
        break;
      case 'months':
        fnName = 'addMonths';
        resultDate = addMonths(input, finalAmount);
        break;
      case 'years':
        fnName = 'addYears';
        resultDate = addYears(input, finalAmount);
        break;
      default:
        resultDate = addDays(input, finalAmount);
    }

    formattedResult = formatDate(resultDate, 'YYYY-MM-DD HH:mm:ss');
  } catch (err) {
    errorMsg = err.message || 'Operation failed';
  }

  const codeExample = `import { ${fnName}, formatDate } from '@shukracharya/date-helper-js';

const initial = new Date('${baseDate}');
// Manipulation is completely IMMUTABLE (initial date is never modified)
const updated = ${fnName}(initial, ${unit === 'days' ? amount : operation === 'subtract' ? -amount : amount});

console.log(formatDate(updated, 'YYYY-MM-DD HH:mm:ss'));
// Result: "${formattedResult}"`;

  return (
    <div className="grid-2">
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <Sliders size={20} color="#a855f7" />
            <span>Immutable Date Manipulation</span>
          </div>
          <span className="card-badge">Immutable</span>
        </div>

        <div className="preset-chips" style={{ marginBottom: 16 }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', alignSelf: 'center' }}>Edge Case Demos:</span>
          <button className="chip" onClick={() => handlePreset('month-end')}>
            Jan 31 + 1 Month (Clamping)
          </button>
          <button className="chip" onClick={() => handlePreset('leap-year')}>
            Feb 29 2024 + 1 Year (Leap Clamping)
          </button>
          <button className="chip" onClick={() => handlePreset('next-week')}>
            +7 Days
          </button>
        </div>

        <div className="form-group">
          <label className="form-label">Initial Date</label>
          <input
            type="datetime-local"
            className="input-field input-field-mono"
            value={baseDate}
            onChange={(e) => setBaseDate(e.target.value)}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
          <div className="form-group">
            <label className="form-label">Action</label>
            <select
              className="input-field"
              value={operation}
              onChange={(e) => setOperation(e.target.value)}
            >
              <option value="add">Add (+)</option>
              <option value="subtract">Subtract (-)</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Amount</label>
            <input
              type="number"
              className="input-field input-field-mono"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Unit</label>
            <select
              className="input-field"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            >
              <option value="days">Days</option>
              <option value="hours">Hours</option>
              <option value="minutes">Minutes</option>
              <option value="months">Months (Clamped)</option>
              <option value="years">Years (Leap-safe)</option>
            </select>
          </div>
        </div>

        <div className="result-display">
          <div className="result-header">
            <span className="result-title">Resulting Date</span>
            <Sparkles size={14} color="#a855f7" />
          </div>
          {errorMsg ? (
            <div style={{ color: 'var(--rose)' }}>{errorMsg}</div>
          ) : (
            <div className="result-value" style={{ color: '#c084fc' }}>
              {formattedResult}
            </div>
          )}
        </div>

        <CodeSnippet code={codeExample} onCopy={onToast} />
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <ShieldCheck size={20} color="#10b981" />
            <span>Robust Edge-Case Guarantees</span>
          </div>
          <span className="card-badge">Zero Mutation</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: 'rgba(15, 23, 42, 0.5)', padding: 14, borderRadius: 10, border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ fontSize: '0.88rem', color: 'var(--cyan)', marginBottom: 4 }}>
              1. End-of-Month Clamping (addMonths)
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Standard JavaScript <code>Date.setMonth()</code> overflows February into March when adding a month to Jan 31.
              <code>date-helper-js</code> detects shorter target months and clamps automatically to the last valid day (Feb 28 in standard years, Feb 29 in leap years).
            </p>
          </div>

          <div style={{ background: 'rgba(15, 23, 42, 0.5)', padding: 14, borderRadius: 10, border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ fontSize: '0.88rem', color: '#a5b4fc', marginBottom: 4 }}>
              2. Leap-Day Year Clamping (addYears)
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              When starting on February 29 of a leap year (e.g. 2024-02-29) and adding 1 year, the library gracefully adjusts to February 28, 2025 rather than jumping into March 1.
            </p>
          </div>

          <div style={{ background: 'rgba(15, 23, 42, 0.5)', padding: 14, borderRadius: 10, border: '1px solid var(--border-subtle)' }}>
            <h4 style={{ fontSize: '0.88rem', color: '#34d399', marginBottom: 4 }}>
              3. Pure Immutability
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Every manipulation function clones the input date and returns an entirely new <code>Date</code> instance. Your original state variables will never be mutated.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
