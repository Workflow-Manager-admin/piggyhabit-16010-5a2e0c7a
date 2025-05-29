import React, { useState } from 'react';
import './App.css';

// PUBLIC_INTERFACE
// Piggy bank SVG icon component
const PiggyBankIcon = () => (
  <svg
    className="piggy-icon"
    viewBox="0 0 96 96"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Piggy bank"
  >
    <ellipse cx="48" cy="56" rx="32" ry="27" fill="#FFB300" />
    <ellipse cx="48" cy="56" rx="26" ry="21.5" fill="#FFF8E1" fillOpacity="0.25"/>
    <ellipse cx="39" cy="48" rx="5" ry="2.8" fill="#FFF8E1" fillOpacity="0.45"/>
    <ellipse cx="48" cy="55" rx="27" ry="21" fill="none" stroke="#E65100" strokeWidth="2" />
    <ellipse cx="60" cy="36" rx="3.6" ry="2.7" fill="#E65100" stroke="#E65100" strokeWidth="0.7"/>
    <rect x="37" y="41.5" width="22" height="4.5" rx="2.3" fill="#1A1A1A" />
    <ellipse cx="70" cy="56" rx="6" ry="4.5" fill="#FFB300" stroke="#E65100" strokeWidth="0.8"/>
    <ellipse cx="28" cy="56" rx="6" ry="4.5" fill="#FFB300" stroke="#E65100" strokeWidth="0.8"/>
    <circle cx="67" cy="64" r="2.1" fill="#E65100"/>
    <ellipse cx="29" cy="65" rx="2.1" ry="2.2" fill="#E65100"/>
    <ellipse cx="62.6" cy="76.8" rx="7.4" ry="4.2" fill="#FFB300" fillOpacity="0.2"/>
    <ellipse cx="35" cy="75.8" rx="7.4" ry="4.2" fill="#FFB300" fillOpacity="0.2"/>
  </svg>
);

