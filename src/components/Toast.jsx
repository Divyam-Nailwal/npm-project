import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function Toast({ toasts, onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className="toast">
          {toast.type === 'error' ? (
            <AlertCircle size={16} color="#f43f5e" />
          ) : (
            <CheckCircle2 size={16} color="#10b981" />
          )}
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
