import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function CodeSnippet({ code, language = 'javascript', label = 'ESM Example', onCopy }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    if (onCopy) onCopy('Copied code snippet to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="code-box">
      <div className="code-box-header">
        <span>{label}</span>
        <button
          onClick={handleCopy}
          className="btn-secondary"
          style={{ padding: '3px 8px', fontSize: '0.72rem' }}
          title="Copy code"
        >
          {copied ? <Check size={13} color="#10b981" /> : <Copy size={13} />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <div className="code-box-content">{code}</div>
    </div>
  );
}