// PUBLIC_INTERFACE
// Formats a JS Date as a readable string for history
function formatDateShort(date) {
  return new Date(date).toLocaleString(undefined, {
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}

// PUBLIC_INTERFACE
// Main container for PiggyHabit app
function App() {
  // Local state for all app data (in-memory only)
  const [balance, setBalance] = useState(0);
  const [goal, setGoal] = useState(100);
  const [goalInput, setGoalInput] = useState('100');
  const [amountInput, setAmountInput] = useState('');
  const [history, setHistory] = useState([]); // [{type, amount, date}]
  const [error, setError] = useState('');

  // PUBLIC_INTERFACE
  // Add savings (validates positive number; updates state)
  function handleAddSavings(e) {
    e.preventDefault();
    setError('');
    const amount = parseFloat(amountInput);
    if (isNaN(amount) || amount <= 0) {
      setError('Enter a positive number to add.');
      return;
    }
    setBalance(prev => prev + amount);
    setHistory(prev => [
      { type: 'add', amount, date: new Date() },
      ...prev
    ]);
    setAmountInput('');
  }

  // PUBLIC_INTERFACE
  // Remove savings (cannot go negative; validates input)
  function handleRemoveSavings(e) {
    e.preventDefault();
    setError('');
    const amount = parseFloat(amountInput);
    if (isNaN(amount) || amount <= 0) {
      setError('Enter a positive number to remove.');
      return;
    }
    if (amount > balance) {
      setError('Cannot remove more than your balance.');
      return;
    }
    setBalance(prev => prev - amount);
    setHistory(prev => [
      { type: 'remove', amount, date: new Date() },
      ...prev
    ]);
    setAmountInput('');
  }

  // PUBLIC_INTERFACE
  // Input handler for setting goal (accepts only positive numbers)
  function handleGoalInputChange(e) {
    const val = e.target.value;
    if (/^\d*$/.test(val)) {
      setGoalInput(val);
    }
  }

  // PUBLIC_INTERFACE
  // Apply new goal after validation on form submit
  function handleSetGoal(e) {
    e.preventDefault();
    const val = parseInt(goalInput, 10);
    if (isNaN(val) || val <= 0) {
      setError('Enter a positive number for goal.');
      return;
    }
    setGoal(val);
    setError('');
  }

  // Derived goal progress state
  const progressRatio = Math.max(0, Math.min(balance / (goal || 1), 1));
  const progressBarWidth = `${progressRatio * 100}%`;

  return (
    <div className="piggyhabit-main">
      {/* Top: Piggy bank icon and balance */}
      <div style={{ marginBottom: 16 }}>
        <PiggyBankIcon />
        <div className="balance-display" aria-label="Current Balance">
          ${balance.toFixed(2)}
        </div>
      </div>

      {/* Add/Remove savings controls */}
      <form
        onSubmit={handleAddSavings}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: 18,
          gap: 0
        }}
        autoComplete="off"
      >
        <input
          type="text"
          inputMode="decimal"
          pattern="[0-9.]*"
          placeholder="Amount (e.g. 10.50)"
          aria-label="Amount"
          value={amountInput}
          onChange={e => setAmountInput(e.target.value)}
          style={{
            padding: '12px',
            fontSize: '1.1rem',
            borderRadius: 7,
            border: '1.5px solid var(--ph-secondary)',
            background: 'var(--ph-bg-section)',
            color: 'var(--text-color)',
            width: 180,
            outline: 'none',
            marginBottom: 8,
            marginTop: 2,
            textAlign: 'center'
          }}
        />
        <div>
          <button
            className="ph-btn"
            style={{ minWidth: 100 }}
            onClick={handleAddSavings}
            type="button"
            aria-label="Add savings"
          >
            + Add
          </button>
          <button
            className="ph-btn ph-btn--remove"
            style={{ minWidth: 100 }}
            onClick={handleRemoveSavings}
            type="button"
            aria-label="Remove savings"
          >
            – Remove
          </button>
        </div>
      </form>
      {error && (
        <div
          style={{
            color: '#E65100',
            fontWeight: 500,
            marginBottom: 6,
            marginTop: -7,
            fontSize: '1.02rem'
          }}
          role="alert"
        >{error}</div>
      )}

      {/* Progress bar & savings goal section */}
      <section className="progress-container" style={{ marginBottom: 15 }}>
        <div className="progress-label" id="progress-description">
          Savings Goal: <span style={{ color: 'var(--ph-primary)', fontWeight: 600 }}>${goal}</span>&nbsp;
          <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>
            ({((progressRatio * 100) | 0)}%)
          </span>
        </div>
        <div className="progress-bar-bg" role="progressbar" aria-valuenow={balance} aria-valuemax={goal} aria-label="Goal progress">
          <div
            className="progress-bar-fill"
            style={{ width: progressBarWidth }}
          />
        </div>
        {/* Inline goal update input */}
        <form
          onSubmit={handleSetGoal}
          style={{ marginTop: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 0 }}
          autoComplete="off"
        >
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            aria-label="Edit goal"
            title="Change savings goal"
            style={{
              padding: '8px 11px',
              fontSize: '1rem',
              border: '1.5px solid var(--ph-secondary)',
              borderRadius: 7,
              background: 'var(--ph-bg-section)',
              color: 'var(--text-color)',
              marginRight: 5,
              width: 80,
              textAlign: 'center'
            }}
            value={goalInput}
            onChange={handleGoalInputChange}
          />
          <button
            style={{
              padding: '7px 18px',
              fontSize: '1rem',
              fontWeight: 600,
              background: 'var(--ph-primary)',
              color: '#1A1A1A',
              borderRadius: 7,
              border: 'none',
              cursor: 'pointer'
            }}
            type="submit"
          >
            Set Goal
          </button>
        </form>
      </section>

      {/* Savings History Section */}
      <section className="savings-history-section">
        <div className="history-title">Savings History</div>
        <ul className="history-list" style={{ minHeight: 46 }}>
          {history.length === 0 ? (
            <div style={{ color: 'var(--text-secondary)', padding: '13px 0' }}>
              No savings or withdrawals yet.
            </div>
          ) : (
            history.map((entry, idx) => (
              <li
                key={idx}
                className={`history-item history-item-${entry.type}`}
                aria-label={
                  entry.type === 'add'
                    ? `Added $${entry.amount.toFixed(2)} on ${formatDateShort(entry.date)}`
                    : `Removed $${entry.amount.toFixed(2)} on ${formatDateShort(entry.date)}`
                }
                style={{
                  borderLeft: `5px solid ${
                    entry.type === 'add'
                      ? 'var(--ph-primary)'
                      : 'var(--ph-accent)'
                  }`,
                  background:
                    entry.type === 'add'
                      ? 'rgba(255,179,0,0.04)'
                      : 'rgba(230,81,0,0.045)',
                  marginBottom: 2,
                  borderRadius: 4,
                  paddingLeft: 11,
                  alignItems: 'center',
                  minHeight: 42,
                }}
              >
                <span
                  className="history-amount"
                  style={{
                    marginRight: 18,
                    fontWeight: 700,
                    letterSpacing: 0.3,
                    fontSize: '1.08em',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {entry.type === 'add' ? (
                    <span
                      style={{
                        background: 'var(--ph-primary)',
                        color: '#181818',
                        padding: '3px 10px',
                        borderRadius: '5px',
                        fontWeight: 700,
                        marginRight: 9,
                        minWidth: 31,
                        textAlign: 'center',
                        fontSize: '0.98em',
                        boxShadow: '0 1px 5px 0 rgba(255,179,0, 0.13)',
                      }}
                    >
                      +${entry.amount.toFixed(2)}
                    </span>
                  ) : (
                    <span
                      style={{
                        background: 'var(--ph-accent)',
                        color: '#FFF8E1',
                        padding: '3px 10px',
                        borderRadius: '5px',
                        fontWeight: 700,
                        marginRight: 9,
                        minWidth: 31,
                        textAlign: 'center',
                        fontSize: '0.98em',
                        boxShadow: '0 1px 5px 0 rgba(230,81,0, 0.12)',
                      }}
                    >
                      –${entry.amount.toFixed(2)}
                    </span>
                  )}
                  <span
                    style={{
                      fontSize: '0.98em',
                      fontWeight: 500,
                      color:
                        entry.type === 'add'
                          ? 'var(--ph-primary)'
                          : 'var(--ph-accent)',
                      textShadow:
                        entry.type === 'add'
                          ? '0 1px 4px #56420033'
                          : '0 1px 4px #20100820',
                    }}
                  >
                    {entry.type === 'add' ? 'Add' : 'Remove'}
                  </span>
                </span>
                <span className="history-date">
                  {formatDateShort(entry.date)}
                </span>
              </li>
            ))
          )}
        </ul>
      </section>
    </div>
  );
}

export default App;
