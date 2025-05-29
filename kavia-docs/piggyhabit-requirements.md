# PiggyHabit Main Container: Requirements Document

## Overview

PiggyHabit is a simple, motivating web application that enables users to manually track their savings, simulating the experience of a physical piggy bank. The app is designed for habit-building, allowing users to add and remove “savings”, visualize their progress toward savings goals, and review a history of all transactions. The application is implemented entirely using a React frontend, with all data managed client-side and no backend services or persistent storage.

## Functional Requirements

### 1. Add Savings
- The user can manually enter and add an amount to their savings.
- Upon submission, the amount is immediately reflected in the displayed balance and appended to the savings history.
- The interface must validate that only positive numeric values can be entered as savings.

### 2. Remove Savings
- The user can manually subtract an amount from the savings balance, mimicking a withdrawal or spend event.
- Withdrawals are recorded chronologically in the savings history, displaying the date and amount.
- The interface prevents removing more than the current savings balance and validates user input for positive numeric values.

### 3. Savings History
- The app maintains an ordered list (history) of all add/remove actions.
- Each entry displays:
  - Transaction type (add/remove)
  - Amount
  - Timestamp (date/time)
- The history is shown in reverse chronological order (most recent first).
- All data is lost on page refresh; the history is in-memory only.

### 4. Set Savings Goal
- Users can set a target “savings goal” by entering a numeric amount.
- The current savings total is displayed alongside or within a progress bar that dynamically shows how close the user is to the goal.
- Users may update their goal at any time.

### 5. Visual & Interactive Elements
- Large, central display of the piggy bank balance.
- Prominent piggy bank icon to reinforce the savings theme.
- Distinct “Add” and “Remove” buttons placed beneath the balance/piggy icon.
- A horizontal progress bar visualizes progress toward the savings goal.
- The savings history section is accessible and visible, ideally anchored at the bottom of the main content area.
- Responsive interface: layout adapts to different browser widths for desktop/laptop and mobile.

## UI/UX Requirements

### Layout
- Vertical layout flow: balance/piggy icon at top center, buttons below, progress bar underneath, and history at the bottom.
- All elements are centered and spaced for clarity and ease of interaction.
- Main actions (Add/Remove) are accessible and visually distinct.

### Color Palette and Theme
- Colors used throughout the interface:
  - **Primary:** #FFB300
  - **Secondary:** #FFF8E1
  - **Accent:** #E65100
- Dark theme as default: most backgrounds use a deep, dark color (#1A1A1A or similar), with text and interactive elements using contrasted and brand colors.
- Sufficient color contrast for accessibility.
- CSS theme variables are used for easy theming and palette management.
- All button, input, and container styles are consistent with the overall brand theme.

### Iconography
- Piggy bank icon is a key visual focus, either SVG or high-quality image.

## Non-Functional Requirements

### Platform & Technology
- Built exclusively with React JS (no UI frameworks; only React and vanilla CSS).
- JavaScript (ES6+) as the primary language.
- All state is managed client-side and held in-memory; no backend, no cloud, and no external APIs.

### Data & Constraints
- All application state (balance, history, goal) exists only for the duration of the browser session and is lost upon refresh or close.
- No backend services or API calls; operations use React local state only.
- No persistent storage: localStorage, cookies, or indexedDB are not used.

### Accessibility & Responsiveness
- All color and text contrast comply with accessibility standards (WCAG AA minimum).
- Buttons and form fields have adequate size and spacing for both desktop and mobile interaction.
- Focus styles and keyboard navigation are supported for all interactive elements.
- Responsive design ensures optimal experience on desktops, tablets, and mobile browsers.

### Performance
- The UI is responsive, with no noticeable lag for button presses or state updates.
- Fast load times; minimal use of dependencies and assets.

## Out-of-Scope / Constraints

- No authentication or user management.
- No persistent or server-side storage.
- No money transfer or real banking integration (simulated savings only; for motivational/habit tracking).
- No support for localization/multi-language in this version.

## Summary Table

| Feature           | Description                                                                           | State | Persistence         |
|-------------------|---------------------------------------------------------------------------------------|-------|---------------------|
| Add Savings       | User adds an amount to balance; validated, reflected immediately                      | In-memory | None (lost on refresh) |
| Remove Savings    | User subtracts from balance; cannot go negative, reflected in balance/history         | In-memory | None |
| Savings History   | Chronological log of all add/remove actions; shows type, amount, date/time            | In-memory | None |
| Set Goal          | User sets/upgrades their savings target; progress bar visualizes goal attainment      | In-memory | None |
| Dark Theme        | Default, based on provided color palette and accessible visual design                 | CSS Vars | -   |
| Responsive Layout | Adapts to device/browser and remains easy to use                                      | N/A   | N/A |

---

This document outlines all known requirements for PiggyHabit's main container application as of this version. Updates may be necessary as new features or constraints emerge.
