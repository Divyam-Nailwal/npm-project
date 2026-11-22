import React, { useState } from 'react';
import Header from './components/Header.jsx';
import Toast from './components/Toast.jsx';
import FormatPlayground from './components/FormatPlayground.jsx';
import DifferencePlayground from './components/DifferencePlayground.jsx';
import ManipulationPlayground from './components/ManipulationPlayground.jsx';
import RelativePlayground from './components/RelativePlayground.jsx';
import ValidationPlayground from './components/ValidationPlayground.jsx';
import ComparisonPlayground from './components/ComparisonPlayground.jsx';
import CodeSnippet from './components/CodeSnippet.jsx';

import {
  Calendar,
  Clock,
  Sliders,
  ShieldCheck,
  GitCompare,
  BookOpen,
  Sparkles,
  Terminal,
  Cpu,
  Feather
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2800);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Sparkles },
    { id: 'format', label: 'Format & Tokens', icon: Calendar },
    { id: 'difference', label: 'Differences & Spans', icon: Clock },
    { id: 'manipulation', label: 'Manipulation', icon: Sliders },
    { id: 'relative', label: 'Relative Time', icon: Feather },
    { id: 'validation', label: 'Validation & Leap Year', icon: ShieldCheck },
    { id: 'comparison', label: 'Comparisons', icon: GitCompare },
    { id: 'docs', label: 'Full API Reference', icon: BookOpen }
  ];

  return (
    <div className="app-container">
      <Header onToast={addToast} />

      <nav className="tabs-navigation">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>

      <main style={{ flex: 1 }}>
        {activeTab === 'overview' && (
          <div>
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(56,189,248,0.12))',
                border: '1px solid rgba(99,102,241,0.3)',
                borderRadius: 16,
                padding: '32px 24px',
                marginBottom: 24,
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{ maxWidth: 720 }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 999, background: 'rgba(56,189,248,0.15)', border: '1px solid rgba(56,189,248,0.3)', color: 'var(--cyan)', fontSize: '0.78rem', fontWeight: 600, marginBottom: 12 }}>
                  <Sparkles size={13} />
                  <span>Production Ready • ESM Zero-Dependency</span>
                </div>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 12, lineHeight: 1.25 }}>
                  The Lightweight, Reliable Date Engine for Modern JavaScript
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: 20 }}>
                  <code>@shukracharya/date-helper-js</code> delivers formatting, elapsed spans, immutable calculations, relative time strings, and validation in a clean package without heavy third-party baggage.
                </p>

                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <button className="btn-primary" onClick={() => setActiveTab('format')}>
                    <Calendar size={15} />
                    <span>Explore Formatting</span>
                  </button>
                  <button className="btn-secondary" onClick={() => setActiveTab('difference')}>
                    <Clock size={15} />
                    <span>Calculate Differences</span>
                  </button>
                  <button className="btn-secondary" onClick={() => setActiveTab('manipulation')}>
                    <Sliders size={15} />
                    <span>Test Clamping Edge Cases</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="grid-3" style={{ marginBottom: 24 }}>
              <div className="card">
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{ padding: 8, background: 'rgba(56,189,248,0.1)', borderRadius: 8, color: '#38bdf8' }}>
                    <Feather size={20} />
                  </div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>0 Dependencies</h3>
                </div>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                  Pure modern JavaScript built exclusively with ES Modules. No external runtime overhead or security vulnerabilities.
                </p>
              </div>

              <div className="card">
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{ padding: 8, background: 'rgba(168,85,247,0.1)', borderRadius: 8, color: '#a855f7' }}>
                    <ShieldCheck size={20} />
                  </div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>100% Immutable</h3>
                </div>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                  Functions never mutate incoming Date objects. Every manipulation returns a pristine new instance.
                </p>
              </div>

              <div className="card">
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{ padding: 8, background: 'rgba(16,185,129,0.1)', borderRadius: 8, color: '#10b981' }}>
                    <Cpu size={20} />
                  </div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>Edge-Case Safe</h3>
                </div>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                  Handles leap years, month-end clamping (Jan 31 + 1 month = Feb 28), daylight savings, and unparseable inputs reliably.
                </p>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <div className="card-title">
                  <Terminal size={18} color="#38bdf8" />
                  <span>Quick Setup & Imports</span>
                </div>
                <span className="card-badge">ESM</span>
              </div>
              <CodeSnippet
                code={`import {
  formatDate,
  daysBetween,
  getDateDifference,
  addDays,
  addMonths,
  timeAgo,
  isValidDate,
  isBetween
} from '@shukracharya/date-helper-js';

// 1. Format
console.log(formatDate(new Date(), 'YYYY-MM-DD HH:mm:ss'));

// 2. Clamped month addition (Jan 31 -> Feb 28)
const nextMonth = addMonths(new Date('2025-01-31'), 1);

// 3. Difference
console.log(daysBetween('2025-01-01', '2025-01-10')); // 9

// 4. Relative time
console.log(timeAgo(new Date(Date.now() - 300000))); // '5 minutes ago'`}
                label="Full Usage Preview"
                onCopy={addToast}
              />
            </div>
          </div>
        )}

        {activeTab === 'format' && <FormatPlayground onToast={addToast} />}
        {activeTab === 'difference' && <DifferencePlayground onToast={addToast} />}
        {activeTab === 'manipulation' && <ManipulationPlayground onToast={addToast} />}
        {activeTab === 'relative' && <RelativePlayground onToast={addToast} />}
        {activeTab === 'validation' && <ValidationPlayground onToast={addToast} />}
        {activeTab === 'comparison' && <ComparisonPlayground onToast={addToast} />}

        {activeTab === 'docs' && (
          <div className="card">
            <div className="card-header">
              <div className="card-title">
                <BookOpen size={20} color="#38bdf8" />
                <span>Complete API Reference Specification</span>
              </div>
              <span className="card-badge">@shukracharya/date-helper-js</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div>
                <h4 style={{ color: 'var(--cyan)', fontSize: '0.95rem', marginBottom: 6 }}>1. Date Formatting</h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                  <li><code>formatDate(date, pattern = 'YYYY-MM-DD')</code>: Formats date instance, ISO string, or timestamp using tokens (YYYY, YY, MM, DD, HH, mm, ss).</li>
                  <li><code>getCurrentDate(pattern = 'YYYY-MM-DD')</code>: Returns currently formatted local date string.</li>
                  <li><code>getCurrentTime(pattern = 'HH:mm:ss')</code>: Returns currently formatted local time string.</li>
                </ul>
              </div>

              <div>
                <h4 style={{ color: '#818cf8', fontSize: '0.95rem', marginBottom: 6 }}>2. Date Differences</h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                  <li><code>getDateDifference(startDate, endDate)</code>: Returns decomposed object with days, hours, minutes, seconds, totals, and isNegative flag.</li>
                  <li><code>daysBetween(date1, date2, { absolute })</code>: Returns elapsed days.</li>
                  <li><code>hoursBetween(date1, date2, { absolute })</code>: Returns elapsed hours.</li>
                  <li><code>minutesBetween(date1, date2, { absolute })</code>: Returns elapsed minutes.</li>
                  <li><code>secondsBetween(date1, date2, { absolute })</code>: Returns elapsed seconds.</li>
                </ul>
              </div>

              <div>
                <h4 style={{ color: '#a855f7', fontSize: '0.95rem', marginBottom: 6 }}>3. Date Manipulation</h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                  <li><code>addDays(date, days)</code> / <code>subtractDays(date, days)</code>: Adds or subtracts days immutably.</li>
                  <li><code>addHours(date, hours)</code> / <code>addMinutes(date, minutes)</code>: Adds hours or minutes.</li>
                  <li><code>addMonths(date, months)</code>: Adds months with automatic end-of-month clamping (e.g. Jan 31 + 1 month = Feb 28).</li>
                  <li><code>addYears(date, years)</code>: Adds years with leap-year protection (e.g. Feb 29 + 1 year = Feb 28).</li>
                </ul>
              </div>

              <div>
                <h4 style={{ color: '#34d399', fontSize: '0.95rem', marginBottom: 6 }}>4. Relative Time</h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                  <li><code>timeAgo(date, [baseDate=new Date()])</code>: Returns human-friendly elapsed time strings (e.g. "just now", "5 minutes ago", "3 days ago").</li>
                  <li><code>timeUntil(date, [baseDate=new Date()])</code>: Returns future relative strings (e.g. "in 5 minutes", "in 2 hours").</li>
                </ul>
              </div>

              <div>
                <h4 style={{ color: '#f59e0b', fontSize: '0.95rem', marginBottom: 6 }}>5. Validation & Comparisons</h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, fontSize: '0.84rem', color: 'var(--text-muted)' }}>
                  <li><code>isValidDate(value)</code>: Checks if input is valid date instance or parseable date string.</li>
                  <li><code>isToday(date)</code>: Checks if date matches local calendar day.</li>
                  <li><code>isPastDate(date)</code> / <code>isFutureDate(date)</code>: Evaluates timestamp against current moment.</li>
                  <li><code>isSameDay(date1, date2)</code>: Evaluates if two dates share the same calendar day.</li>
                  <li><code>isLeapYear(yearOrDate)</code>: Evaluates leap year status.</li>
                  <li><code>isBefore(date1, date2)</code> / <code>isAfter(date1, date2)</code>: Chronological ordering.</li>
                  <li><code>isBetween(date, start, end, inclusive = false)</code>: Range boundary check.</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer style={{ marginTop: 40, paddingTop: 20, borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, fontSize: '0.8rem', color: 'var(--text-dim)' }}>
        <div>
          <span>Date Toolkit Playground • Built for </span>
          <a
            href="https://www.npmjs.com/package/@shukracharya/date-helper-js"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--cyan)', textDecoration: 'none' }}
          >
            @shukracharya/date-helper-js
          </a>
        </div>
        <div>
          <span>Crafted by Divyam Nailwal • MIT License</span>
        </div>
      </footer>

      <Toast toasts={toasts} />
    </div>
  );
}
