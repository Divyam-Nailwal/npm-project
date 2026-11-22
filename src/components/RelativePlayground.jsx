import React, { useState } from 'react';
import { timeAgo, timeUntil, formatDate } from '@shukracharya/date-helper-js';
import { Clock, MessageSquare, Sparkles, Sliders, Calendar } from 'lucide-react';
import CodeSnippet from './CodeSnippet.jsx';

export default function RelativePlayground({ onToast }) {
  // Offset in minutes
  const [offsetMinutes, setOffsetMinutes] = useState(-120); // 2 hours ago

  const now = new Date();
  const calculatedDate = new Date(now.getTime() + offsetMinutes * 60 * 1000);

  const relativePast = timeAgo(calculatedDate);
  const relativeFuture = timeUntil(calculatedDate);

  const codeExample = `import { timeAgo, timeUntil } from '@shukracharya/date-helper-js';

const targetDate = new Date('${calculatedDate.toISOString()}');

${offsetMinutes <= 0 ? `// Past dates
console.log(timeAgo(targetDate)); // "${relativePast}"` : `// Future dates
console.log(timeUntil(targetDate)); // "${relativeFuture}"`}
`;

  // Activity Feed Mockup
  const sampleActivities = [
    { id: 1, action: 'Published @shukracharya/date-helper-js v1.0.0', time: new Date(now.getTime() - 30 * 1000), user: 'Divyam Nailwal' },
    { id: 2, action: 'Merged Pull Request: zero-dependency utils', time: new Date(now.getTime() - 15 * 60 * 1000), user: 'GitHub Actions' },
    { id: 3, action: 'Created project-npm playground', time: new Date(now.getTime() - 2 * 60 * 60 * 1000), user: 'Developer' },
    { id: 4, action: 'Scheduled automated database backup', time: new Date(now.getTime() + 4 * 60 * 60 * 1000), isFuture: true, user: 'Cron Service' },
    { id: 5, action: 'Upcoming quarterly maintenance release', time: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000), isFuture: true, user: 'DevOps' }
  ];

  return (
    <div className="grid-2">
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <Clock size={20} color="#34d399" />
            <span>Human-Readable Relative Time</span>
          </div>
          <span className="card-badge">timeAgo / timeUntil</span>
        </div>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 16 }}>
          Convert dates into natural human phrases like <i>"just now"</i>, <i>"5 minutes ago"</i>, or <i>"in 2 hours"</i> with zero external dependencies.
        </p>

        <div className="form-group">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label className="form-label">Time Offset Slider</label>
            <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--cyan)' }}>
              {offsetMinutes > 0 ? `+${offsetMinutes} mins` : `${offsetMinutes} mins`}
            </span>
          </div>
          <input
            type="range"
            min="-10080" // 7 days in minutes
            max="10080"
            step="10"
            value={offsetMinutes}
            onChange={(e) => setOffsetMinutes(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--indigo)' }}
          />
          <div className="preset-chips">
            <button className="chip" onClick={() => setOffsetMinutes(-0.5)}>30 secs ago</button>
            <button className="chip" onClick={() => setOffsetMinutes(-5)}>5 mins ago</button>
            <button className="chip" onClick={() => setOffsetMinutes(-120)}>2 hours ago</button>
            <button className="chip" onClick={() => setOffsetMinutes(-1440)}>1 day ago</button>
            <button className="chip" onClick={() => setOffsetMinutes(30)}>in 30 mins</button>
            <button className="chip" onClick={() => setOffsetMinutes(2880)}>in 2 days</button>
          </div>
        </div>

        <div style={{ background: 'rgba(15,23,42,0.4)', padding: 12, borderRadius: 10, border: '1px solid var(--border-subtle)', marginBottom: 16 }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Target Timestamp:</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem', color: '#f1f5f9' }}>
            {formatDate(calculatedDate, 'YYYY-MM-DD HH:mm:ss')}
          </div>
        </div>

        <div className="grid-2" style={{ gap: 12 }}>
          <div className="result-display" style={{ marginTop: 0 }}>
            <div className="result-header">
              <span className="result-title">timeAgo()</span>
            </div>
            <div className="result-value" style={{ fontSize: '1.1rem', color: '#38bdf8' }}>
              {relativePast}
            </div>
          </div>

          <div className="result-display" style={{ marginTop: 0 }}>
            <div className="result-header">
              <span className="result-title">timeUntil()</span>
            </div>
            <div className="result-value" style={{ fontSize: '1.1rem', color: '#34d399' }}>
              {relativeFuture}
            </div>
          </div>
        </div>

        <CodeSnippet code={codeExample} onCopy={onToast} />
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <MessageSquare size={20} color="#a855f7" />
            <span>Interactive Activity Feed Simulation</span>
          </div>
          <span className="card-badge">Real-World Demo</span>
        </div>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 16 }}>
          Notice how relative time makes notifications and timelines intuitive and clean:
        </p>

        <div>
          {sampleActivities.map((act) => (
            <div key={act.id} className="timeline-item">
              <div className="timeline-icon">
                <Calendar size={16} />
              </div>
              <div className="timeline-content">
                <div className="timeline-title">{act.action}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: 2 }}>
                  By <span style={{ color: '#cbd5e1' }}>{act.user}</span> •{' '}
                  <span style={{ color: act.isFuture ? '#34d399' : '#38bdf8', fontWeight: 600 }}>
                    {act.isFuture ? timeUntil(act.time) : timeAgo(act.time)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
