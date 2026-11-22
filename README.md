# Date Toolkit Playground 🗓️✨

An interactive, responsive playground and showcase dashboard for **[@shukracharya/date-helper-js](https://www.npmjs.com/package/@shukracharya/date-helper-js)** — the lightweight, zero-dependency modern date utility library by Divyam Nailwal.

## Features

- ⏱️ **Live Clock & Formatting**: Test custom token patterns (`YYYY`, `MM`, `DD`, `HH`, `mm`, `ss`) with live validation and preset chips.
- ⏳ **Difference & Spans**: Calculate detailed breakdowns (`getDateDifference`) into days, hours, minutes, seconds, and total elapsed units with signed/absolute toggles.
- 🧮 **Immutable Date Manipulation**: Experience automatic end-of-month clamping (e.g. `Jan 31 + 1 month = Feb 28`) and leap-day clamping (`Feb 29 + 1 year = Feb 28`).
- 💬 **Relative Time Engine**: Interactive slider and real-world activity feed powered by `timeAgo()` and `timeUntil()`.
- 🛡️ **Validation & Leap Year**: Check date validity (`isValidDate`), `isToday`, `isPastDate`, `isFutureDate`, `isSameDay`, and `isLeapYear`.
- ⚖️ **Chronological Comparisons**: Interactive boundary visualization for `isBefore`, `isAfter`, and `isBetween` (with inclusive support).
- 📋 **1-Click Code Generation**: Copy ready-to-run ESM snippets for any test scenario directly to your clipboard.

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

## Built With
- **[@shukracharya/date-helper-js](https://www.npmjs.com/package/@shukracharya/date-helper-js)**
- **React 19**
- **Vite**
- **Lucide React**
- **Plus Jakarta Sans & JetBrains Mono Fonts**
