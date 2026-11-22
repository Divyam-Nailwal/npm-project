import React, { useState } from 'react';
import {
  getDateDifference,
  daysBetween,
  hoursBetween,
  minutesBetween,
  secondsBetween,
  formatDate
} from '@shukracharya/date-helper-js';
import { Clock, ArrowRight, Sparkles, Layers } from 'lucide-react';
import CodeSnippet from './CodeSnippet.jsx';

export default function DifferencePlayground({ onToast }) {
  const [startDate, setStartDate] = useState('2025-01-01T00:00');
  const [endDate, setEndDate] = useState('2025-01-10T14:30');
  const [isAbsolute, setIsAbsolute] = useState(false);

  // Presets
  const setPreset = (type) => {
    const now = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    const toLocalISO = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;

    if (type === 'newyear') {
      const nextYear = now.getFullYear() + 1;
      setStartDate(toLocalISO(now));
      setEndDate(`${nextYear}-01-01T00:00`);
    } else if (type === 'lastweek') {
      const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      setStartDate(toLocalISO(lastWeek));
      setEndDate(toLocalISO(now));
    } else if (type === 'weekend') {
      setStartDate(toLocalISO(now));
      const in48h = new Date(now.getTime() + 48 * 60 * 60 * 1000);
      setEndDate(toLocalISO(in48h));
    }
  };

  let diff = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalDays: 0,
    totalHours: 0,
    totalMinutes: 0,
    totalSeconds: 0,
    isNegative: false
  };

  let days = 0;
  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  let errorMsg = null;

  try {
    const start = new Date(startDate);
    const end = new Date(endDate);
    diff = getDateDifference(start, end);
    days = daysBetween(start, end, { absolute: isAbsolute });
    hours = hoursBetween(start, end, { absolute: isAbsolute });
    minutes = minutesBetween(start, end, { absolute: isAbsolute });
    seconds = secondsBetween(start, end, { absolute: isAbsolute });
  } catch (err) {
    errorMsg = err.message || 'Calculation error';
  }

  const codeExample = `import {
  getDateDifference,
  daysBetween,
  hoursBetween
} from '@shukracharya/date-helper-js';

const start = '${startDate}';
const end = '${endDate}';

// Detailed breakdown
const diff = getDateDifference(start, end);
/*
{
  days: ${diff.days},
  hours: ${diff.hours},
  minutes: ${diff.minutes},
  seconds: ${diff.seconds},
  totalDays: ${diff.totalDays},
  isNegative: ${diff.isNegative}
}
*/

// Unit intervals
const days = daysBetween(start, end, { absolute: ${isAbsolute} }); // ${days}`;

  return (
    <div>
      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-header">
          <div className="card-title">
            <Clock size={20} color="#38bdf8" />
            <span>Time Spans & Date Difference Calculator</span>
          </div>
          <span className="card-badge">getDateDifference()</span>
        </div>

        <div className="preset-chips" style={{ marginBottom: 16 }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', alignSelf: 'center' }}>Presets:</span>
          <button className="chip" onClick={() => setPreset('newyear')}>Now → Next New Year</button>
          <button className="chip" onClick={() => setPreset('lastweek')}>Last 7 Days</button>
          <button className="chip" onClick={() => setPreset('weekend')}>Next 48 Hours</button>
        </div>

        <div className="grid-2">
          <div className="form-group">
            <label className="form-label">Start Date & Time</label>
            <input
              type="datetime-local"
              className="input-field input-field-mono"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">End Date & Time</label>
            <input
              type="datetime-local"
              className="input-field input-field-mono"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
          <div
            className="toggle-wrapper"
            onClick={() => setIsAbsolute(!isAbsolute)}
          >
            <div className={`toggle-slider ${isAbsolute ? 'active' : ''}`}>
              <div className="toggle-knob" />
            </div>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Absolute value mode ({isAbsolute ? 'Enabled' : 'Disabled'})
            </span>
          </div>

          {diff.isNegative && (
            <span style={{ fontSize: '0.78rem', color: '#f43f5e', background: 'rgba(244,63,94,0.1)', padding: '3px 8px', borderRadius: 6 }}>
              End date is before Start date (Negative span)
            </span>
          )}
        </div>

        {errorMsg ? (
          <div style={{ color: 'var(--rose)', marginTop: 16 }}>{errorMsg}</div>
        ) : (
          <>
            <div style={{ marginTop: 24, marginBottom: 8, fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Decomposed Breakdown (Remaining Components)
            </div>
            <div className="grid-4">
              <div className="stat-card">
                <div className="stat-label">Days</div>
                <div className="stat-number" style={{ color: '#38bdf8' }}>{diff.days}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Hours</div>
                <div className="stat-number" style={{ color: '#818cf8' }}>{diff.hours}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Minutes</div>
                <div className="stat-number" style={{ color: '#c084fc' }}>{diff.minutes}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Seconds</div>
                <div className="stat-number" style={{ color: '#34d399' }}>{diff.seconds}</div>
              </div>
            </div>

            <div style={{ marginTop: 20, marginBottom: 8, fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Total Cumulative Intervals
            </div>
            <div className="grid-4">
              <div className="stat-card">
                <div className="stat-label">Total Days (daysBetween)</div>
                <div className="stat-number">{days}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Total Hours (hoursBetween)</div>
                <div className="stat-number">{hours}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Total Minutes (minutesBetween)</div>
                <div className="stat-number">{minutes}</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Total Seconds (secondsBetween)</div>
                <div className="stat-number">{seconds}</div>
              </div>
            </div>
          </>
        )}

        <CodeSnippet code={codeExample} onCopy={onToast} />
      </div>
    </div>
  );
}
